import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function AdminServices() {
  const [services, setServices] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const [editingService, setEditingService] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDuration, setEditDuration] = useState("");

  const fetchServices = async () => {
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } catch (err) {
      alert(err.response?.data?.msg || "Error loading services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const createService = async () => {
    if (!name.trim()) return alert("Service name is required");
    if (price <= 0) return alert("Price must be greater than 0");
    if (duration < 5) return alert("Duration must be at least 5 minutes");

    try {
      await api.post("/services", {
        name,
        description,
        price,
        duration
      });

      setName("");
      setDescription("");
      setPrice("");
      setDuration("");

      fetchServices();
    } catch (err) {
      alert(err.response?.data?.msg || "Error creating service");
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      alert(err.response?.data?.msg || "Error deleting service");
    }
  };

  const updateService = async () => {
    if (!editName.trim()) return alert("Service name is required");
    if (editPrice <= 0) return alert("Price must be greater than 0");
    if (editDuration < 5) return alert("Duration must be at least 5 minutes");

    try {
      await api.put(`/services/${editingService._id}`, {
        name: editName,
        description: editDescription,
        price: editPrice,
        duration: editDuration
      });

      setEditingService(null);
      fetchServices();
    } catch (err) {
      alert(err.response?.data?.msg || "Error updating service");
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

      <h2 className="mb-4">Admin — Manage Services</h2>

      {/* ADD SERVICE FORM */}
      <div className="card p-4 mb-4 shadow-sm">
        <h4>Add New Service</h4>

        <div className="row mt-3">
          <div className="col-md-3 mb-3">
            <input
              className="form-control"
              placeholder="Service Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={2}
              required
            />
          </div>

          <div className="col-md-3 mb-3">
            <input
              className="form-control"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
            />
          </div>

          <div className="col-md-3 mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Price (DKK)"
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="col-md-3 mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Duration (minutes)"
              min="5"
              max="300"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
        </div>

        <button className="btn btn-primary mt-2" onClick={createService}>
          Add Service
        </button>
      </div>

      {/* SERVICES TABLE */}
      <div className="card p-4 shadow-sm">
        <h4>Existing Services</h4>

        <table className="table table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Price</th>
              <th style={{ width: "150px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {services.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.description || "-"}</td>
                <td>{s.duration} min</td>
                <td>{s.price} DKK</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setEditingService(s);
                      setEditName(s.name);
                      setEditDescription(s.description || "");
                      setEditPrice(s.price);
                      setEditDuration(s.duration);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteService(s._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editingService && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content p-4">

              <h4>Edit Service</h4>

              <input
                className="form-control mt-3"
                value={editName}
                minLength={2}
                onChange={(e) => setEditName(e.target.value)}
                required
              />

              <input
                className="form-control mt-3"
                value={editDescription}
                maxLength={200}
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <input
                type="number"
                className="form-control mt-3"
                value={editPrice}
                min="1"
                onChange={(e) => setEditPrice(e.target.value)}
                required
              />

              <input
                type="number"
                className="form-control mt-3"
                value={editDuration}
                min="5"
                max="300"
                onChange={(e) => setEditDuration(e.target.value)}
                required
              />

              <div className="mt-4 d-flex justify-content-end">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setEditingService(null)}
                >
                  Cancel
                </button>

                <button className="btn btn-primary" onClick={updateService}>
                  Save Changes
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
