# 💇 Hair Salon Booking System

A full-stack salon booking application built with React, Node.js, Express, and MongoDB.

The application allows customers to book appointments while giving administrators a secure dashboard to manage services, customers, and bookings.

---

# 🚀 Features

## Public Features
- View available salon services
- Create bookings online
- Prevent double bookings
- Responsive user interface

## Admin Features
- Secure admin authentication using JWT
- Manage services
- Manage customers
- Manage bookings
- Edit and delete records
- View bookings by date
- View today’s bookings
- Automatic logout handling

## Real-Time Updates
The admin dashboard uses polling with `setInterval()` to automatically refresh customer and booking data every 5 seconds without reloading the page.

## Email Notifications
Automatic email notifications are sent when:
- A booking is confirmed
- A booking is updated
- A booking is cancelled

---

# 🛠️ Technologies Used

## Frontend
- React
- React Router
- Axios
- Bootstrap

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Nodemailer
- SendGrid

## Deployment
- Frontend deployed on Vercel
- Backend deployed on Render

---

# 🏗️ Project Architecture

This project follows a modular monolithic architecture with separate frontend and backend folders.

```text
project-root/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── backend/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── controllers/
│   ├── config/
│   └── templates/
│
└── package.json
```

---

# 🔐 Authentication & Authorization

The system uses JWT authentication for admin access.

Features include:
- Protected admin routes
- JWT token validation
- Admin middleware authorization
- Token storage in localStorage
- Automatic redirect to `/admin/login` if unauthenticated

Axios interceptors automatically attach the JWT token to authenticated requests.

---

# 📡 API Overview

## Authentication
- `POST /auth/login`

## Services
- `GET /admin/services`
- `POST /admin/services`
- `PUT /admin/services/:id`
- `DELETE /admin/services/:id`

## Customers
- `GET /admin/customers`
- `POST /admin/customers`
- `PUT /admin/customers/:id`
- `DELETE /admin/customers/:id`

## Bookings
- `GET /admin/bookings`
- `POST /admin/bookings`
- `PUT /admin/bookings/:id`
- `DELETE /admin/bookings/:id`
- `GET /admin/bookings/today`
- `GET /admin/bookings/by-date`

---

# 📧 Email System

The application uses SendGrid and Nodemailer to send HTML email notifications.

Emails include:
- Customer name
- Service name
- Booking date
- Booking time

Notification types:
- Booking confirmation
- Booking update
- Booking cancellation

---

# 🚫 Double Booking Prevention

Before creating or updating a booking, the backend validates:
- Service
- Date
- Time

If another booking already exists for the same slot, the request is rejected.

---

# ⚙️ Environment Variables

## Backend `.env`

```env
PORT=5001
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
SENDGRID_API_KEY=your_sendgrid_key
EMAIL_FROM=your_email
```

## Frontend `.env`

```env
VITE_API_URL=http://localhost:5001
```

---

# ▶️ Installation & Setup

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

---

## 2. Install Dependencies

### Install root dependencies
```bash
npm install
```

### Install backend dependencies
```bash
cd backend
npm install
```

### Install frontend dependencies
```bash
cd ../frontend
npm install
```

---

# ▶️ Running the Application

## Run Frontend and Backend Together

From the project root:

```bash
npm run dev
```

This uses `concurrently` to run both servers at the same time.

---

## Run Backend Only

```bash
cd backend
npm run dev
```

Backend runs on:
```text
http://localhost:5001
```

---

## Run Frontend Only

```bash
cd frontend
npm run dev
```

Frontend usually runs on:
```text
http://localhost:5173
```

---

# 🌐 Deployment

## Frontend
Deployed with Vercel.

## Backend
Deployed with Render.

CORS is configured to allow deployed frontend domains.

---

# 📚 Important Concepts Used

- React Hooks (`useState`, `useEffect`)
- Axios interceptors
- REST APIs
- JWT Authentication
- Middleware authorization
- MongoDB population with `populate()`
- Real-time polling
- Environment variable management
- CRUD operations

---

# 🎯 Future Improvements

Possible future improvements:
- Real WebSocket implementation
- Calendar integration
- SMS notifications
- Customer accounts
- Payment integration
- Booking analytics dashboard

---

# 👨‍💻 Author

Developed by Michael Agunbiade.