// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({ username }) => {
   return (
      <AppBar
         position="static"
         sx={{
            background: "linear-gradient(90deg, #205781, #4F959D)", // Dark Blue to Muted Teal gradient
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow for a soft effect
         }}
      >
         <Toolbar>
            <Typography
               variant="h6"
               sx={{
                  flexGrow: 1,
                  fontWeight: "bold",
                  letterSpacing: 1.5,
                  color: "#FFFFFF", // White text color
               }}
            >
               Resource Allocation and Tracking
               System
            </Typography>

            {/* Display greeting if username exists */}
            {/* {username && (
               <Typography
                  variant="body1"
                  sx={{ color: "#FFFFFF", fontWeight: "bold", mr: 2 }}
               >
                  Hello, {username} 👋
               </Typography>
            )} */}

            <Box sx={{ display: "flex", gap: 2 }}>
               <Button
                  color="inherit"
                  component={Link}
                  to="/dashboard"
                  sx={{
                     fontWeight: "bold",
                     color: "#FFFFFF",
                     borderBottom: "2px solid transparent",
                     "&:hover": {

                        backgroundColor: "#205781",
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
                     color: "#FFFFFF",
                     borderBottom: "2px solid transparent",
                     "&:hover": {
                        backgroundColor: "#205781",
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
                     color: "#FFFFFF",
                     borderBottom: "2px solid transparent",
                     "&:hover": {
                        backgroundColor: "#205781",
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
