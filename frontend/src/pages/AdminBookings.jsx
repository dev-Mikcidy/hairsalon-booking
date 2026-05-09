import React, { useEffect, useState } from "react";
import api from "../Services/api.js";

function AdminBookings() {
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

      const b = await api.get("/bookings");
      const s = await api.get("/services");
      const c = await api.get("/customers");

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
      await api.post("/bookings", form);

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
      await api.delete(`/bookings/${id}`);
      loadData();
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/bookings/${editing._id}`, editing);
      setEditing(null);
      loadData();
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  // ⭐ SEARCH / FILTER LOGIC
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
    <div style={{ padding: "20px" }}>
      {/* Admin Navigation */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          background: "#eee",
          padding: "10px"
        }}
      >
        <a href="/admin/services">Manage Services</a>
        <a href="/admin/bookings">Manage Bookings</a>
        <a href="/login">Logout</a>
      </div>

      <h1>Admin Bookings</h1>

      {/* ⭐ SEARCH BAR */}
      <input
        type="text"
        placeholder="Search bookings..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          width: "300px",
          marginBottom: "20px",
          border: "1px solid #ccc"
        }}
      />

      {/* LOADING + ERROR UI */}
      {loading && (
        <p style={{ color: "blue", fontWeight: "bold" }}>Loading data...</p>
      )}

      {error && (
        <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
      )}

      {/* Create Booking */}
      <div style={{ maxWidth: "400px", marginBottom: "30px" }}>
        <h2>Create Booking</h2>

        <form onSubmit={handleCreate}>
          {/* CUSTOMER DROPDOWN */}
          <select
            name="customerId"
            value={form.customerId}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name} ({c.email})
              </option>
            ))}
          </select>

          {/* SERVICE DROPDOWN */}
          <select
            name="serviceId"
            value={form.serviceId}
            onChange={handleChange}
            required
            disabled={loading}
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
            value={form.date}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <button type="submit" style={{ marginTop: "10px" }} disabled={loading}>
            {loading ? "Please wait..." : "Create Booking"}
          </button>
        </form>
      </div>

      {/* Bookings Table */}
      {!loading && !error && (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
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
                  <button onClick={() => setEditing(b)}>Edit</button>
                  <button onClick={() => deleteBooking(b._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {editing && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div style={{ background: "white", padding: "20px", width: "400px" }}>
            <h2>Edit Booking</h2>

            <form onSubmit={handleUpdate}>
              {/* CUSTOMER DROPDOWN */}
              <select
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

              {/* SERVICE DROPDOWN */}
              <select
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
                value={editing.date}
                onChange={(e) =>
                  setEditing({ ...editing, date: e.target.value })
                }
              />

              <input
                type="time"
                value={editing.time}
                onChange={(e) =>
                  setEditing({ ...editing, time: e.target.value })
                }
              />

              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditing(null)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBookings;
