// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
   return (
      <AppBar position="static">
         <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
               Resource Tracker
            </Typography>
            <Button color="inherit" component={Link} to="/dashboard">
               Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/login">
               Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
               Register
            </Button>
         </Toolbar>
      </AppBar>
   );
};

export default Navbar;
