import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 25 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    role: { type: String, default: 'admin' }
});

export default mongoose.model('User', userSchema);
