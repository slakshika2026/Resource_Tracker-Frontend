// src/api/api.js

import axios from "axios";

const API_URL = "http://localhost:5000"; // Change to your backend URL

// Create Axios instance
const api = axios.create({
   baseURL: API_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

export default api;
