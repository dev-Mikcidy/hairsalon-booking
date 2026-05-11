import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function PublicBooking() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    serviceId: "",
    date: "",
    time: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/public/services");
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };
    fetchServices();
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.serviceId) newErrors.serviceId = "Please select a service";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.time) newErrors.time = "Time is required";

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });

    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      await api.post("/public/bookings", form);

      setSuccessMsg(
        "Your booking has been submitted! We will contact you to confirm."
      );

      setForm({
        name: "",
        phone: "",
        email: "",
        serviceId: "",
        date: "",
        time: "",
        notes: "",
      });
    } catch (err) {
      console.error("Error creating booking:", err);
      setErrorMsg(
        err.response?.data?.msg || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Book an Appointment</h2>

      {successMsg && (
        <div className="alert alert-success" role="alert">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name *</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label">Phone *</label>
          <input
            type="text"
            name="phone"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email (optional)</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Service */}
        <div className="mb-3">
          <label className="form-label">Service *</label>
          <select
            name="serviceId"
            className={`form-select ${errors.serviceId ? "is-invalid" : ""}`}
            value={form.serviceId}
            onChange={handleChange}
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} {s.price ? `- ${s.price} kr` : ""}
              </option>
            ))}
          </select>
          {errors.serviceId && (
            <div className="invalid-feedback">{errors.serviceId}</div>
          )}
        </div>

        {/* Date */}
        <div className="mb-3">
          <label className="form-label">Date *</label>
          <input
            type="date"
            name="date"
            className={`form-control ${errors.date ? "is-invalid" : ""}`}
            value={form.date}
            onChange={handleChange}
          />
          {errors.date && (
            <div className="invalid-feedback">{errors.date}</div>
          )}
        </div>

        {/* Time */}
        <div className="mb-3">
          <label className="form-label">Time *</label>
          <input
            type="time"
            name="time"
            className={`form-control ${errors.time ? "is-invalid" : ""}`}
            value={form.time}
            onChange={handleChange}
          />
          {errors.time && (
            <div className="invalid-feedback">{errors.time}</div>
          )}
        </div>

        {/* Notes */}
        <div className="mb-3">
          <label className="form-label">Notes (optional)</label>
          <textarea
            name="notes"
            className="form-control"
            rows="3"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}
