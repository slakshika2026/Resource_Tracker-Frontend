// src/components/ResourceList.jsx
import React from "react";
import { Grid2, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResourceList = ({ resources }) => {
   const navigate = useNavigate();

   const handleAllocateResource = (resourceId) => {
      navigate(`/allocate/${resourceId}`);
   };

   return (
      <Grid2 container spacing={3}>
         {resources.map((resource) => (
            <Grid2 item xs={12} sm={6} md={4} key={resource.id}>
               <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleAllocateResource(resource.id)}
               >
                  {resource.name}
               </Button>
            </Grid2>
         ))}
      </Grid2>
   );
};

export default ResourceList;
