import { useState } from "react";
import api from "../Services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      navigate("/admin/services");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Login</h2>

      <input
        className="form-control mt-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-control mt-3"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary mt-3" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
