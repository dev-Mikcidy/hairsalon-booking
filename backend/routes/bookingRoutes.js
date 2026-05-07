import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';
import {
  createBooking,
  getMyBookings,
  getAllBookings
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.get('/my', authMiddleware, getMyBookings);
router.get('/all', authMiddleware, adminMiddleware, getAllBookings);

export default router;
