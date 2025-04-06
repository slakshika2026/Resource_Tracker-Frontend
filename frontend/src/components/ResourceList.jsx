import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Stack } from "@mui/material";
import api from "../api/api";
import AllocateResource from "./AllocateResource"; // Import the AllocateResource component

const ResourceList = ({ resourceType, projectId }) => {
   const [resourceItems, setResourceItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const [selectedResourceId, setSelectedResourceId] = useState(null);
   console.log("pro", projectId); // Track selected resource ID

   useEffect(() => {
      const fetchResources = async () => {
         if (!resourceType) return;

         try {
            const response = await api.get(
               `/api/resources/resource-types/${resourceType.resource_type_id}/resource_items`
            );

            if (response.data.length > 0) {
               setResourceItems(response.data);
            } else {
               setError("No resources found for this type.");
            }
         } catch (err) {
            setError("Failed to load resources.");
            console.error("Error fetching resources:", err);
         } finally {
            setLoading(false);
         }
      };

      fetchResources();
   }, [resourceType]);

   const handleSelectResource = (resourceId) => {
      console.log("Selected resource ID:", resourceId); // Debugging log
      setSelectedResourceId(resourceId); // Set the selected resource ID
   };

   if (loading) {
      return (
         <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Typography>Loading resources...</Typography>
         </Box>
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
      <Box sx={{ mt: 5 }}>
         <Typography variant="body1" align="center" gutterBottom sx={{ color: "#333333" }}>
            Select a Resource Item under the Resource Type: {resourceType.name}
         </Typography>
         <Stack spacing={3} justifyContent="center">
            {resourceItems.length > 0 ? (
               resourceItems.map((resourceItem) => (
                  <Box key={resourceItem.resource_item_id}>
                     <Button
                        color={selectedResourceId === resourceItem.resource_item_id ? "success" : "default"}
                        variant={selectedResourceId === resourceItem.resource_item_id ? "contained" : "outlined"}
                        fullWidth
                        sx={{
                           py: 1,
                           borderColor: "#333333", // Dark Gray border
                           color: selectedResourceId === resourceItem.resource_item_id ? "#FFFFFF" : "#333333", // White text when selected
                           backgroundColor: selectedResourceId === resourceItem.resource_item_id ? "#333333" : "transparent", // Dark Gray background when selected
                           '&:hover': {
                              borderColor: "#666666", // Lighter Gray border on hover
                              color: selectedResourceId === resourceItem.resource_item_id ? "#FFFFFF" : "#666666", // Lighter Gray text on hover
                              backgroundColor: selectedResourceId === resourceItem.resource_item_id ? "#333333" : "transparent", // Dark Gray background on hover when selected
                           },
                        }}
                        onClick={() => handleSelectResource(resourceItem.resource_item_id)}
                     >
                        {resourceItem.serial_number}
                     </Button>
                  </Box>
               ))
            ) : (
               <Typography variant="h6" color="textSecondary" align="center">
                  No resources available.
               </Typography>
            )}
         </Stack>

         {/* Render AllocateResource component if a resource is selected */}
         {selectedResourceId && (
            <AllocateResource
               key={selectedResourceId}
               resourceId={selectedResourceId}
               projectId={projectId}
            />
         )}
      </Box>
   );
};

export default ResourceList;
