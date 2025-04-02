import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Link, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   const handleLogin = async () => {
      try {
         const response = await api.post("api/auth/login", { email, password }); // Backend login endpoint
         if (response.data.token) {
            localStorage.setItem("token", response.data.token); // Store the token for authenticated routes
            // Retrieve name from localStorage (set during registration)
         const storedName = localStorage.getItem("username");
         if (storedName) {
            localStorage.setItem("username", storedName); // Ensure the name persists
         }

            navigate("/dashboard");
         } else {
            setError(response.data.message || "Invalid credentials. Please try again.");
         }
      } catch (error) {
         setError("An error occurred. Please try again.");
      }
   };

   return (
      <Container maxWidth="xs" sx={{ borderRadius: 2, p: 3 }}>
         <Box sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#205781" }}>
               Login
            </Typography>
         </Box>
         <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            onClick={handleLogin}
         >
            Login
         </Button>

         {/* Not registered? Sign up link */}
         <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2" sx={{ color: "#4F959D" }}>
               Not registered?{" "}
               <Link href="/register" sx={{ color: "#205781", textDecoration: "underline" }}>
                  Sign up
               </Link>
            </Typography>
         </Box>
      </Container>
   );
};

export default Login;
