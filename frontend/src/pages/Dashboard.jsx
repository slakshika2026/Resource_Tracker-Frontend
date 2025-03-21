// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Container, Typography, Drawer, List, ListItem, ListItemText, Divider, IconButton } from "@mui/material";
import ProjectList from "../components/ProjectList";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom"; // For navigation
import MenuIcon from "@mui/icons-material/Menu"; // To toggle sidebar

const Dashboard = () => {
   const [projects, setProjects] = useState([]);
   const [openSidebar, setOpenSidebar] = useState(false); // Sidebar state
   const navigate = useNavigate();

   useEffect(() => {
      const fetchProjects = async () => {
         try {
            const response = await api.get("api/projects/");
            setProjects(response.data);
         } catch (error) {
            console.error("Error fetching projects:", error);
         }
      };
      fetchProjects();
   }, []);

   const handleSidebarToggle = () => {
      setOpenSidebar(!openSidebar);
   };

   const handleNavigate = (path) => {
      navigate(path); // Navigate to other pages
      setOpenSidebar(false); // Close sidebar after navigation
   };

   return (
      <Container>
         <Navbar />
         <IconButton
            onClick={handleSidebarToggle}
            sx={{ position: "absolute", top: 16, left: 16, zIndex: 1200 }}
         >
            <MenuIcon />
         </IconButton>

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

         <Typography variant="body1" sx={{ textAlign: "center", mt: 2, color: "#555" }}>
            Select the project you want to allocate resources
         </Typography>

         <ProjectList projects={projects} />
      </Container>
   );
};

export default Dashboard;
