const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  dealer_id: { type: Number, required: true, index: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  bodyType: { type: String, default: "" },
  year: { type: Number, required: true },
  mileage: { type: Number, default: 0 }
}, { versionKey: false });

module.exports = mongoose.models.Inventory || mongoose.model("Inventory", inventorySchema);
