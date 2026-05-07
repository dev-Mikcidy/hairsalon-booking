import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: String,
  duration: Number,
  price: Number,
  Comment: String
});

export default mongoose.model('Service', serviceSchema);
