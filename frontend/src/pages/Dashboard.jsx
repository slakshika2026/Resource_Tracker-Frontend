// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import ProjectList from "../components/ProjectList";
import api from "../api/api";

const Dashboard = () => {
   const [projects, setProjects] = useState([]);

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

   return (
      <Container>
         <Typography variant="h4" sx={{ textAlign: "center", mt: 4 }}>
            Projects
         </Typography>
         <ProjectList projects={projects} />
      </Container>
   );
};

export default Dashboard;
