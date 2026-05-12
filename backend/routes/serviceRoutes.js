import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';
import {
  getAllServices,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';

const router = express.Router();

router.get('/', getAllServices);
router.post('/',  createService);
router.put('/:id',  updateService);
router.delete('/:id', deleteService);

export default router;
