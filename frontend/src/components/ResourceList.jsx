// src/components/ResourceList.jsx
import React from "react";
import { Grid2, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResourceList = ({ resourceItems }) => {
   const navigate = useNavigate();

   // Navigate to the resource allocation page when the button is clicked
   const handleAllocateResource = (resourceId) => {
      navigate(`/allocate/${resourceId}`);
   };

   return (
      <Grid2 container spacing={3}>
         {resourceItems.length > 0 ? (
            resourceItems.map((resourceItem) => (
               <Grid2 item xs={12} sm={6} md={4} key={resourceItem.id}>
                  <Button
                     variant="contained"
                     fullWidth
                     onClick={() => handleAllocateResource(resourceItem.id)}
                  >
                     {resourceItem.name} {/* Assuming 'name' is the name of the resource */}
                  </Button>
               </Grid2>
            ))
         ) : (
            <Typography variant="h6" color="textSecondary" align="center" fullWidth>
               No resources available.
            </Typography>
         )}
      </Grid2>
   );
};

export default ResourceList;
