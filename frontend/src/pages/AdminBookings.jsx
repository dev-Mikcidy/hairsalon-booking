import { useEffect, useState } from "react";
import api from "../services/api.js";
import { Link, useNavigate } from "react-router-dom";

export default function AdminBookings() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);

  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    customerId: "",
    serviceId: "",
    date: "",
    time: ""
  });

  const [editing, setEditing] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const b = await api.get("/admin/bookings");
      const s = await api.get("/admin/services");
      const c = await api.get("/admin/customers");

      setBookings(b.data);
      setServices(s.data);
      setCustomers(c.data);
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/bookings", form);

      setForm({
        customerId: "",
        serviceId: "",
        date: "",
        time: ""
      });

      loadData();
    } catch (err) {
      alert(err.response?.data?.msg || "Error creating booking");
    }
  };

  const deleteBooking = async (id) => {
    try {
      await api.delete(`/admin/bookings/${id}`);
      loadData();
    } catch (err) {
      alert(err.response?.data?.msg || "Error deleting booking");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/bookings/${editing._id}`, editing);
      setEditing(null);
      loadData();
    } catch (err) {
      alert(err.response?.data?.msg || "Error updating booking");
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const term = search.toLowerCase();

    return (
      b.customerId?.name?.toLowerCase().includes(term) ||
      b.customerId?.email?.toLowerCase().includes(term) ||
      b.customerId?.phone?.toLowerCase().includes(term) ||
      b.serviceId?.name?.toLowerCase().includes(term) ||
      b.date?.toLowerCase().includes(term) ||
      b.time?.toLowerCase().includes(term)
    );
  });

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

      <h1 className="mb-4">Admin Bookings</h1>

      {/* SEARCH BAR */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search bookings..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ maxWidth: "350px" }}
      />

      {/* LOADING + ERROR */}
      {loading && <div className="alert alert-info">Loading data...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* CREATE BOOKING CARD */}
      <div className="card p-4 mb-4" style={{ maxWidth: "450px" }}>
        <h4>Create Booking</h4>

        <form onSubmit={handleCreate} className="mt-3">

          <select
            name="customerId"
            className="form-select mb-3"
            value={form.customerId}
            onChange={handleChange}
            required
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name} ({c.email})
              </option>
            ))}
          </select>

          <select
            name="serviceId"
            className="form-select mb-3"
            value={form.serviceId}
            onChange={handleChange}
            required
          >
            <option value="">Select Service</option>
            {services.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            className="form-control mb-3"
            value={form.date}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="time"
            className="form-control mb-3"
            value={form.time}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Please wait..." : "Create Booking"}
          </button>
        </form>
      </div>

      {/* BOOKINGS TABLE */}
      {!loading && !error && (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th style={{ width: "150px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b._id}>
                <td>{b.customerId?.name}</td>
                <td>{b.customerId?.email}</td>
                <td>{b.customerId?.phone}</td>
                <td>{b.serviceId?.name || "Unknown"}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>

                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => setEditing(b)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteBooking(b._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* EDIT MODAL */}
      {editing && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content p-3">

              <h4>Edit Booking</h4>

              <form onSubmit={handleUpdate} className="mt-3">

                <select
                  className="form-select mb-3"
                  value={editing.customerId?._id || editing.customerId}
                  onChange={(e) =>
                    setEditing({ ...editing, customerId: e.target.value })
                  }
                >
                  {customers.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name} ({c.email})
                    </option>
                  ))}
                </select>

                <select
                  className="form-select mb-3"
                  value={editing.serviceId?._id || editing.serviceId}
                  onChange={(e) =>
                    setEditing({ ...editing, serviceId: e.target.value })
                  }
                >
                  {services.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  className="form-control mb-3"
                  value={editing.date}
                  onChange={(e) =>
                    setEditing({ ...editing, date: e.target.value })
                  }
                />

                <input
                  type="time"
                  className="form-control mb-3"
                  value={editing.time}
                  onChange={(e) =>
                    setEditing({ ...editing, time: e.target.value })
                  }
                />

                <button className="btn btn-primary w-100 mb-2">Save</button>
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={() => setEditing(null)}
                >
                  Cancel
                </button>
              </form>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
