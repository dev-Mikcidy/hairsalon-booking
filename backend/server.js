import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import bookingRoutes from "./routes/bookingRoutes.js";


dotenv.config();
connectDB();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/services', serviceRoutes);
app.use('/bookings', bookingRoutes);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));