// src/pages/Register.jsx

import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
   const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
   });
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleRegister = async () => {
      try {
         const response = await api.post("/register", form); // Backend register endpoint
         if (response.data.success) {
            navigate("/");
         } else {
            setError(response.data.message || "Registration failed.");
         }
      } catch (error) {
         setError("An error occurred. Please try again.");
      }
   };

   return (
      <Container maxWidth="xs">
         <Box sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h5">Register</Typography>
         </Box>
         <TextField fullWidth label="Name" margin="normal" name="name" onChange={handleChange} />
         <TextField fullWidth label="Email" margin="normal" name="email" onChange={handleChange} />
         <TextField fullWidth label="Password" type="password" margin="normal" name="password" onChange={handleChange} />
         {error && <Typography color="error">{error}</Typography>}
         <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleRegister}>
            Register
         </Button>
      </Container>
   );
};

export default Register;
