import express from "express";
import Customer from "../models/Customer.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.json(customer);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});


router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});


router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.json(customer);
});


router.put("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(customer);
});


router.delete("/:id", async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ msg: "Customer deleted" });
});

export default router;
