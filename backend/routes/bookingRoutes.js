import express from "express";
import {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking
} from "../controllers/bookingController.js";
import { getBookingsByDate } from "../controllers/bookingController.js";


const router = express.Router();


router.get("/", getAllBookings);


router.post("/", createBooking);


router.put("/:id", updateBooking);


router.delete("/:id", deleteBooking);

router.get("/by-date", getBookingsByDate);

export default router;
