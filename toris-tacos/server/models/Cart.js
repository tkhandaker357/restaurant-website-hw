const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  clientId: { type: String, required: true, unique: true },
  items: [{ name: String, price: Number, qty: Number }],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);
