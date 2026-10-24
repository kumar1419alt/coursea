const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, index: true },
  name: { type: String, required: true },
  dealership: { type: Number, required: true, index: true },
  review: { type: String, required: true },
  purchase: { type: Boolean, default: false },
  purchase_date: { type: String, default: "" },
  car_make: { type: String, default: "" },
  car_model: { type: String, default: "" },
  car_year: { type: Number, default: null }
}, { versionKey: false });

module.exports = mongoose.models.Review || mongoose.model("Review", reviewSchema);
