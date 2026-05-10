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
    // SANITIZE INPUT
    const serviceId = String(req.body.serviceId).trim();
    const customerId = String(req.body.customerId).trim();
    const date = String(req.body.date).trim();
    const time = String(req.body.time).trim();

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(400).json({ msg: "Customer not found" });
    }

    // Prevent double booking
    const exists = await Booking.findOne({
      serviceId,
      date,
      time
    });

    if (exists) {
      return res.status(400).json({ msg: "This time slot is already booked." });
    }

    const booking = await Booking.create({
      customerId: customer._id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      serviceId,
      date,
      time
    });

    // ⭐ SENDGRID EMAIL CONFIRMATION
    try {
      await sendBookingEmail(
        customer.email,
        "Booking Confirmed",
        bookingConfirmedTemplate({
          customerName: customer.name,
          date,
          time,
          serviceName: booking.serviceId?.name || "Your Service"
        })
      );
    } catch (emailErr) {
      console.error("SendGrid email failed:", emailErr.message);
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
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) {
      return res.status(400).json({ msg: "Customer not found" });
    }

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
      {
        customerId: customer._id,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        serviceId: req.body.serviceId,
        date: req.body.date,
        time: req.body.time
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
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

