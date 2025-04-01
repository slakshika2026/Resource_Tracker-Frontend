import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemText, Divider, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu"; // To toggle sidebar

const Navbar = () => {
   const [username, setUsername] = useState(null);
   const [openSidebar, setOpenSidebar] = useState(false); // Sidebar state
   const navigate = useNavigate();

   useEffect(() => {
      // Retrieve user from localStorage (or replace with your auth state logic)
      const storedUser = localStorage.getItem("token");
      if (storedUser) {
         setUsername(storedUser);
      }
   }, []);

   const handleSidebarToggle = () => {
      setOpenSidebar(!openSidebar);
   };

   const handleNavigate = (path) => {
      navigate(path); // Navigate to other pages
      setOpenSidebar(false); // Close sidebar after navigation
   };

   return (
      <AppBar
         position="static"
         sx={{
            background: "linear-gradient(90deg, #205781, #4F959D)", // Dark Blue to Muted Teal gradient
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow for a soft effect
         }}
      >
         <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "0 16px" }}>
            {/* Drawer icon on the left side */}
            <IconButton
               onClick={handleSidebarToggle}
               sx={{ color: "#FFFFFF" }}
            >
               <MenuIcon />
            </IconButton>

            <Typography
               variant="h6"
               sx={{
                  flexGrow: 1,
                  fontWeight: "bold",
                  letterSpacing: 1.5,
                  color: "#FFFFFF", // White text color
                  textAlign: "center", // Center the title
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
