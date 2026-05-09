import express from "express";

import {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  getTodayBookings
} from "../controllers/bookingController.js";

import Booking from "../models/Booking.js";

const router = express.Router();

// =========================
// CRUD ROUTES (NO AUTH)
// =========================
router.get("/", getAllBookings);
router.post("/", createBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

// =========================
// CUSTOM ENDPOINT
// GET TODAY'S BOOKINGS
// =========================
router.get("/today", getTodayBookings);

// =========================
// RELATIONAL ENDPOINT 1
// GET BOOKINGS BY CUSTOMER
// =========================
router.get("/by-customer/:customerId", async (req, res) => {
  try {
    const bookings = await Booking.find({
      customerId: req.params.customerId
    })
      .populate("customerId")
      .populate("serviceId");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching customer bookings" });
  }
});

// =========================
// RELATIONAL ENDPOINT 2
// GET BOOKINGS BY SERVICE
// =========================
router.get("/by-service/:serviceId", async (req, res) => {
  try {
    const bookings = await Booking.find({
      serviceId: req.params.serviceId
    })
      .populate("customerId")
      .populate("serviceId");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching service bookings" });
  }
});

// =========================
// CUSTOM ENDPOINT 2
// MOST POPULAR SERVICE
// =========================
router.get("/stats/most-popular-service", async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $group: {
          _id: "$serviceId",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    if (result.length === 0) {
      return res.json({ msg: "No bookings found" });
    }

    const populated = await Booking.populate(result, {
      path: "_id",
      model: "Service"
    });

    res.json({
      service: populated[0]._id,
      totalBookings: populated[0].count
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ msg: "Error generating statistics" });
  }
});

export default router;
