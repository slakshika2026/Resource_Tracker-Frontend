import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import ProjectList from "../components/ProjectList";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom"; // For navigation

const Dashboard = () => {

   const [projects, setProjects] = useState([]);
   const [loading, setLoading] = useState(true); // Loading state
   const navigate = useNavigate();

   useEffect(() => {
      const fetchProjects = async () => {
         try {
            const response = await api.get("api/projects/");
            setProjects(response.data);
         } catch (error) {
            console.error("Error fetching projects:", error);
         } finally {
            setLoading(false);
         }
      };
      fetchProjects();
   }, []);



   return (
      <Container>
         <Navbar />

         <Typography variant="body1" sx={{ textAlign: "center", mt: 2, color: "#555" }}>
            Select the project you want to allocate resources
         </Typography>

         <ProjectList projects={projects} loading={loading} />
      </Container>
   );
};

export default Dashboard;
