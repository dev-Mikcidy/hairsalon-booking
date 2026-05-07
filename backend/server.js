import express from 'express';
import cors from 'cors';
//import connectDB from './config/db.js';
import dotenv from 'dotenv';


dotenv.config();
//connectDB();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running with ES modules' );
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));