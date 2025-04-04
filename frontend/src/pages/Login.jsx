import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Link, Alert, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import logo from "../assets/logo.png";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   const handleLogin = async () => {
      try {
         const response = await api.post("api/auth/login", { email, password });
         if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
         } else {
            setError(response.data.message || "Invalid credentials. Please try again.");
         }
      } catch (error) {
         setError("An error occurred. Please try again.");
      }
   };

   return (
      <Container maxWidth="lg" sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
         <Paper elevation={3} sx={{ width: "100%", maxWidth: 900, height: "80vh", borderRadius: 3, overflow: "hidden" }}>
            <Box sx={{ display: "flex", height: "100%" }}>
               {/* Left Side: Logo & Welcome Message */}
               <Box
                  sx={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     justifyContent: "center",
                     flex: 1,
                     backgroundColor: "#F7F7F7",
                     padding: 3,
                     textAlign: "center",
                  }}
               >
                  <img src={logo} alt="Logo" style={{ width: "70%", maxWidth: "500px" }} />
                  <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold", color: "#205781" }}>
                     Welcome Back!
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1, color: "#555" }}>
                     Log in to continue.
                  </Typography>
               </Box>

               {/* Right Side: Login Form */}
               <Box sx={{ flex: 1, padding: 4, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <Box sx={{ textAlign: "center", mb: 2 }}>
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
                  />
                  <TextField
                     fullWidth
                     label="Password"
                     type="password"
                     margin="normal"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />

                  {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

                  <Button
                     fullWidth
                     variant="contained"
                     sx={{
                        mt: 2,
                        backgroundColor: "#205781",
                        color: "#FFFFFF",
                        "&:hover": { backgroundColor: "#4F959D" },
                     }}
                     onClick={handleLogin}
                  >
                     Login
                  </Button>

                  <Box sx={{ textAlign: "center", mt: 2 }}>
                     <Typography variant="body2" sx={{ color: "#4F959D" }}>
                        Not registered?{" "}
                        <Link href="/register" sx={{ color: "#205781", textDecoration: "underline" }}>
                           Sign up
                        </Link>
                     </Typography>
                  </Box>
               </Box>
            </Box>
         </Paper>
      </Container>
   );
};

export default Login;
