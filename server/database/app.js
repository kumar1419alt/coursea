const express = require("express");
const cors = require("cors");
const fs = require("node:fs");
const path = require("node:path");
const mongoose = require("mongoose");
const Dealerships = require("./dealership");
const Reviews = require("./review");

const app = express();
const PORT = Number(process.env.PORT || 3030);
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/dealershipsDB";
const dataPath = (file) => path.join(__dirname, "data", file);

app.use(cors());
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false, limit: "100kb" }));

async function seedCollection(Model, fileName, key) {
  if (await Model.estimatedDocumentCount()) return;
  const payload = JSON.parse(fs.readFileSync(dataPath(fileName), "utf8"));
  const items = payload[key] || [];
  if (items.length) await Model.insertMany(items, { ordered: false });
}

app.get("/", (_req, res) => res.json({ service: "Best Cars dealer API", status: "ok" }));
app.get("/health", (_req, res) => res.json({ status: mongoose.connection.readyState === 1 ? "ok" : "starting" }));

app.get("/fetchDealers", async (_req, res) => {
  try {
    return res.json(await Dealerships.find().sort({ id: 1 }).lean());
  } catch (e) {
    return res.status(500).json({ error: "Error fetching dealerships" });
  }
});

app.get("/fetchDealers/:state", async (req, res) => {
  const state = String(req.params.state || "").trim().toLowerCase();
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
  try {
    const dealer = await Dealerships.findOne({ id }).lean();
    return dealer ? res.json(dealer) : res.status(404).json({ error: "Dealer not found" });
  } catch (e) {
    return res.status(500).json({ error: "Error fetching dealer" });
  }
});

app.get("/fetchReviews", async (_req, res) => {
  try {
    return res.json(await Reviews.find().sort({ id: 1 }).lean());
  } catch (e) {
    return res.status(500).json({ error: "Error fetching reviews" });
  }
});

app.get("/fetchReviews/dealer/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "Dealer ID must be an integer" });
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
  try {
    if (!(await Dealerships.findOne({ id: dealerId }))) return res.status(404).json({ error: "Dealer not found" });
    const latest = await Reviews.findOne().sort({ id: -1 }).select({ id: 1 }).lean();
    const review = await Reviews.create({
      id: (latest?.id || 0) + 1, name: reviewer, dealership: dealerId, review: reviewText,
      purchase: Boolean(data.purchase), purchase_date: String(data.purchase_date || ""),
      car_make: String(data.car_make || ""), car_model: String(data.car_model || ""),
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
  await mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 10000 });
  await seedCollection(Dealerships, "dealerships.json", "dealerships");
  await seedCollection(Reviews, "reviews.json", "reviews");
  app.listen(PORT, "0.0.0.0", () => console.log("Dealer API listening on port " + PORT));
}
if (require.main === module) {
  start().catch((err) => {
    console.error("Could not start dealer API:", err.message);
    process.exit(1);
  });
}
module.exports = { app, start };
