import React, { useState, useEffect } from "react";
import {
   Button,
   Typography,
   CircularProgress,
   Stack,
   Grid,
   Paper,
   Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import CategoryList from "./CategoryList";
import AllocatedResourceList from "./AllocatedResourceList";

const ProjectList = ({ projects, loading }) => {
   // const [projects, setProjects] = useState([]);
   // const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [selectedProject, setSelectedProject] = useState(null);
   const [showAllocatedResources, setShowAllocatedResources] = useState(false);
   const navigate = useNavigate();

   // useEffect(() => {
   //    const fetchProjects = async () => {
   //       try {
   //          const response = await api.get("api/projects");
   //          setProjects(response.data);
   //       } catch (err) {
   //          setError(`Failed to load projects: ${err.message}`);
   //       } finally {
   //          setLoading(false);
   //       }
   //    };

   //    fetchProjects();
   // }, []);

   const handleSelectProject = (projectId, projectName) => {
      setSelectedProject({ id: projectId, name: projectName });
      setShowAllocatedResources(false);
   };

   const handleShowAllocatedResources = () => {
      setShowAllocatedResources(true);
   };

   if (loading) {
      return <CircularProgress sx={{ color: "#0077B5" }} />;
   }

   if (error) {
      return <Typography color="error">{error}</Typography>;
   }

   return (
      <Box sx={{ padding: 3, maxWidth: "1000px", margin: "auto" }}>
         {/* Selected project info */}
         {selectedProject && (
            <Typography
               variant="h6"
               sx={{
                  textAlign: "center",
                  mt: 2,
                  color: "#333333",

               }}
            >
               Selected Project Name: {selectedProject.name}
            </Typography>
         )}

         {/* Project list */}
         {!selectedProject ? (
            <Grid container spacing={2} justifyContent="center">
               {projects.map((project) => (
                  <Grid item xs={12} sm={6} md={4} key={project.project_id}>
                     <Paper
                        elevation={3}
                        sx={{
                           padding: 2,
                           backgroundColor: "#FFFFFF",
                           borderRadius: "8px", // Rounded corners
                           transition: "all 0.3s ease-in-out",
                           "&:hover": {
                              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                              transform: "translateY(-3px)", // Subtle lift effect
                           },
                        }}
                     >
                        <Button
                           variant="contained"
                           fullWidth
                           onClick={() =>
                              handleSelectProject(project.project_id, project.name)
                           }
                           sx={{
                              backgroundColor: "#005582",
                              "&:hover": { backgroundColor: "#4F959D" },
                              color: "#FFFFFF",
                              fontWeight: "bold",
                              borderRadius: "20px", // Rounded button like LinkedIn
                              textTransform: "none",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                           }}
                        >
                           {project.name}
                        </Button>

                        <Typography
                           variant="body2"
                           sx={{ color: "#333333", mt: 2, fontWeight: "500" }}
                        >
                           {project.description}
                        </Typography>

                        <Typography
                           variant="caption"
                           sx={{ color: "#86888A", mt: 1, display: "block" }}
                        >
                           Created at:{" "}
                           {project.start_date
                              ? new Date(project.start_date).toLocaleDateString("en-US", {
                                 weekday: "short",
                                 year: "numeric",
                                 month: "short",
                                 day: "numeric",
                              })
                              : "N/A"}
                        </Typography>
                     </Paper>
                  </Grid>
               ))}
            </Grid>
         ) : showAllocatedResources ? (
            <AllocatedResourceList projectId={selectedProject.id} />
         ) : (
            <>
               <CategoryList projectId={selectedProject.id} />
               <Stack spacing={2} sx={{ mt: 3 }} alignItems="center">
                  <Button
                     variant="outlined"
                     onClick={handleShowAllocatedResources}
                     sx={{
                        borderColor: "#0077B5",
                        color: "#0077B5",
                        fontWeight: "bold",
                        textTransform: "none",
                        borderRadius: "20px", // Rounded button
                        "&:hover": {
                           borderColor: "#005582",
                           color: "#005582",
                           boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                        },
                     }}
                  >
                     View Allocated Resources
                  </Button>
               </Stack>
            </>
         )}
      </Box>
   );
};

export default ProjectList;
