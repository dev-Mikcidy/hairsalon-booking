import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Bookings from "./pages/Bookings";
import AdminServices from "./pages/AdminServices";
import ProtectedRoute from "./ProtectedRoute";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>}/>
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
