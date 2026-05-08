import { useEffect, useState } from "react";
import api from "../Services/api";

export default function AdminBookings() {
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

  const loadData = async () => {
    const b = await api.get("/bookings");
    const s = await api.get("/services");
    setBookings(b.data);
    setServices(s.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const createBooking = async () => {
    await api.post("/bookings", form);
    loadData();
  };

  const deleteBooking = async (id) => {
    await api.delete(`/bookings/${id}`);
    loadData();
  };

  return (
    <div className="container mt-4">
      <h2>Manage Bookings</h2>

      <div className="card p-3 mt-3">
        <h4>Create Booking</h4>

        <input className="form-control mt-2" placeholder="Customer Name"
          onChange={(e) => setForm({ ...form, customerName: e.target.value })} />

        <input className="form-control mt-2" placeholder="Customer Email"
          onChange={(e) => setForm({ ...form, customerEmail: e.target.value })} />

        <input className="form-control mt-2" placeholder="Customer Phone"
          onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} />

        <select className="form-control mt-2"
          onChange={(e) => setForm({ ...form, serviceId: e.target.value })}>
          <option>Select Service</option>
          {services.map((s) => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>

        <input className="form-control mt-2" type="date"
          onChange={(e) => setForm({ ...form, date: e.target.value })} />

        <input className="form-control mt-2" type="time"
          onChange={(e) => setForm({ ...form, time: e.target.value })} />

        <button className="btn btn-primary mt-3" onClick={createBooking}>
          Create Booking
        </button>
      </div>

      <h4 className="mt-4">All Bookings</h4>

      <table className="table mt-2">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.customerName}</td>
              <td>{b.serviceId?.name}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>
              <td>{b.customerEmail}</td>
              <td>{b.customerPhone}</td>
              <td>
                <button className="btn btn-danger btn-sm"
                  onClick={() => deleteBooking(b._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
