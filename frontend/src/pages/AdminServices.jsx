import { useEffect, useState } from "react";
import api from "../Services/api.js";

console.log("AdminServices component loaded");

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  // EDIT MODAL STATE
  const [editService, setEditService] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDuration, setEditDuration] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const fetchServices = async () => {
    const res = await api.get("/services");
    setServices(res.data);
  };

  const createService = async () => {
    await api.post("/services", { name, duration, price });
    fetchServices();
    setName("");
    setDuration("");
    setPrice("");
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // OPEN EDIT MODAL
  const handleEdit = (service) => {
    setEditService(service);
    setEditName(service.name);
    setEditDuration(service.duration);
    setEditPrice(service.price);
  };

  // SAVE EDITED SERVICE
  const handleUpdate = async () => {
    try {
      await api.put(`/services/${editService._id}`, {
        name: editName,
        duration: editDuration,
        price: editPrice,
      });

      setEditService(null); // close modal
      fetchServices(); // refresh list
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin — Manage Services</h2>

      {/* Add Service Form */}
      <div className="card p-4 mb-4 shadow-sm">
        <h4>Add New Service</h4>
        <div className="row mt-3">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Service Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Duration (minutes)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Price (DKK)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <button className="btn btn-primary mt-3" onClick={createService}>
          Add Service
        </button>
      </div>

      {/* Services Table */}
      <div className="card p-4 shadow-sm">
        <h4>Existing Services</h4>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td>{service.name}</td>
                <td>{service.duration}</td>
                <td>{service.price}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(service)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(service._id)}
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
      {editService && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Edit Service</h5>
                <button
                  className="btn-close"
                  onClick={() => setEditService(null)}
                ></button>
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Service Name"
                />

                <input
                  className="form-control mb-2"
                  value={editDuration}
                  onChange={(e) => setEditDuration(e.target.value)}
                  placeholder="Duration"
                />

                <input
                  className="form-control mb-2"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  placeholder="Price"
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditService(null)}
                >
                  Cancel
                </button>

                <button className="btn btn-primary" onClick={handleUpdate}>
                  Save Changes
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
