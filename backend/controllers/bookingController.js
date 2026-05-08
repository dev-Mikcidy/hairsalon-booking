import Booking from "../models/Booking.js";
import { 
  bookingConfirmedTemplate,
  bookingUpdatedTemplate,
  bookingCancelledTemplate
} from "../utils/emailTemplates.js";
import { sendBookingEmail } from "../utils/email.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    // Prevent double booking
    const exists = await Booking.findOne({
      serviceId: req.body.serviceId,
      date: req.body.date,
      time: req.body.time
    });

    if (exists) {
      return res.status(400).json({ msg: "This time slot is already booked." });
    }

    const booking = await Booking.create(req.body);

    // Try sending email (non-blocking)
    try {
      await sendBookingEmail(
        booking.customerEmail,
        "Booking Confirmed",
        bookingConfirmedTemplate(booking)
      );
    } catch (emailErr) {
      console.error("Email failed:", emailErr);
    }

    res.json(booking);
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ msg: "Error creating booking" });
  }
};

// GET ALL BOOKINGS
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("serviceId");
    res.json(bookings);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ msg: "Error fetching bookings" });
  }
};

// UPDATE BOOKING
export const updateBooking = async (req, res) => {
  try {
    // Prevent double booking (exclude current booking)
    const conflict = await Booking.findOne({
      _id: { $ne: req.params.id },
      serviceId: req.body.serviceId,
      date: req.body.date,
      time: req.body.time
    });

    if (conflict) {
      return res.status(400).json({ msg: "This time slot is already booked." });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // Try sending email (non-blocking)
    try {
      await sendBookingEmail(
        booking.customerEmail,
        "Booking Updated",
        bookingUpdatedTemplate(booking)
      );
    } catch (emailErr) {
      console.error("Email failed:", emailErr);
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
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // Try sending email (non-blocking)
    try {
      await sendBookingEmail(
        booking.customerEmail,
        "Booking Cancelled",
        bookingCancelledTemplate(booking)
      );
    } catch (emailErr) {
      console.error("Email failed:", emailErr);
    }

    await booking.deleteOne();

    res.json({ msg: "Booking deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ msg: "Error deleting booking" });
  }
};
