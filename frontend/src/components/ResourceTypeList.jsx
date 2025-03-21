import React, { useState, useEffect } from "react";
import {
   Grid2,
   Button,
   Typography,
   CircularProgress,
   Container,
} from "@mui/material";
import api from "../api/api";
import ResourceList from "./ResourceList"; // Import the ResourceList component

const ResourceType = ({ category, projectId }) => {
   const [resourceTypes, setResourceTypes] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const [selectedResourceType, setSelectedResourceType] = useState(null); // State for selected resource type
   console.log("Project ID:", projectId); // Debugging log

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
   }, [category]); // Re-fetch resource types whenever category changes

   const handleSelectResourceType = (resourceType) => {
      setSelectedResourceType(resourceType); // Select a new resource type
   };

   if (loading) {
      return (
         <Container sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <CircularProgress />
         </Container>
      );
   }

   if (error) {
      return (
         <Typography color="error" align="center" sx={{ mt: 3 }}>
            {error}
         </Typography>
      );
   }

   return (
      <Container sx={{ mt: 5 }}>
         <Typography variant="h6" align="center" gutterBottom sx={{ color: "#333333" }}>
            Resource Types for {category}
         </Typography>
         <Grid2 container spacing={3} justifyContent="center">
            {resourceTypes.map((resource, index) => (
               <Grid2 item xs={12} sm={6} md={4} key={index}>
                  <Button
                     variant={selectedResourceType === resource ? "contained" : "outlined"} // Conditionally filled button
                     fullWidth
                     sx={{
                        py: 1,
                        borderColor: "#0077B5", // LinkedIn Blue border
                        color: selectedResourceType === resource ? "#FFFFFF" : "#0077B5", // White text when selected, LinkedIn Blue when not
                        backgroundColor: selectedResourceType === resource ? " #4F959D" : "transparent", // LinkedIn Blue background when selected
                        '&:hover': {
                           borderColor: "#005582", // Darker LinkedIn Blue border on hover
                           color: selectedResourceType === resource ? "#FFFFFF" : "#005582", // Darker LinkedIn Blue text on hover

                        },
                        fontWeight: "bold", // Bold text
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Small shadow
                        borderRadius: "8px", // Slightly rounded corners
                     }}
                     onClick={() => handleSelectResourceType(resource)}
                  >
                     {resource.name}
                  </Button>

                  <Typography variant="body2" sx={{ mt: 0.5, color: "#666666" }}>
                     {resource.description}
                  </Typography>
               </Grid2>
            ))}
         </Grid2>

         {/* Render ResourceList component if a resource type is selected */}
         {selectedResourceType && (
            <ResourceList
               key={selectedResourceType.resource_type_id}
               resourceType={selectedResourceType}
               projectId={projectId}
            />
         )}
      </Container>
   );
};

export default ResourceType;
