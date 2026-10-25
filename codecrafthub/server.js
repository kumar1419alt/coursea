const express = require("express");
const cors = require("cors");
const fs = require("node:fs");
const path = require("node:path");
const { randomUUID } = require("node:crypto");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "courses.json");
const PUBLIC_DIR = path.join(__dirname, "public");

const LEVELS = new Set(["beginner", "intermediate", "advanced"]);
const STATUSES = new Set(["draft", "published", "archived"]);
const EDITABLE_FIELDS = ["title", "instructor", "category", "level", "status", "duration", "description"];

const seedCourses = [
  {
    id: "course-js-foundations",
    title: "JavaScript Foundations",
    instructor: "Maya Chen",
    category: "Web Development",
    level: "beginner",
    status: "published",
    duration: "6 hours",
    description: "Learn variables, functions, arrays, objects, and modern JavaScript fundamentals through practical exercises.",
    createdAt: "2026-01-12T09:00:00.000Z",
    updatedAt: "2026-01-12T09:00:00.000Z"
  },
  {
    id: "course-rest-apis",
    title: "REST APIs with Node.js",
    instructor: "Jordan Patel",
    category: "Backend Engineering",
    level: "intermediate",
    status: "published",
    duration: "8 hours",
    description: "Design reliable REST endpoints, validate input, handle HTTP status codes, and connect an API to JSON storage.",
    createdAt: "2026-02-03T10:30:00.000Z",
    updatedAt: "2026-02-10T11:00:00.000Z"
  },
  {
    id: "course-python-data",
    title: "Python for Data Tasks",
    instructor: "Alex Rivera",
    category: "Data Science",
    level: "beginner",
    status: "draft",
    duration: "5 hours",
    description: "Use Python collections, functions, file handling, and data transformations to automate everyday tasks.",
    createdAt: "2026-03-18T08:15:00.000Z",
    updatedAt: "2026-03-18T08:15:00.000Z"
  },
  {
    id: "course-system-design",
    title: "Practical System Design",
    instructor: "Sam Okafor",
    category: "Software Architecture",
    level: "advanced",
    status: "archived",
    duration: "10 hours",
    description: "Explore scalability, caching, queues, service boundaries, and trade-offs in system design.",
    createdAt: "2025-11-04T14:00:00.000Z",
    updatedAt: "2026-01-08T14:00:00.000Z"
  }
];

fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(seedCourses, null, 2) + "\n", "utf8");
}

app.use(cors());
app.use(express.json({ limit: "1mb" }));

function readCourses() {
  const raw = fs.readFileSync(DATA_FILE, "utf8");
  const courses = JSON.parse(raw);
  if (!Array.isArray(courses)) {
    throw new Error("Course storage must contain a JSON array.");
  }
  return courses;
}

function writeCourses(courses) {
  const tempFile = DATA_FILE + ".tmp";
  fs.writeFileSync(tempFile, JSON.stringify(courses, null, 2) + "\n", "utf8");
  fs.renameSync(tempFile, DATA_FILE);
}

function sendError(res, status, message, details) {
  const payload = { success: false, error: message };
  if (details) payload.details = details;
  return res.status(status).json(payload);
}

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateCourse(input, existing = {}) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { error: "Request body must be a JSON object." };
  }

  const course = { ...existing };
  for (const field of EDITABLE_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(input, field)) {
      course[field] = typeof input[field] === "string" ? input[field].trim() : input[field];
    }
  }

  for (const field of ["title", "instructor", "category"]) {
    if (!cleanString(course[field])) {
      return { error: field + " is required." };
    }
  }

  if (course.title.length < 2 || course.title.length > 120) {
    return { error: "title must be between 2 and 120 characters." };
  }
  if (course.instructor.length < 2 || course.instructor.length > 80) {
    return { error: "instructor must be between 2 and 80 characters." };
  }
  if (course.category.length < 2 || course.category.length > 60) {
    return { error: "category must be between 2 and 60 characters." };
  }

  course.level = course.level || "beginner";
  course.status = course.status || "draft";
  course.duration = course.duration || "";
  course.description = course.description || "";

  if (!LEVELS.has(course.level)) {
    return { error: "level must be one of: beginner, intermediate, advanced." };
  }
  if (!STATUSES.has(course.status)) {
    return { error: "status must be one of: draft, published, archived." };
  }
  if (typeof course.duration !== "string" || course.duration.length > 40) {
    return { error: "duration must be a string of 40 characters or fewer." };
  }
  if (typeof course.description !== "string" || course.description.length > 2000) {
    return { error: "description must be a string of 2000 characters or fewer." };
  }

  return { course };
}

function handleStorageError(res, error) {
  console.error("Course storage error:", error.message);
  return sendError(res, 500, "Unable to read or update course storage.");
}

app.get("/health", (_req, res) => {
  res.json({ success: true, status: "ok", service: "CodeCraftHub API" });
});

app.get("/api/stats", (_req, res) => {
  try {
    const courses = readCourses();
    const stats = {
      total: courses.length,
      published: courses.filter((c) => c.status === "published").length,
      drafts: courses.filter((c) => c.status === "draft").length,
      archived: courses.filter((c) => c.status === "archived").length
    };
    return res.json({ success: true, data: stats });
  } catch (error) {
    return handleStorageError(res, error);
  }
});

app.get("/api/courses", (req, res) => {
  try {
    const search = cleanString(req.query.search).toLowerCase();
    const status = cleanString(req.query.status).toLowerCase();
    if (status && !STATUSES.has(status)) {
      return sendError(res, 400, "status must be one of: draft, published, archived.");
    }

    let courses = readCourses();
    if (status) courses = courses.filter((course) => course.status === status);
    if (search) {
      courses = courses.filter((course) =>
        [course.title, course.instructor, course.category, course.description]
          .some((value) => String(value || "").toLowerCase().includes(search))
      );
    }
    return res.json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    return handleStorageError(res, error);
  }
});

app.get("/api/courses/:id", (req, res) => {
  try {
    const course = readCourses().find((item) => item.id === req.params.id);
    if (!course) return sendError(res, 404, "Course not found.");
    return res.json({ success: true, data: course });
  } catch (error) {
    return handleStorageError(res, error);
  }
});

app.post("/api/courses", (req, res) => {
  try {
    const checked = validateCourse(req.body);
    if (checked.error) return sendError(res, 400, checked.error);

    const now = new Date().toISOString();
    const course = {
      id: randomUUID(),
      ...checked.course,
      createdAt: now,
      updatedAt: now
    };
    const courses = readCourses();
    courses.unshift(course);
    writeCourses(courses);
    return res.status(201).json({ success: true, message: "Course created.", data: course });
  } catch (error) {
    if (error instanceof SyntaxError) return sendError(res, 400, "Request body must contain valid JSON.");
    return handleStorageError(res, error);
  }
});

app.put("/api/courses/:id", (req, res) => {
  try {
    const courses = readCourses();
    const index = courses.findIndex((item) => item.id === req.params.id);
    if (index === -1) return sendError(res, 404, "Course not found.");

    const checked = validateCourse(req.body, courses[index]);
    if (checked.error) return sendError(res, 400, checked.error);

    const updated = {
      ...courses[index],
      ...checked.course,
      id: courses[index].id,
      createdAt: courses[index].createdAt,
      updatedAt: new Date().toISOString()
    };
    courses[index] = updated;
    writeCourses(courses);
    return res.json({ success: true, message: "Course updated.", data: updated });
  } catch (error) {
    if (error instanceof SyntaxError) return sendError(res, 400, "Request body must contain valid JSON.");
    return handleStorageError(res, error);
  }
});

app.delete("/api/courses/:id", (req, res) => {
  try {
    const courses = readCourses();
    const index = courses.findIndex((item) => item.id === req.params.id);
    if (index === -1) return sendError(res, 404, "Course not found.");

    const [deleted] = courses.splice(index, 1);
    writeCourses(courses);
    return res.json({ success: true, message: "Course deleted.", data: deleted });
  } catch (error) {
    return handleStorageError(res, error);
  }
});

app.use("/api", (_req, res) => sendError(res, 404, "API endpoint not found."));
app.use(express.static(PUBLIC_DIR));

app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && Object.prototype.hasOwnProperty.call(error, "body")) {
    return sendError(res, 400, "Request body must contain valid JSON.");
  }
  console.error(error);
  return sendError(res, 500, "An unexpected server error occurred.");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("CodeCraftHub running at http://localhost:" + PORT);
  console.log("REST API: http://localhost:" + PORT + "/api/courses");
});
