// src/components/ResourceTypeList.jsx
import React from "react";
import { Grid2, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResourceTypeList = ({ resourceTypes }) => {
   const navigate = useNavigate();

   const handleSelectResourceType = (resourceTypeId) => {
      navigate(`/resources`, { state: { resourceTypeId } });
   };

   return (
      <Grid2 container spacing={3}>
         {resourceTypes.map((resourceType) => (
            <Grid2 item xs={12} sm={6} md={4} key={resourceType.id}>
               <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleSelectResourceType(resourceType.id)}
               >
                  {resourceType.name}
               </Button>
            </Grid2>
         ))}
      </Grid2>
   );
};

export default ResourceTypeList;
