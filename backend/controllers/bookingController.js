import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  const booking = await Booking.create({
    userId: req.user.id,
    ...req.body
  });
  res.json(booking);
};

export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id }).populate('serviceId');
  res.json(bookings);
};

export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate('serviceId userId');
  res.json(bookings);
};
