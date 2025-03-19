import axios from "axios";

const api = axios.create({
   baseURL: "http://localhost:5000", // Adjust to your backend URL
});

// Attach token to each request if available
api.interceptors.request.use((config) => {
   const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

export default api;
