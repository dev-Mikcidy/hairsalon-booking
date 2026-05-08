import { useEffect, useState } from "react";
import api from "../Services/api";

export default function AdminServices() {
  const [services, setServices] = useState([]);

  // Add form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  // Edit modal states
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
      alert("Error loading services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // CREATE SERVICE
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

  // DELETE SERVICE
  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      alert("Error deleting service");
    }
  };

  // UPDATE SERVICE
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


    <div className="container mt-5">
      <h2 className="mb-4">Admin — Manage Services</h2>

      <div>
        <a href="/admin/bookings" className="btn btn-outline-primary me-2">
          Go to Bookings
        </a>

        <a href="/admin" className="btn btn-secondary">
          Back to Dashboard
        </a>
      </div>

      {/* Add Service Form */}
      <div className="card p-4 mb-4 shadow-sm">
        <h4>Add New Service</h4>

        <div className="row mt-3">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Service Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Price (DKK)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Duration (minutes)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
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
              <th>Description</th>
              <th>Duration</th>
              <th>Price</th>
              <th></th>
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
        <>
          {/* Background overlay */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              zIndex: 999
            }}
          />

          {/* Modal */}
          <div
            className="modal fade show"
            style={{
              display: "block",
              position: "fixed",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content p-4">

                <h4>Edit Service</h4>

                <input
                  className="form-control mt-2"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />

                <input
                  className="form-control mt-2"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />

                <input
                  type="number"
                  className="form-control mt-2"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                />

                <input
                  type="number"
                  className="form-control mt-2"
                  value={editDuration}
                  onChange={(e) => setEditDuration(e.target.value)}
                />

                <div className="mt-3 d-flex justify-content-end">
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
        </>
      )}
    </div>
  );
}
