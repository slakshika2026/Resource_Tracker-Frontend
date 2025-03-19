import React, { useState, useEffect } from "react";
import { Grid2, Button, Typography } from "@mui/material";
import api from "../api/api";

const ResourceList = ({ resourceType }) => {
   const [resourceItems, setResourceItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {
      const fetchResources = async () => {
         if (!resourceType) return;

         try {
            const response = await api.get(`/api/resources/resource-types/${resourceType.resource_type_id}/resource_items`);

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

   const handleAllocateResource = (resourceId) => {
      // Handle resource allocation logic here
      console.log(`Allocating resource with ID: ${resourceId}`);
   };

   if (loading) {
      return (
         <Grid2 container justifyContent="center" sx={{ mt: 3 }}>
            <Typography>Loading resources...</Typography>
         </Grid2>
      );
   }

   if (error) {
      return <Typography color="error" align="center" sx={{ mt: 3 }}>{error}</Typography>;
   }

   return (
      <Grid2 container spacing={3} justifyContent="center" sx={{ mt: 5 }}>
         {resourceItems.length > 0 ? (
            resourceItems.map((resourceItem) => (
               <Grid2 item xs={12} sm={6} md={4} key={resourceItem.id}>
                  <Button
                     variant="outlined"
                     fullWidth
                     onClick={() => handleAllocateResource(resourceItem.id)}
                  >
                     {resourceItem.serial_number}
                  </Button>
                  {resourceItem.serial_number}
                  {resourceItem.status}
               <br/>
                  <Typography variant="h7" align="center">
                     allocated at
                     {resourceItem.allocated_at}
                  </Typography>

               </Grid2>
   ))
         ) : (
   <Typography variant="h6" color="textSecondary" align="center">
      No resources available.
   </Typography>
)}
      </Grid2 >
   );
};

export default ResourceList;
