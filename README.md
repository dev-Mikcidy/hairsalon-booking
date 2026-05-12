# 💇 Hair Salon Booking System — Full-Stack Application

## 📌 Overview
This project is a full-stack booking system designed for a hair salon. It includes a public interface for customers and a secure admin dashboard for managing services, customers, and bookings.

The system is built using a **modular monolithic architecture**, making it clean, scalable, and easy to maintain.

### The application supports:
- Customer bookings  
- Admin authentication  
- CRUD operations for services, customers, and bookings  
- Email notifications  
- Real-time validation (e.g., preventing double-booking)  
- Deployment on modern cloud platforms  

---

## 🛠️ Technologies Used

### Frontend
- React  
- React Router  
- Axios  
- Bootstrap  

👉 Learn more: https://react.dev/

---

### Backend
- Node.js  
- Express  
- MongoDB + Mongoose  
- JWT Authentication  
- SendGrid Email API  

👉 Learn more: https://jwt.io/introduction

---

### Deployment
- Frontend: Vercel  
- Backend: Render  
- Environment variables for secure configuration  

---

## ✨ Key Features

## 1. 🔐 Admin Authentication
- Secure login using JWT  
- Token stored in `localStorage`  
- Protected admin routes  
- Auto redirect to `/admin/login` if token is missing  

👉 Learn more: https://reactrouter.com/en/main/start/overview

---

## 2. 🧭 Admin Dashboard
Admins can manage:
- Services  
- Customers  
- Bookings  

Each admin page includes:
- Navigation bar  
- Logout button  
- CRUD forms  
- Search and filtering  
- Validation and error handling  

---

## 3. ✂️ Service Management
Admins can:
- Create services  
- Edit services  
- Delete services  
- View all services  

### Validation rules:
- Name is required  
- Price must be ≥ 1 DKK  
- Duration must be ≥ 5 minutes  

---

## 4. 👤 Customer Management
Admins can:
- Add customers  
- Edit customer details  
- Delete customers  
- View all customers  

---

## 5. 📅 Booking Management
Admins can:
- Create bookings  
- Edit bookings  
- Delete bookings  
- Filter bookings  
- View today’s bookings  
- View bookings by date  

### 🚫 Double-booking prevention
Before creating or updating a booking, the backend checks:
- serviceId  
- date  
- time  

If a booking already exists, the request is rejected.

---

## 6. 📧 Email Notifications
The system sends emails for:
- Booking confirmation  
- Booking updates  
- Booking cancellation  

Emails include:
- Customer name  
- Service name  
- Date  
- Time  

---

## 7. 🗂️ Data Population
The backend uses `Mongoose populate()` to replace ObjectIds with full documents.

Used in:
- getAllBookings  
- getTodayBookings  
- getBookingsByDate  
- deleteBooking  

This allows the admin dashboard to display:
- Customer name  
- Email  
- Phone  
- Service name  

---

## 8. ⚛️ Frontend React Logic

### useState
Stores component data  
Example: bookings, services, forms  

### useEffect
Runs side effects  
Example: loading data on page load  

### onChange
Updates state when user types or selects values  

---

## 📡 API Overview

### 🔐 Admin Routes

- POST `/admin/login` — authenticate admin  
- GET `/admin/services` — list services  
- POST `/admin/services` — create service  
- PUT `/admin/services/:id` — update service  
- DELETE `/admin/services/:id` — delete service  

- GET `/admin/customers` — list customers  
- POST `/admin/customers` — create customer  
- PUT `/admin/customers/:id` — update customer  
- DELETE `/admin/customers/:id` — delete customer  

- GET `/admin/bookings` — list bookings  
- POST `/admin/bookings` — create booking  
- PUT `/admin/bookings/:id` — update booking  
- DELETE `/admin/bookings/:id` — delete booking  

- GET `/admin/bookings/today` — today’s bookings  
- GET `/admin/bookings/by-date?date=YYYY-MM-DD` — bookings by date  

---

## 📆 Today’s Bookings Logic
To fetch today’s bookings, the backend generates today’s date in the same format stored in MongoDB:

```text
I generate today’s date in YYYY-MM-DD format using
new Date().toISOString().split('T')[0],
then query MongoDB for bookings where the date matches.

---

## 🚪 Logout Logic

The logout button:

- Removes JWT token
- Redirects to /admin/login
- Forces re-login for security

---

## 🎯 Conclusion

### This project demonstrates a complete full-stack application with:

- Authentication
- Admin dashboard
- CRUD operations
- Email notifications
- Real-time validation
- Clean architecture
- Cloud deployment

- It is designed as a modern, scalable booking system ready for production use