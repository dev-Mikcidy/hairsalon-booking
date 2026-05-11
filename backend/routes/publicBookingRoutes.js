import express from "express";
import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import Customer from "../models/Customer.js";
import { sendBookingEmail } from "../utils/sendBookingEmail.js";

const router = express.Router();


router.get("/services", async (req, res) => {
  try {
    const services = await Service.find().select("name price duration");
    res.json(services);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/bookings", async (req, res) => {
  try {
    const { name, phone, email, serviceId, date, time } = req.body;

    if (!name || !phone || !serviceId || !date || !time) {
      return res.status(400).json({ msg: "Please fill in all required fields" });
    }

  
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ msg: "Selected service not found" });
    }


    const customer = await Customer.create({
      name,
      email: email || "no-email@guest.com",
      phone,
    });

  
    const booking = await Booking.create({
      customerName: name,
      customerEmail: email || "no-email@guest.com",
      customerPhone: phone,
      serviceId,
      date,
      time,
      customerId: customer._id,
    });

   
    if (email) {
      await sendBookingEmail(
        email,
        "Your Booking is Confirmed",
        `
          <h2>Your Booking is Confirmed</h2>
          <p>Hello ${name},</p>
          <p>Your appointment for <strong>${service.name}</strong> is booked.</p>
          <p>Date: ${date}</p>
          <p>Time: ${time}</p>
        `
      );
    }

    res.status(201).json({ msg: "Booking created successfully", booking });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
