// src/pages/Login.jsx

import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   const handleLogin = async () => {
      try {
         const response = await api.post("/login", { email, password }); // Backend login endpoint
         if (response.data.success) {
            navigate("/dashboard");
         } else {
            setError("Invalid credentials. Please try again.");
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
         {error && <Typography color="error">{error}</Typography>}
         <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleLogin}>
            Login
         </Button>
      </Container>
   );
};

export default Login;
