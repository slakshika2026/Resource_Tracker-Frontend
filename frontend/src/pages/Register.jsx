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
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#205781" }}>
               Register
            </Typography>
         </Box>
         <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="name"
            value={form.name}
            onChange={handleChange}
            sx={{
               backgroundColor: "#FFFFFF", // White background for inputs
               borderRadius: 1,
               '& .MuiInputBase-root': {
                  color: "#205781", // Dark Blue text color
               },
               '& .MuiInputLabel-root': {
                  color: "#205781", // Dark Blue label color
               },
            }}
         />
         <TextField
            fullWidth
            label="Email"
            margin="normal"
            name="email"
            value={form.email}
            onChange={handleChange}
            sx={{
               backgroundColor: "#FFFFFF", // White background for inputs
               borderRadius: 1,
               '& .MuiInputBase-root': {
                  color: "#205781", // Dark Blue text color
               },
               '& .MuiInputLabel-root': {
                  color: "#205781", // Dark Blue label color
               },
            }}
         />
         <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            name="password"
            value={form.password}
            onChange={handleChange}
            sx={{
               backgroundColor: "#FFFFFF", // White background for inputs
               borderRadius: 1,
               '& .MuiInputBase-root': {
                  color: "#205781", // Dark Blue text color
               },
               '& .MuiInputLabel-root': {
                  color: "#205781", // Dark Blue label color
               },
            }}
         />
         <TextField
            fullWidth
            label="Role"
            margin="normal"
            name="role"
            value={form.role}
            onChange={handleChange}
            sx={{
               backgroundColor: "#FFFFFF", // White background for inputs
               borderRadius: 1,
               '& .MuiInputBase-root': {
                  color: "#205781", // Dark Blue text color
               },
               '& .MuiInputLabel-root': {
                  color: "#205781", // Dark Blue label color
               },
            }}
         />

         {/* Show error message using MUI Alert */}
         {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

         <Button
            fullWidth
            variant="contained"
            sx={{
               mt: 2,
               backgroundColor: "#205781", // Dark Blue button background
               color: "#FFFFFF", // White text color
               '&:hover': {
                  backgroundColor: "#4F959D", // Muted Teal background on hover
               },
            }}
            onClick={handleRegister}
         >
            Register
         </Button>

         {/* Already registered? Login link */}
         <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2" sx={{ color: "#4F959D" }}>
               Already registered?{" "}
               <Link href="/" sx={{ color: "#205781", textDecoration: "underline" }}>
                  Login
               </Link>
            </Typography>
         </Box>
      </Container>
   );
};

export default Register;
