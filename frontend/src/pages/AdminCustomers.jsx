import React, { useEffect, useState } from "react";
import api from "../services/api.js";

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [editing, setEditing] = useState(null);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/customers", form);
      setForm({ name: "", email: "", phone: "" });
      loadCustomers();
    } catch (err) {
      alert(err.response?.data?.msg || "Error creating customer");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/customers/${editing._id}`, editing);
      setEditing(null);
      loadCustomers();
    } catch (err) {
      alert(err.response?.data?.msg || "Error updating customer");
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await api.delete(`/api/customers/${id}`);
      loadCustomers();
    } catch (err) {
      alert(err.response?.data?.msg || "Error deleting customer");
    }
  };

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

      <h1 className="mb-4">Admin — Manage Customers</h1>

      {/* ERROR */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* CREATE CUSTOMER CARD */}
      <div className="card p-4 mb-4" style={{ maxWidth: "450px" }}>
        <h4>Add New Customer</h4>

        <form onSubmit={handleCreate} className="mt-3">

          <input
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="Customer Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            className="form-control mb-3"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100">Add Customer</button>
        </form>
      </div>

      {/* CUSTOMERS TABLE */}
      {!loading && !error && (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th style={{ width: "150px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>

                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => setEditing(c)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteCustomer(c._id)}
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

              <h4>Edit Customer</h4>

              <form onSubmit={handleUpdate} className="mt-3">

                <input
                  type="text"
                  className="form-control mb-3"
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                />

                <input
                  type="email"
                  className="form-control mb-3"
                  value={editing.email}
                  onChange={(e) =>
                    setEditing({ ...editing, email: e.target.value })
                  }
                />

                <input
                  type="text"
                  className="form-control mb-3"
                  value={editing.phone}
                  onChange={(e) =>
                    setEditing({ ...editing, phone: e.target.value })
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

export default AdminCustomers;
