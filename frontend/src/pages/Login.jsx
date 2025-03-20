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
         // Expect the response to contain 'message' and 'token'
         if (response.data.token) {
            localStorage.setItem("token", response.data.token); // Store the token for authenticated routes
            navigate("/dashboard");
         } else {
            setError(response.data.message || "Invalid credentials. Please try again.");
         }
      } catch (error) {
         setError("An error occurred. Please try again.");
      }
   };

   return (
      <Container maxWidth="xs">
         <Box sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h5">Login</Typography>
         </Box>
         <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         />
         <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />

         {/* Show error message using MUI Alert */}
         {error && <Alert severity="error">{error}</Alert>}

         <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleLogin}>
            Login
         </Button>

         {/* Not registered? Sign up link */}
         <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2">
               Not registered?{" "}
               <Link href="/register" color="primary" underline="hover">
                  Sign up
               </Link>
            </Typography>
         </Box>
      </Container>
   );
};

export default Login;
