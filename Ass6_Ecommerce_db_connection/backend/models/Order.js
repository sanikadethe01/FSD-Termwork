const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  productId: Number,
  name: String,
  price: Number,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema({
  items: {
    type: [OrderItemSchema],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  customerName: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
