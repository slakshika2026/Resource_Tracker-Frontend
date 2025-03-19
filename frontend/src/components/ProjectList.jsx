// src/components/ProjectList.jsx
import React from "react";
import { Grid2, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProjectList = ({ projects }) => {
   const navigate = useNavigate();

   const handleSelectProject = (projectId) => {
      navigate(`/categories`, { state: { projectId } });
   };

   return (
      <Grid2 container spacing={3}>
         {projects.map((project) => (
            <Grid2 item xs={12} sm={6} md={4} key={project.id}>
               <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleSelectProject(project.id)}
               >
                  {project.name}
               </Button>
            </Grid2>
         ))}
      </Grid2>
   );
};

export default ProjectList;
