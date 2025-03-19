
import React, { useState, useEffect } from "react";
import { Button, Typography, CircularProgress, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import CategoryList from "./CategoryList"; // Import CategoryList component

const ProjectList = () => {
   const [projects, setProjects] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [selectedProject, setSelectedProject] = useState(null);
   const navigate = useNavigate();

   // Fetch projects from the backend
   useEffect(() => {
      const fetchProjects = async () => {
         try {
            const response = await api.get("api/projects"); // Ensure correct API path
            console.log("Projects fetched:", response.data);
            setProjects(response.data);
         } catch (err) {
            setError(`Failed to load projects: ${err.message}`);
            console.error("Error fetching projects:", err);
         } finally {
            setLoading(false);
         }
      };

      fetchProjects();
   }, []);

   const handleSelectProject = (projectId) => {
      setSelectedProject(projectId); // Store selected project
   };

   if (loading) {
      return <CircularProgress />;
   }

   if (error) {
      return <Typography color="error">{error}</Typography>;
   }

   return (
      <div>
         {!selectedProject ? (
            <Grid container spacing={3}>
               {projects.map((project) => (
                  <Grid item xs={12} sm={6} md={4} key={project.project_id}>
                     <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleSelectProject(project.project_id)}
                     >
                        {project.name}
                     </Button>
                     <Typography variant="body2">{project.description}</Typography>
                     <Typography variant="caption">{project.start_date}</Typography>
                  </Grid>
               ))}
            </Grid>
         ) : (
            <CategoryList projectId={selectedProject} /> // Render category list for selected project
         )}
      </div>
   );
};

export default ProjectList;
