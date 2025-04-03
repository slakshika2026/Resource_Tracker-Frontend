// import React, { useState } from "react";
// import { Container, TextField, Button, Typography, Box, Link, Alert, Grid2, Paper } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import api from "../api/api";
// import logo from "../assets/logo.png";

// const Register = () => {
//    const [form, setForm] = useState({
//       name: "",
//       email: "",
//       password: "",
//       role: "",
//    });
//    const [error, setError] = useState(null);
//    const navigate = useNavigate();

//    const handleChange = (e) => {
//       setForm({ ...form, [e.target.name]: e.target.value });
//    };

//    const handleRegister = async () => {
//       try {
//          const response = await api.post("api/auth/register", form);
//          if (response.status === 201) {
//             navigate("/"); // Redirect to login page on success
//          }
//       } catch (error) {
//          if (error.response) {
//             if (error.response.status === 400) {
//                setError("All fields are required. Please fill in all details.");
//             } else if (error.response.status === 409) {
//                setError("This email is already registered. Try logging in instead.");
//             } else {
//                setError(error.response.data.message || "Registration failed.");
//             }
//          } else {
//             setError("Network error. Please check your internet connection.");
//          }
//       }
//    };

//    return (
//       <Container maxWidth="lg" sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//          <Paper elevation={3} sx={{ width: "100%", height: "80vh", borderRadius: 3, overflow: "hidden" }}>
//             <Grid2 container sx={{ height: "100%" }}>
//                {/* Left Side: Logo & Welcome Message */}
//                <Grid2
//                   item
//                   xs={6}
//                   sx={{
//                      display: "flex",
//                      flexDirection: "column",
//                      alignItems: "center",
//                      justifyContent: "center",
//                      padding: 3,
//                      textAlign: "center",
//                   }}
//                >
//                   <img src={logo} alt="Logo" style={{ width: "70%", maxWidth: "300px" }} />
//                   <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold", color: "#205781" }}>
//                      Welcome!
//                   </Typography>
//                   <Typography variant="body1" sx={{ mt: 1, color: "#555" }}>
//                      Sign up to create your account and get started.
//                   </Typography>
//                </Grid2>

//                {/* Right Side: Registration Form */}
//                <Grid2 item xs={6} sx={{ padding: 4, display: "flex", flexDirection: "column", justifyContent: "center" }}>
//                   <Box sx={{ textAlign: "center", mb: 2 }}>
//                      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#205781" }}>
//                         Register
//                      </Typography>
//                   </Box>

//                   <TextField fullWidth label="Name" margin="normal" name="name" value={form.name} onChange={handleChange} />
//                   <TextField fullWidth label="Email" margin="normal" name="email" value={form.email} onChange={handleChange} />
//                   <TextField fullWidth label="Password" type="password" margin="normal" name="password" value={form.password} onChange={handleChange} />
//                   <TextField fullWidth label="Role" margin="normal" name="role" value={form.role} onChange={handleChange} />

//                   {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

//                   <Button
//                      fullWidth
//                      variant="contained"
//                      sx={{
//                         mt: 2,
//                         backgroundColor: "#205781",
//                         color: "#FFFFFF",
//                         "&:hover": { backgroundColor: "#4F959D" },
//                      }}
//                      onClick={handleRegister}
//                   >
//                      Register
//                   </Button>

//                   <Box sx={{ textAlign: "center", mt: 2 }}>
//                      <Typography variant="body2" sx={{ color: "#4F959D" }}>
//                         Already registered?{" "}
//                         <Link href="/" sx={{ color: "#205781", textDecoration: "underline" }}>
//                            Login
//                         </Link>
//                      </Typography>
//                   </Box>
//                </Grid2>
//             </Grid2>
//          </Paper>
//       </Container>
//    );
// };

// export default Register;


import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Link, Alert, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import logo from "../assets/logo.png";

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
            navigate("/"); // Redirect to login page on success
         }
      } catch (error) {
         if (error.response) {
            if (error.response.status === 400) {
               setError("All fields are required. Please fill in all details.");
            } else if (error.response.status === 409) {
               setError("This email is already registered. Try logging in instead.");
            } else {
               setError(error.response.data.message || "Registration failed.");
            }
         } else {
            setError("Network error. Please check your internet connection.");
         }
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
                  <img src={logo} alt="Logo" style={{ width: "70%", maxWidth: "300px" }} />
                  <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold", color: "#205781" }}>
                     Welcome!
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1, color: "#555" }}>
                     Sign up to create your account and get started.
                  </Typography>
               </Box>

               {/* Right Side: Registration Form */}
               <Box sx={{ flex: 1, padding: 4, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <Box sx={{ textAlign: "center", mb: 2 }}>
                     <Typography variant="h5" sx={{ fontWeight: "bold", color: "#205781" }}>
                        Register
                     </Typography>
                  </Box>

                  <TextField fullWidth label="Name" margin="normal" name="name" value={form.name} onChange={handleChange} />
                  <TextField fullWidth label="Email" margin="normal" name="email" value={form.email} onChange={handleChange} />
                  <TextField fullWidth label="Password" type="password" margin="normal" name="password" value={form.password} onChange={handleChange} />
                  <TextField fullWidth label="Role" margin="normal" name="role" value={form.role} onChange={handleChange} />

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
                     onClick={handleRegister}
                  >
                     Register
                  </Button>

                  <Box sx={{ textAlign: "center", mt: 2 }}>
                     <Typography variant="body2" sx={{ color: "#4F959D" }}>
                        Already registered?{" "}
                        <Link href="/" sx={{ color: "#205781", textDecoration: "underline" }}>
                           Login
                        </Link>
                     </Typography>
                  </Box>
               </Box>
            </Box>
         </Paper>
      </Container>
   );
};

export default Register;
