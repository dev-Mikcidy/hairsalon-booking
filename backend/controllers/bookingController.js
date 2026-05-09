import Booking from "../models/Booking.js";
import Customer from "../models/Customer.js";
import {
  bookingConfirmedTemplate,
  bookingUpdatedTemplate,
  bookingCancelledTemplate
} from "../utils/emailTemplates.js";

import { sendBookingEmail } from "../utils/sendBookingEmail.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { customerId, serviceId, date, time } = req.body;

    // Prevent double booking
    const exists = await Booking.findOne({ serviceId, date, time });
    if (exists) {
      return res.status(400).json({ msg: "This time slot is already booked." });
    }

    // Create booking
    const booking = await Booking.create({
      customerId,
      serviceId,
      date,
      time
    });

    // Populate customer + service
    const populated = await booking
      .populate("customerId")
      .populate("serviceId");

    // Send confirmation email
    try {
      await sendBookingEmail(
        populated.customerId.email,
        "Booking Confirmed",
        bookingConfirmedTemplate({
          customerName: populated.customerId.name,
          date: populated.date,
          time: populated.time,
          serviceName: populated.serviceId.name
        })
      );
    } catch (emailErr) {
      console.error("Email failed:", emailErr.message);
    }

    res.json(populated);
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ msg: "Error creating booking" });
  }
};

// GET ALL BOOKINGS
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customerId")
      .populate("serviceId");

    res.json(bookings);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ msg: "Error fetching bookings" });
  }
};

// UPDATE BOOKING
export const updateBooking = async (req, res) => {
  try {
    const { customerId, serviceId, date, time } = req.body;

    // Prevent double booking (exclude current booking)
    const conflict = await Booking.findOne({
      _id: { $ne: req.params.id },
      serviceId,
      date,
      time
    });

    if (conflict) {
      return res.status(400).json({ msg: "This time slot is already booked." });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { customerId, serviceId, date, time },
      { new: true }
    )
      .populate("customerId")
      .populate("serviceId");

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // Send update email
    try {
      await sendBookingEmail(
        booking.customerId.email,
        "Booking Updated",
        bookingUpdatedTemplate({
          customerName: booking.customerId.name,
          date: booking.date,
          time: booking.time,
          serviceName: booking.serviceId.name
        })
      );
    } catch (emailErr) {
      console.error("Email failed:", emailErr.message);
    }

    res.json(booking);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ msg: "Error updating booking" });
  }
};

// DELETE BOOKING
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("customerId")
      .populate("serviceId");

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // Send cancellation email
    try {
      await sendBookingEmail(
        booking.customerId.email,
        "Booking Cancelled",
        bookingCancelledTemplate({
          customerName: booking.customerId.name,
          date: booking.date,
          time: booking.time,
          serviceName: booking.serviceId.name
        })
      );
    } catch (emailErr) {
      console.error("Email failed:", emailErr.message);
    }

    await booking.deleteOne();

    res.json({ msg: "Booking deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ msg: "Error deleting booking" });
  }
};
export const getTodayBookings = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const bookings = await Booking.find({ date: today })
      .populate("customerId")
      .populate("serviceId");

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching today's bookings" });
  }
};

