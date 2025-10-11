// lib/models/FuelPrice.js
import mongoose from 'mongoose';

const FuelPriceSchema = new mongoose.Schema({
  price: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.FuelPrice || mongoose.model('FuelPrice', FuelPriceSchema);

