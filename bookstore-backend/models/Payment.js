const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const PaymentSchema = new mongoose.Schema({
  paymentId: String,
  amount: Number,
  status: String,
  date: Date
});

const Payment = mongoose.model("Payment", PaymentSchema);

router.get("/", async (req, res) => {
  const payments = await Payment.find();
  res.json(payments);
});

router.post("/", async (req, res) => {
  const payment = new Payment(req.body);
  await payment.save();
  res.status(201).json(payment);
});

module.exports = router;