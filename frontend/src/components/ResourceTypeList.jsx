import React, { useState, useEffect } from "react";
import { Grid2, Button, Typography, CircularProgress, Container } from "@mui/material";
import api from "../api/api";
import ResourceList from "./ResourceList"; // Import the ResourceList component

const ResourceType = ({ category }) => {
   const [resourceTypes, setResourceTypes] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const [selectedResourceType, setSelectedResourceType] = useState(null); // State for selected resource type

   useEffect(() => {
      const fetchResourceTypes = async () => {
         try {
            const response = await api.get(`/api/resources/categories/${category}/resource-types`);
            if (response.data.length > 0) {
               setResourceTypes(response.data);
            } else {
               setError("No resource types found.");
            }
         } catch (err) {
            setError("Failed to load resource types.");
            console.error("Error fetching resource types:", err);
         } finally {
            setLoading(false);
         }
      };

      fetchResourceTypes();
   }, [category]);  // Re-fetch resource types whenever category changes

   const handleSelectResourceType = (resourceType) => {

      setSelectedResourceType(resourceType);
   };

   if (loading) {
      return (
         <Container sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <CircularProgress />
         </Container>
      );
   }

   if (error) {
      return <Typography color="error" align="center" sx={{ mt: 3 }}>{error}</Typography>;
   }

   return (
      <Container sx={{ mt: 5 }}>
         <Typography variant="h5" align="center" gutterBottom>
            Resource Types for {category}
         </Typography>
         <Grid2 container spacing={3} justifyContent="center">
            {resourceTypes.map((resource, index) => (
               <Grid2 item xs={12} sm={6} md={4} key={index}>
                  <Button
                     variant="outlined"
                     fullWidth
                     sx={{ py: 2 }}
                     onClick={() => handleSelectResourceType(resource)}
                  >
                     {resource.name}

                  </Button>

                  <Typography variant="h7" align="center">
                     resource_type_id:
                     {resource.resource_type_id}
                  </Typography>

                  <Typography variant="body2">{resource.description}</Typography>
               </Grid2>
            ))}
         </Grid2>

         {/* Render ResourceList component if a resource type is selected */}
         {selectedResourceType && (
            <ResourceList resourceType={selectedResourceType} />
         )}
      </Container>
   );
};

export default ResourceType;
