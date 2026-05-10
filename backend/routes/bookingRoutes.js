import express from "express";
import {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking
} from "../controllers/bookingController.js";

const router = express.Router();

// ADMIN — GET all bookings
router.get("/", getAllBookings);

// ADMIN — CREATE booking
router.post("/", createBooking);

// ADMIN — UPDATE booking
router.put("/:id", updateBooking);

// ADMIN — DELETE booking
router.delete("/:id", deleteBooking);

export default router;
