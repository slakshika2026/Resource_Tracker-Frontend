import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
   const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
      role: "", // Added role for registration
   });
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleRegister = async () => {
      try {
         const response = await api.post("api/auth/register", form); // Backend register endpoint
         if (response.status === 201) {
            navigate("/"); // Redirect to login page on successful registration
         } else {
            setError(response.data.message || "Registration failed.");
         }
      } catch (error) {
         console.log(error);
         setError("An error occurred. Please try again.");
      }
   };

   return (
      <Container maxWidth="xs">
         <Box sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h5">Register</Typography>
         </Box>
         <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="name"
            value={form.name}
            onChange={handleChange}
         />
         <TextField
            fullWidth
            label="Email"
            margin="normal"
            name="email"
            value={form.email}
            onChange={handleChange}
         />
         <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            name="password"
            value={form.password}
            onChange={handleChange}
         />
         <TextField
            fullWidth
            label="Role"
            margin="normal"
            name="role"
            value={form.role}
            onChange={handleChange}
         />
         {error && <Typography color="error">{error}</Typography>}
         <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleRegister}>
            Register
         </Button>
      </Container>
   );
};

export default Register;
