const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  population: { type: Number, required: true },
  country: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
}, { timestamps: true });

export const City = mongoose.models.City || mongoose.model("City", citySchema);
