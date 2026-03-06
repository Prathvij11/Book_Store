const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const CartSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  price: Number,
  cover_image: String,
  qty: Number
});

const Cart = mongoose.model("Cart", CartSchema);

router.get("/", async (req, res) => {
  const items = await Cart.find();
  res.json(items);
});

router.post("/", async (req, res) => {
  const item = new Cart(req.body);
  await item.save();
  res.status(201).json(item);
});

router.patch("/:id", async (req, res) => {
  const item = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

// ✅ CLEAR CART FIRST
router.delete("/clear-cart", async (req, res) => {
  await Cart.deleteMany({});
  res.json({ message: "Cart cleared" });
});

// ✅ THEN dynamic route
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;