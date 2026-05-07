import { useEffect, useState } from "react";
import api from "../Services/api.js";


console.log("AdminServices component loaded");

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

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

  useEffect(() => {
    //fetchServices();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin — Manage Services</h2>

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

      <div className="card p-4 shadow-sm">
        <h4>Existing Services</h4>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Duration</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.duration} min</td>
                <td>{s.price} DKK</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
