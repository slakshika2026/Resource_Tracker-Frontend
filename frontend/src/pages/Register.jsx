import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Link, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Register = () => {
   const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
      role: "",
   });
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleRegister = async () => {
      try {
         const response = await api.post("api/auth/register", form);

         if (response.status === 201) {
            navigate("/"); // Redirect to login page on successful registration
         }
      } catch (error) {
         if (error.response) {
            // Server responded with an error
            if (error.response.status === 400) {
               setError("All fields are required (name, email, password, role). Please fill in all details.");
            } else if (error.response.status === 409) {
               setError("This email is already registered. Try logging in instead.");
            } else if (error.response.status === 500) {
               setError("Server error occurred while registering. Please try again later.");
            } else {
               setError(error.response.data.message || "Registration failed.");
            }
         } else {
            // No response from server
            setError("Network error. Please check your internet connection.");
         }
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

         {/* Show error message using MUI Alert */}
         {error && <Alert severity="error">{error}</Alert>}

         <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleRegister}>
            Register
         </Button>

         {/* Already registered? Login link */}
         <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2">
               Already registered?{" "}
               <Link href="/" color="primary" underline="hover">
                  Login
               </Link>
            </Typography>
         </Box>
      </Container>
   );
};

export default Register;
