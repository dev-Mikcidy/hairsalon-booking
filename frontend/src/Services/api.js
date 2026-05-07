import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Attach token + API key automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // const apiKey = "your_api_key_here"; 

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  //if (apiKey) {
  //  config.headers["x-api-key"] = apiKey;
  //}

  return config;
});

export default api;
