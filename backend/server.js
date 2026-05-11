import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

import { authMiddleware } from "./middleware/authMiddleware.js";
import { adminMiddleware } from "./middleware/adminMiddleware.js";

import publicBookingRoutes from "./routes/publicBookingRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",                     
    "https://hairsalon-booking.vercel.app"     
  ],
  credentials: true
}));

app.use(express.json());


app.use("/public", publicBookingRoutes);


app.use("/auth", authRoutes);


app.use("/services", authMiddleware, adminMiddleware, serviceRoutes);
app.use("/bookings", authMiddleware, adminMiddleware, bookingRoutes);
app.use("/api/customers", authMiddleware, adminMiddleware, customerRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
