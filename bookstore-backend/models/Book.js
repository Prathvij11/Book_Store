const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  price: Number,
  cover_image: String,
  description: String
});

const Book = mongoose.model("Book", BookSchema);

// GET all books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// GET single book
router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

// ADD book
router.post("/", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
});

// UPDATE book
router.put("/:id", async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
});

// DELETE book
router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;