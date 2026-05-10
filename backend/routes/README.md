Hair Salon Booking System
A full‑stack application for managing hair salon appointments, built with React, Express, and MongoDB Atlas.
Customers can book appointments online, and admins can manage services, customers, and bookings through a secure dashboard.

1. System Overview
This application solves the problem of managing hair salon appointments by providing a modern online booking system.
Customers can book services through a public form, while salon staff can manage bookings through an admin dashboard with full CRUD functionality.

2. Features
Public Booking
Customers can book appointments without creating an account

Form includes name, phone, email (optional), service, date, time, notes

Prevents invalid submissions

Stores customer + booking in MongoDB

Admin Dashboard
View all bookings in a table

Edit bookings

Delete bookings

Manage services

Auto‑refresh (optional)

Search/filter (optional)

Backend
Full CRUD for bookings

Relational endpoints (populate customer + service)

Input validation

Error handling

Modular Router → Controller → Model structure


3. Tech Stack
Frontend
React (Vite)

React Router

Axios

Bootstrap


Backend
Node.js + Express

Mongoose

MongoDB Atlas

dotenv

Deployment
Render


4. Project Structure

/project-root
  /backend
    /controllers
    /models
    /routes
    server.js
  /frontend
    /src
      /components
      /pages
      App.jsx
  README.md
  package.json

5. Environment Variables
Create a .env file in backend:
MONGO_URI=your_mongodb_atlas_url
PORT=5001
JWT_SECRET=your_secret
SENDGRID_API_KEY=your_key   # optional
SENDGRID_API_URL=https://api.sendgrid.com/v3/mail/send
EMAIL_FROM=your_email

6. How to Run the Project
npm install
cd backend && npm install
cd ../frontend && npm install

Start both frontend + backend
npm run dev

7. Database Design (ERD)

Collections
customers

services

bookings

Relationships
booking.customerId → customers._id

booking.serviceId → services._id

ERD Diagram (Text Version)
CUSTOMERS
- _id
- name
- email
- phone

SERVICES
- _id
- name
- price
- duration

BOOKINGS
- _id
- customerId (ref: customers)
- serviceId (ref: services)
- date
- time
- notes


8. API Documentation

GET public/services
Returns all services for the public booking form.

POST /public/bookings
Creates a new booking.

Body:
{
  "name": "Tiffany",
  "phone": "71622723",
  "email": "tiffany@gmail.com",
  "serviceId": "663a...",
  "date": "2026-05-03",
  "time": "14:00",
  "notes": "Optional"
}

GET /admin/bookings
Returns all bookings with populated customer + service.

PUT /admin/bookings/:id
Updates a booking.

DELETE /admin/bookings/:id
Deletes a booking.

9. Custom Endpoint
GET /admin/bookings/by-date?date=YYYY-MM-DD
Returns all bookings for a specific date.

10. Frontend Features
Admin Booking Table
Displays all bookings

Shows loading + error states

Supports delete + edit

Optional: search, filter, auto-refresh

Public Booking Form
Controlled inputs

Validates required fields

Shows success/error messages

11. Reflection
Challenge:  
The biggest challenge was handling duplicate customer emails and preventing MongoDB from throwing a unique index error.

Solution:  
I removed the unique constraint from the Customer model and dropped the old index from MongoDB. This allowed repeat customers to book multiple appointments without errors.

What I learned:  
I learned how MongoDB indexes persist even after schema changes, and how to debug 500 errors by checking backend logs and database constraints.

12. Feature Iteration
Initial Implementation
Originally, the Customer model had: email: { unique: true, required: true }
This caused 500 errors when the same customer booked twice.

Improved Implementation
I updated the model to: email: { required: false }
Then removed the unique index from MongoDB.
Commit References
fix: remove unique email constraint
fix: stabilize public booking flow

13. Deployment Instructions
Backend Deployment
Deploy to Render / Railway

Add environment variables

Set build command: npm install

Set start command: node server.js

Frontend Deployment
Deploy to Vercel / Netlify

Set environment variable: VITE_API_URL

Build command: npm run build

Output directory: dist

14. License
This project is for educational purposes under Kristianstad University’s Fullstack Lab.