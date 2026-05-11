import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Service name is required"],
    trim: true,
    minlength: [2, "Service name must be at least 2 characters"]
  },

  description: {
    type: String,
    trim: true,
    maxlength: [200, "Description cannot exceed 200 characters"]
  },

  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [1, "Price must be at least 1 DKK"]
  },

  duration: {
    type: Number,
    required: [true, "Duration is required"],
    min: [5, "Duration must be at least 5 minutes"],
    max: [300, "Duration cannot exceed 300 minutes"]
  }
});

export default mongoose.model("Service", serviceSchema);
