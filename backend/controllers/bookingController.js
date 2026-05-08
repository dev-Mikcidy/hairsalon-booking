import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import { sendBookingEmail } from "../utils/email.js";

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    await sendBookingEmail(
      booking.customerEmail,
      "Booking Confirmed",
      `Your appointment for ${booking.date} at ${booking.time} is confirmed.`
    );

    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: "Error creating booking" });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("serviceId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching bookings" });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });

    await sendBookingEmail(
      booking.customerEmail,
      "Booking Updated",
      `Your appointment has been updated to ${booking.date} at ${booking.time}.`
    );

    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: "Error updating booking" });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    await sendBookingEmail(
      booking.customerEmail,
      "Booking Cancelled",
      `Your appointment on ${booking.date} at ${booking.time} has been cancelled.`
    );

    await booking.deleteOne();

    res.json({ msg: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting booking" });
  }
};
