import React, { useState, useEffect } from "react";
import { Button, Typography, CircularProgress, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import CategoryList from "./CategoryList";

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
            const response = await api.get("api/projects");
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
      console.log("Selected project ID:", projectId); // Debugging log
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
            <Stack spacing={3} alignItems="center">
               {projects.map((project) => (
                  <Stack key={project.project_id} spacing={1} sx={{ width: "100%", maxWidth: 400 }}>
                     <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => handleSelectProject(project.project_id)}
                     >
                        {project.name}
                     </Button>
                     <Typography variant="body2">{project.description}</Typography>
                     <Typography variant="caption">{project.start_date}</Typography>
                  </Stack>
               ))}
            </Stack>
         ) : (
            <CategoryList
               projectId={selectedProject}
               setSelectedProject={setSelectedProject}
            /> // Render category list for selected project
         )}
      </div>
   );
};

export default ProjectList;
