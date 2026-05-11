import { useEffect, useState } from "react";
import api from "../services/api.js";
import { Link } from "react-router-dom";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      // Correct endpoint for public services
      const res = await api.get("/public/services");
      setServices(res.data);
    } catch (err) {
      console.error("Error loading services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Our Services</h1>

      {loading && (
        <p className="text-center text-primary fw-bold">Loading services...</p>
      )}

      {!loading && services.length === 0 && (
        <p className="text-center text-danger fw-bold">
          No services available at the moment.
        </p>
      )}

      <div className="row">
        {services.map((service) => (
          <div key={service._id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h4 className="card-title">{service.name}</h4>

                <p className="card-text text-muted">
                  {service.description || "No description provided."}
                </p>

                <p className="card-text">
                  <strong>Duration:</strong> {service.duration} minutes
                </p>

                <p className="card-text">
                  <strong>Price:</strong> {service.price} DKK
                </p>

                {/* Use Link instead of <a href> */}
                <Link to="/book" className="btn btn-primary w-100 mt-3">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
