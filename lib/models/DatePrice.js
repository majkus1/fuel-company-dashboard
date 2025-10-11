// lib/models/DatePrice.js
import mongoose from 'mongoose';

const DatePriceSchema = new mongoose.Schema({
  datprice: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.DatePrice || mongoose.model('DatePrice', DatePriceSchema);

