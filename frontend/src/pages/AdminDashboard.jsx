import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="container mt-4">

      {/* TOP NAVIGATION BAR */}
      <div
        className="d-flex gap-3 mb-4 p-3 rounded"
        style={{ background: "#222" }}
      >
        <Link to="/admin" className="text-white">Dashboard</Link>
        <Link to="/admin/services" className="text-white">Services</Link>
        <Link to="/admin/bookings" className="text-white">Bookings</Link>
        <Link to="/admin/customers" className="text-white">Customers</Link>
        <Link to="/login" className="text-white ms-auto">Logout</Link>
      </div>

      <h1 className="mb-4">Admin Dashboard</h1>

      {/* DASHBOARD CARDS */}
      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-4 text-center">
            <h4>Manage Services</h4>
            <p className="text-muted">Create, edit, and delete services</p>
            <Link to="/admin/services" className="btn btn-primary w-100">
              Go to Services
            </Link>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-4 text-center">
            <h4>Manage Bookings</h4>
            <p className="text-muted">View and manage all bookings</p>
            <Link to="/admin/bookings" className="btn btn-primary w-100">
              Go to Bookings
            </Link>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-4 text-center">
            <h4>Manage Customers</h4>
            <p className="text-muted">Add and edit customer profiles</p>
            <Link to="/admin/customers" className="btn btn-primary w-100">
              Go to Customers
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
