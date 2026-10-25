# CodeCraftHub — Personalized Learning for Developers

CodeCraftHub is a small full-stack course-management platform. It includes an Express REST API backed by a JSON file and a responsive single-file HTML/CSS/JavaScript dashboard. No database or build step is required.

## Requirements

- Node.js 18 or newer
- npm (included with Node.js)
- curl for endpoint testing (optional but recommended)

## Run locally

From a terminal:

```bash
cd codecrafthub
npm install
npm start
```

Open the dashboard at **http://localhost:3000**. The API is served by the same process. Course records are stored in `data/courses.json`; the server initializes sample records if the file is missing.

For development with automatic server restarts, use `npm run dev`.

## REST API

All API responses use JSON. Successful responses contain `success: true`; errors contain `success: false` and an explanatory `error` string.

| Method | Endpoint | Purpose | Typical status |
|---|---|---|---|
| GET | `/health` | Check service health | 200 |
| GET | `/api/courses` | List all courses | 200 |
| GET | `/api/courses?search=javascript` | Search course title, instructor, category, or description | 200 |
| GET | `/api/courses?status=published` | Filter by status | 200 |
| GET | `/api/courses/:id` | Read one course | 200 / 404 |
| POST | `/api/courses` | Create a course | 201 / 400 |
| PUT | `/api/courses/:id` | Update a course | 200 / 400 / 404 |
| DELETE | `/api/courses/:id` | Delete a course | 200 / 404 |
| GET | `/api/stats` | Get total, published, draft, and archived counts | 200 |

### Course JSON fields

`title`, `instructor`, and `category` are required. `level` must be `beginner`, `intermediate`, or `advanced`. `status` must be `draft`, `published`, or `archived`. `duration` and `description` are optional strings. IDs and timestamps are assigned by the API.

## Test with curl

Health check:

```bash
curl -i http://localhost:3000/health
```

List courses:

```bash
curl -i http://localhost:3000/api/courses
```

Create a course (save the returned `id` for the next commands):

```bash
curl -i -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"title":"React Essentials","instructor":"Ankush Kumar","category":"Web Development","level":"beginner","status":"draft","duration":"4 hours","description":"Learn reusable components and state."}'
```

Read a course by ID (replace `COURSE_ID`):

```bash
curl -i http://localhost:3000/api/courses/COURSE_ID
```

Update it:

```bash
curl -i -X PUT http://localhost:3000/api/courses/COURSE_ID \
  -H "Content-Type: application/json" \
  -d '{"title":"React Essentials — Updated","instructor":"Ankush Kumar","category":"Web Development","level":"intermediate","status":"published","duration":"5 hours","description":"Updated course description."}'
```

Delete it:

```bash
curl -i -X DELETE http://localhost:3000/api/courses/COURSE_ID
```

Check validation and error handling:

```bash
curl -i -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"title":"","instructor":"A","category":"Web"}'

curl -i http://localhost:3000/api/courses/not-a-real-id
```

Expected: valid creation returns `201 Created`; list/read/update/delete return `200 OK`; missing records return `404 Not Found`; invalid fields return `400 Bad Request`.

## CORS

The Express app enables CORS middleware so a separate browser UI can call the API. For public production deployment, change this to an explicit allow-list rather than allowing all origins.

The dashboard uses `http://localhost:3000` when opened directly as a local file. When served by this Express app, it uses the current origin. If you run the API at a different address, set `window.CODECRAFTHUB_API_BASE` before the dashboard script or update the `API_BASE` constant in `public/index.html`.

## Dashboard features

- View all course records and course statistics
- Search and filter by publishing status
- Create, read, edit, and delete course records
- Responsive layout for desktop and mobile
- Form validation, user feedback, and API error states
- Single HTML file with embedded CSS and JavaScript

## Troubleshooting

- **Port 3000 is busy:** run PowerShell with `$env:PORT=3001; npm start` or macOS/Linux with `PORT=3001 npm start`. Update the dashboard API base if opened from a local file.
- **Dashboard cannot reach the API:** verify the terminal says CodeCraftHub is running and try `curl http://localhost:3000/health`.
- **Invalid JSON:** quote JSON correctly and include the `Content-Type: application/json` header.
- **Changes are not visible:** refresh the dashboard and inspect `data/courses.json`. The API writes updated records to this file.
