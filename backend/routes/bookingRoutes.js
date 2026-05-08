import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking
} from "../controllers/bookingController.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getAllBookings);
router.post("/", authMiddleware, adminMiddleware, createBooking);
router.put("/:id", authMiddleware, adminMiddleware, updateBooking);
router.delete("/:id", authMiddleware, adminMiddleware, deleteBooking);

export default router;
