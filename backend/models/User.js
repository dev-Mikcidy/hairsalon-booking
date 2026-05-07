import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, require: true, min: 3,max:25 },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, min: 3, max: 15 },
    role: { type: String, default: 'customer' }
});

export default mongoose.model('User', userSchema);
