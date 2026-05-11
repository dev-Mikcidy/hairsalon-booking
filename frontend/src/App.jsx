import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import AdminServices from "./pages/AdminServices.jsx";
import AdminBookings from "./pages/AdminBookings.jsx";
import AdminCustomers from "./pages/AdminCustomers.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

import Services from "./pages/Services.jsx";
import PublicBooking from "./pages/PublicBooking.jsx";
import PublicHome from "./pages/PublicHome.jsx"; // <-- create this simple page

function App() {
  return (
    <Routes>

     
      <Route path="/" element={<PublicHome />} />
      <Route path="/services" element={<Services />} />
      <Route path="/book" element={<PublicBooking />} />

  
      <Route path="/admin/login" element={<Login />} />

    
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/services"
        element={
          <ProtectedRoute>
            <AdminServices />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoute>
            <AdminBookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/customers"
        element={
          <ProtectedRoute>
            <AdminCustomers />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PublicHome />} />
    </Routes>
  );
}

export default App;
