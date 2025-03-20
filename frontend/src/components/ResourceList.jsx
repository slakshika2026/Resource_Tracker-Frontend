import React, { useState, useEffect } from "react";
import { Grid2, Button, Typography, Box } from "@mui/material";
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
         <Grid2 container spacing={3} justifyContent="center">
            {resourceItems.length > 0 ? (
               resourceItems.map((resourceItem) => (
                  <Grid2
                     item
                     xs={12}
                     sm={6}
                     md={4}
                     key={resourceItem.resource_item_id}
                  >
                     <Button
                        variant="outlined"
                        fullWidth
                        onClick={() =>
                           handleSelectResource(resourceItem.resource_item_id)
                        }
                     >
                        {resourceItem.serial_number}
                     </Button>
                     <Typography variant="body2">
                        Status: {resourceItem.status}
                     </Typography>
                     <Typography variant="body2">
                        Allocated at: {resourceItem.allocated_at}
                     </Typography>
                  </Grid2>
               ))
            ) : (
               <Typography variant="h6" color="textSecondary" align="center">
                  No resources available.
               </Typography>
            )}
         </Grid2>

         {/* Render AllocateResource component if a resource is selected */}
         {selectedResourceId && (
            <AllocateResource
               key={selectedResourceId.resourceId}
               resourceId={selectedResourceId}
               projectId={projectId}
            />
         )}
      </Box>
   );
};

export default ResourceList;