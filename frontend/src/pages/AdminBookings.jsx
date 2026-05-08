import React, { useEffect, useState } from "react";
import api from "../Services/api.js";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    serviceId: "",
    date: "",
    time: ""
  });

  const [editing, setEditing] = useState(null);

  const loadData = async () => {
    try {
      const b = await api.get("/bookings");
      const s = await api.get("/services");

      setBookings(b.data);
      setServices(s.data);
    } catch (err) {
      console.error("Error loading data:", err);
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
        customerName: "",
        customerEmail: "",
        customerPhone: "",
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

      {/* Create Booking */}
      <div style={{ maxWidth: "400px", marginBottom: "30px" }}>
        <h2>Create Booking</h2>

        <form onSubmit={handleCreate}>
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={form.customerName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="customerEmail"
            placeholder="Customer Email"
            value={form.customerEmail}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="customerPhone"
            placeholder="Customer Phone"
            value={form.customerPhone}
            onChange={handleChange}
            required
          />

          <select
            name="serviceId"
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
            value={form.date}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />

          <button type="submit" style={{ marginTop: "10px" }}>
            Create Booking
          </button>
        </form>
      </div>

      {/* Bookings Table */}
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
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.customerName}</td>
              <td>{b.customerEmail}</td>
              <td>{b.customerPhone}</td>

              {/* FIXED: serviceId is an object after populate */}
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
              <input
                type="text"
                value={editing.customerName}
                onChange={(e) =>
                  setEditing({ ...editing, customerName: e.target.value })
                }
              />

              <input
                type="email"
                value={editing.customerEmail}
                onChange={(e) =>
                  setEditing({ ...editing, customerEmail: e.target.value })
                }
              />

              <input
                type="text"
                value={editing.customerPhone}
                onChange={(e) =>
                  setEditing({ ...editing, customerPhone: e.target.value })
                }
              />

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
