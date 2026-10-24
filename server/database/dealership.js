const mongoose = require("mongoose");

const dealershipSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, index: true },
  city: { type: String, required: true },
  state: { type: String, required: true, index: true },
  st: { type: String, default: "" },
  address: { type: String, default: "" },
  zip: { type: String, default: "" },
  lat: { type: Number, default: null },
  long: { type: Number, default: null },
  short_name: { type: String, default: "" },
  full_name: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.models.Dealership || mongoose.model("Dealership", dealershipSchema);
