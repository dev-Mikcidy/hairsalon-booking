import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    date: String,
    time: String
})

export default mongoose.model("Booking", bookingSchema)