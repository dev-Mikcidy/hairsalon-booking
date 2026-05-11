💇‍♂️ Hair Salon Booking System

A full-stack web application for managing hair salon services, customers, and bookings.
Customers can book appointments online, while administrators manage services, bookings, and customers through a secure dashboard.

📌 System Overview

This application digitizes the daily operations of a hair salon.

Customers can browse services and book appointments online
Admins can manage services, bookings, and customers through a protected dashboard 
Includes authentication, validation, and cloud database integration
Fully deployed frontend and backend


🛠️ Tech Stack


Frontend

React (Vite)
React Router
Fetch API
Deployed on Vercel


Backend

Node.js + Express
MongoDB + Mongoose (MongoDB Atlas)
JWT Authentication
Deployed on Render


✨ Features


👤 Customer Features

View available salon services

Book appointments online

Form validation
Booking confirmation feedback

🛡️ Admin Features

Secure login (JWT authentication)

Full CRUD for services

Full CRUD for bookings

Full CRUD for customers

Protected routes

Real-time data updates

Loading and error handling


📁 Project Structure
hairsalon-booking/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── App.jsx
│       └── main.jsx


🔐 Environment Variables


Backend (.env)

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret

PORT=5000


🚀 Running the Project Locally


Install dependencies

npm install

npm install --prefix backend

npm install --prefix frontend

Run both frontend and backend together

Install concurrently (if not installed):

npm install concurrently --save-dev

Add this to your root package.json:

"scripts": {
  "dev": "concurrently \"npm run dev --prefix backend\" \"npm run dev --prefix frontend\""
}

Then run:

npm run dev


🔌 API Overview
Auth

POST /auth/login


Services

GET /services

POST /services

PUT /services/:id

DELETE /services/:id


Bookings

GET /bookings

POST /bookings

PUT /bookings/:id

DELETE /bookings/:id


Customers

GET /customers

POST /customers

PUT /customers/:id


DELETE /customers/:id


🌐 Deployment

Frontend (Vercel)

Live Frontend

Backend (Render)

Live Backend

🎯 Problem It Solves

Many hair salons still rely on manual booking systems, which can lead to:

Double bookings

Missed appointments

Poor customer tracking

Disorganized scheduling

This system provides a modern digital solution that improves efficiency, accuracy, and user experience for both customers and administrators.

📸 Screenshots
<img width="1409" height="823" alt="image" src="https://github.com/user-attachments/assets/2efe7aab-8408-44a9-8c41-327cf5351245" />
