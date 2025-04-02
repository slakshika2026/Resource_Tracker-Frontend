import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemText, Divider, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu"; // Sidebar toggle icon
import { jwtDecode } from "jwt-decode";
import DropdownMenu from "./DropdownMenu";


const Navbar = () => {
   const [username, setUsername] = useState(null); // State to hold the username
   const [openSidebar, setOpenSidebar] = useState(false); // Sidebar state
   const navigate = useNavigate();

   useEffect(() => {
      const storedToken = localStorage.getItem("token"); // Get the token from localStorage
      if (storedToken) {
         try {
            const decodedToken = jwtDecode(storedToken); // Decode the JWT token
            setUsername(decodedToken.name); // Set the username from the decoded token
         } catch (error) {
            console.error("Error decoding token:", error); // Error handling if token is invalid
         }
      }
   }, []);

   const handleSidebarToggle = () => {
      setOpenSidebar(!openSidebar); // Toggle sidebar visibility
   };

   const handleNavigate = (path) => {
      navigate(path); // Navigate to the specified path
      setOpenSidebar(false); // Close sidebar after navigation
   };

   const handleLogout = () => {
      localStorage.removeItem("token"); // Clear the token from localStorage
      setUsername(null); // Clear the username state
      navigate("/login"); // Redirect to login page
   };

   return (
      <AppBar
         position="static"
         sx={{
            background: "linear-gradient(90deg, #205781, #4F959D)", // Gradient background
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow
         }}
      >
         <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "0 16px" }}>
            {/* Sidebar Toggle Button */}
            <IconButton onClick={handleSidebarToggle} sx={{ color: "#FFFFFF" }}>
               <MenuIcon />
            </IconButton>



            <Typography
               variant="h6"
               sx={{
                  flexGrow: 1,
                  fontWeight: "bold",
                  letterSpacing: 1.5,
                  color: "#FFFFFF", // White text color
                  textAlign: "center", // Center title
               }}
            >
               Resource Allocation and Tracking System
            </Typography>

            {/* User authentication buttons */}
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

               {/* User Authentication and Dropdown */}
               <Box sx={{ display: "flex", gap: 2 }}>
                  <DropdownMenu username={username} handleLogout={handleLogout} />
               </Box>

               {!username && (
                  <>
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
                  </>
               )}
            </Box>
         </Toolbar>

         {/* Sidebar Drawer */}
         <Drawer
            anchor="left"
            open={openSidebar}
            onClose={handleSidebarToggle}
            sx={{
               width: 250,
               flexShrink: 0,
               "& .MuiDrawer-paper": {
                  width: 250,
                  boxSizing: "border-box",
               },
            }}
         >
            <List>
               <ListItem button onClick={() => handleNavigate("/dashboard")}>
                  <ListItemText primary="Dashboard" />
               </ListItem>
               <Divider />
               <ListItem button onClick={() => handleNavigate("/add-project")}>
                  <ListItemText primary="Add New Project" />
               </ListItem>
               <Divider />
               <ListItem button onClick={() => handleNavigate("/allocation-history")}>
                  <ListItemText primary="Allocation History" />
               </ListItem>
               <Divider />
               <ListItem button onClick={() => handleNavigate("/add-resource-item")}>
                  <ListItemText primary="Add Resource Item" />
               </ListItem>
               <ListItem button onClick={() => handleNavigate("/view-all-resources")}>
                  <ListItemText primary="View All Resources" />
               </ListItem>
            </List>
         </Drawer>
      </AppBar>
   );
};

export default Navbar;

