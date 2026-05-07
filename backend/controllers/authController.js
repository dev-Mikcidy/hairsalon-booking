// backend/controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'Invalid email' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: 'Invalid password' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
};
