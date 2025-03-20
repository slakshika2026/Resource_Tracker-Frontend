import React, { useState, useEffect } from "react";
import {
   Button,
   Typography,
   CircularProgress,
   Grid,
   Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import CategoryList from "./CategoryList";
import AllocatedResourceList from "./AllocatedResourceList";

const ProjectList = () => {
   const [projects, setProjects] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [selectedProject, setSelectedProject] = useState(null);
   const [showAllocatedResources, setShowAllocatedResources] = useState(false); // State to toggle AllocatedResourceList
   const navigate = useNavigate();

   // Fetch projects from the backend
   useEffect(() => {
      const fetchProjects = async () => {
         try {
            const response = await api.get("api/projects");
            console.log("Projects fetched:", response.data);
            setProjects(response.data);
         } catch (err) {
            setError('Failed to load projects: ${err.message }');
            console.error("Error fetching projects:", err);
         } finally {
            setLoading(false);
         }
      };

      fetchProjects();
   }, []);

   const handleSelectProject = (projectId) => {
      console.log("Selected project ID:", projectId);
      setSelectedProject(projectId);
      setShowAllocatedResources(false); // Reset allocated resource list view
   };

   const handleShowAllocatedResources = () => {
      console.log("Showing allocated resources for project:", selectedProject);
      setShowAllocatedResources(true);
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
                  <Stack
                     key={project.project_id}
                     spacing={1}
                     sx={{ width: "100%", maxWidth: 400 }}
                  >
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
         ) : showAllocatedResources ? (
            // Render AllocatedResourceList when "Allocated Resources" is clicked
            <AllocatedResourceList projectId={selectedProject} />
         ) : (
            <>
               <CategoryList projectId={selectedProject} />
               <Button
                  variant="outlined"
                  onClick={handleShowAllocatedResources}
                  sx={{ mt: 2 }}
               >
                  Allocated Resources
               </Button>
            </>
         )}
      </div>
   );
};

export default ProjectList;