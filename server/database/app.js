const express = require("express");
const cors = require("cors");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const mongoose = require("mongoose");
const Dealerships = require("./dealership");
const Reviews = require("./review");

const app = express();
const PORT = Number(process.env.PORT || 3030);
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/dealershipsDB";
const FILE_MODE = String(process.env.STORAGE_MODE || "").toLowerCase() === "file";
const dataPath = (file) => path.join(__dirname, "data", file);

function readSeed(fileName, key) {
  const payload = JSON.parse(fs.readFileSync(dataPath(fileName), "utf8"));
  return payload[key] || [];
}

const fileDealerships = readSeed("dealerships.json", "dealerships");
const seedReviews = readSeed("reviews.json", "reviews");
// The Code Engine lab can use its writable instance filesystem for a short demo.
// For durable multi-instance production storage, use MongoDB instead.
const reviewsPath = process.env.REVIEWS_FILE || path.join(os.tmpdir(), "bestcars-reviews.json");
let fileReviews = fs.existsSync(reviewsPath)
  ? JSON.parse(fs.readFileSync(reviewsPath, "utf8"))
  : seedReviews;

function saveFileReviews() {
  const tempPath = reviewsPath + ".tmp";
  fs.writeFileSync(tempPath, JSON.stringify(fileReviews, null, 2), "utf8");
  fs.renameSync(tempPath, reviewsPath);
}

app.use(cors());
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false, limit: "100kb" }));

async function seedCollection(Model, fileName, key) {
  if (await Model.estimatedDocumentCount()) return;
  const payload = JSON.parse(fs.readFileSync(dataPath(fileName), "utf8"));
  const items = payload[key] || [];
  if (items.length) await Model.insertMany(items, { ordered: false });
}

app.get("/", (_req, res) => res.json({
  service: "Best Cars dealer API",
  status: "ok",
  storage: FILE_MODE ? "file-demo" : "mongodb"
}));

app.get("/health", (_req, res) => res.json({
  status: FILE_MODE || mongoose.connection.readyState === 1 ? "ok" : "starting",
  storage: FILE_MODE ? "file-demo" : "mongodb"
}));

app.get("/fetchDealers", async (_req, res) => {
  if (FILE_MODE) {
    return res.json([...fileDealerships].sort((a, b) => a.id - b.id));
  }
  try {
    return res.json(await Dealerships.find().sort({ id: 1 }).lean());
  } catch (e) {
    return res.status(500).json({ error: "Error fetching dealerships" });
  }
});

app.get("/fetchDealers/:state", async (req, res) => {
  const state = String(req.params.state || "").trim().toLowerCase();
  if (FILE_MODE) {
    return res.json(fileDealerships
      .filter((dealer) => String(dealer.state).toLowerCase() === state)
      .sort((a, b) => a.id - b.id));
  }
  try {
    const all = await Dealerships.find().sort({ id: 1 }).lean();
    return res.json(all.filter((dealer) => String(dealer.state).toLowerCase() === state));
  } catch (e) {
    return res.status(500).json({ error: "Error filtering dealerships" });
  }
});

app.get("/fetchDealer/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "Dealer ID must be an integer" });
  if (FILE_MODE) {
    const dealer = fileDealerships.find((item) => item.id === id);
    return dealer ? res.json(dealer) : res.status(404).json({ error: "Dealer not found" });
  }
  try {
    const dealer = await Dealerships.findOne({ id }).lean();
    return dealer ? res.json(dealer) : res.status(404).json({ error: "Dealer not found" });
  } catch (e) {
    return res.status(500).json({ error: "Error fetching dealer" });
  }
});

app.get("/fetchReviews", async (_req, res) => {
  if (FILE_MODE) {
    return res.json([...fileReviews].sort((a, b) => a.id - b.id));
  }
  try {
    return res.json(await Reviews.find().sort({ id: 1 }).lean());
  } catch (e) {
    return res.status(500).json({ error: "Error fetching reviews" });
  }
});

app.get("/fetchReviews/dealer/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "Dealer ID must be an integer" });
  if (FILE_MODE) {
    return res.json(fileReviews
      .filter((review) => review.dealership === id)
      .sort((a, b) => a.id - b.id));
  }
  try {
    return res.json(await Reviews.find({ dealership: id }).sort({ id: 1 }).lean());
  } catch (e) {
    return res.status(500).json({ error: "Error fetching dealer reviews" });
  }
});

async function insertReview(req, res) {
  const data = req.body || {};
  const dealerId = Number(data.dealership ?? data.dealer_id);
  const reviewText = String(data.review || "").trim();
  const reviewer = String(data.name || data.username || "").trim();
  if (!Number.isInteger(dealerId) || !reviewer || !reviewText) {
    return res.status(400).json({ error: "name, review, and a valid dealership ID are required" });
  }

  if (FILE_MODE) {
    if (!fileDealerships.some((dealer) => dealer.id === dealerId)) {
      return res.status(404).json({ error: "Dealer not found" });
    }
    const latestId = fileReviews.reduce((maxId, review) => Math.max(maxId, Number(review.id) || 0), 0);
    const review = {
      id: latestId + 1,
      name: reviewer,
      dealership: dealerId,
      review: reviewText,
      purchase: data.purchase === true || data.purchase === "true" || data.purchase === 1,
      purchase_date: String(data.purchase_date || ""),
      car_make: String(data.car_make || ""),
      car_model: String(data.car_model || ""),
      car_year: data.car_year ? Number(data.car_year) : null
    };
    fileReviews.push(review);
    try {
      saveFileReviews();
      return res.status(201).json(review);
    } catch (e) {
      fileReviews.pop();
      return res.status(500).json({ error: "Could not save review" });
    }
  }

  try {
    if (!(await Dealerships.findOne({ id: dealerId }))) {
      return res.status(404).json({ error: "Dealer not found" });
    }
    const latest = await Reviews.findOne().sort({ id: -1 }).select({ id: 1 }).lean();
    const review = await Reviews.create({
      id: (latest?.id || 0) + 1,
      name: reviewer,
      dealership: dealerId,
      review: reviewText,
      purchase: Boolean(data.purchase),
      purchase_date: String(data.purchase_date || ""),
      car_make: String(data.car_make || ""),
      car_model: String(data.car_model || ""),
      car_year: data.car_year ? Number(data.car_year) : null
    });
    return res.status(201).json(review);
  } catch (e) {
    return res.status(500).json({ error: "Error inserting review" });
  }
}

app.post("/insertReview", insertReview);
app.post("/insert_review", insertReview);

async function start() {
  if (!FILE_MODE) {
    await mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 10000 });
    await seedCollection(Dealerships, "dealerships.json", "dealerships");
    await seedCollection(Reviews, "reviews.json", "reviews");
  }
  return app.listen(PORT, "0.0.0.0", () => {
    console.log("Dealer API listening on port " + PORT + (FILE_MODE ? " (JSON demo storage)" : " (MongoDB)"));
  });
}

if (require.main === module) {
  start().catch((err) => {
    console.error("Could not start dealer API:", err.message);
    process.exit(1);
  });
}
module.exports = { app, start };
