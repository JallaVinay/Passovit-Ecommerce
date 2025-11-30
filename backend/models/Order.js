const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },       // snapshot
  size: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true }       // snapshot
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
  shippingAddress: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
