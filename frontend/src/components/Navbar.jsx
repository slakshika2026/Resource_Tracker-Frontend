// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({ username }) => {
   return (
      <AppBar
         position="static"
         sx={{
            background: "linear-gradient(90deg, #1e1e2f, #23253a)", // Dark theme gradient
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
         }}
      >
         <Toolbar>
            <Typography
               variant="h6"
               sx={{
                  flexGrow: 1,
                  fontWeight: "bold",
                  letterSpacing: 1.5,
                  color: "#f0f0f0", // Light text color
               }}
            >
               Resource Tracker
            </Typography>

            {/* Display greeting if username exists */}
            {username && (
               <Typography
                  variant="body1"
                  sx={{ color: "#f0f0f0", fontWeight: "bold", mr: 2 }}
               >
                  Hello, {username} 👋
               </Typography>
            )}

            <Box sx={{ display: "flex", gap: 2 }}>
               <Button
                  color="inherit"
                  component={Link}
                  to="/dashboard"
                  sx={{
                     fontWeight: "bold",
                     color: "#f0f0f0",
                     borderBottom: "2px solid transparent",
                     "&:hover": {
                        borderBottom: "2px solid #f0f0f0",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                     },
                  }}
               >
                  Dashboard
               </Button>
               <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{
                     fontWeight: "bold",
                     color: "#f0f0f0",
                     borderBottom: "2px solid transparent",
                     "&:hover": {
                        borderBottom: "2px solid #f0f0f0",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                     },
                  }}
               >
                  Login
               </Button>
               <Button
                  color="inherit"
                  component={Link}
                  to="/register"
                  sx={{
                     fontWeight: "bold",
                     color: "#f0f0f0",
                     borderBottom: "2px solid transparent",
                     "&:hover": {
                        borderBottom: "2px solid #f0f0f0",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                     },
                  }}
               >
                  Register
               </Button>
            </Box>
         </Toolbar>
      </AppBar>
   );
};

export default Navbar;
