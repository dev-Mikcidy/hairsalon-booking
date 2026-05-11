export default function AdminDashboard() {
  return (
    <div className="container mt-4">

      {/* TOP NAVIGATION BAR */}
      <div
        className="d-flex gap-3 mb-4 p-3 rounded"
        style={{ background: "#222" }}
      >
        <a href="/admin" className="text-white">Dashboard</a>
        <a href="/admin/services" className="text-white">Services</a>
        <a href="/admin/bookings" className="text-white">Bookings</a>
        <a href="/admin/customers" className="text-white">Customers</a>
        <a href="/login" className="text-white ms-auto">Logout</a>
      </div>

      <h1 className="mb-4">Admin Dashboard</h1>

      {/* DASHBOARD CARDS */}
      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-4 text-center">
            <h4>Manage Services</h4>
            <p className="text-muted">Create, edit, and delete services</p>
            <a href="/admin/services" className="btn btn-primary w-100">
              Go to Services
            </a>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-4 text-center">
            <h4>Manage Bookings</h4>
            <p className="text-muted">View and manage all bookings</p>
            <a href="/admin/bookings" className="btn btn-primary w-100">
              Go to Bookings
            </a>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-4 text-center">
            <h4>Manage Customers</h4>
            <p className="text-muted">Add and edit customer profiles</p>
            <a href="/admin/customers" className="btn btn-primary w-100">
              Go to Customers
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
