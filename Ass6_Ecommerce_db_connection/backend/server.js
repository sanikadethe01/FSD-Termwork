const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fashionstore";
const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

const Order = require("./models/Order");

app.get("/", (req, res) => {
  res.send("Ecommerce order API is running");
});

app.post("/api/orders", async (req, res) => {
  try {
    const { items, customerName } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Order must include at least one item." });
    }

    // Calculate total from items to ensure accuracy
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order = new Order({ items, total, customerName });
    const savedOrder = await order.save();

    res.status(201).json({ message: "Order created", order: savedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error creating order." });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(50);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error fetching orders." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
