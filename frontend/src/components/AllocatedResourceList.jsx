import React, { useState, useEffect } from "react";
import {
   Typography,
   CircularProgress,
   Container,
   List,
   ListItem,
   ListItemText,
   Alert,
   Button,
} from "@mui/material";
import api from "../api/api"; // Axios instance

const AllocatedResourceList = ({ projectId }) => {
   const [allocations, setAllocations] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {
      const fetchAllocations = async () => {
         if (!projectId) {
            setError("Project ID is required");
            setLoading(false);
            return;
         }

         try {
            const response = await api.get(`/api/allocations/${projectId}`);

            if (response.data && Array.isArray(response.data)) {
               setAllocations(response.data);
            } else {
               setAllocations([]);
               console.warn("Unexpected API response format:", response.data);
            }
         } catch (err) {
            if (err.response?.status === 404) {
               setAllocations([]);
            } else {
               setError(`Failed to load allocations: ${err.message || "Unknown error"}`);
               console.error("Error fetching allocations:", err);
            }
         } finally {
            setLoading(false);
         }
      };

      fetchAllocations();
   }, [projectId]);

   // Function to deallocate a resource
   const handleDeallocate = async (resourceItemId) => {
      try {
         console.log(resourceItemId);
         console.log("Deallocating resource:", resourceItemId); // Debugging

         const response = await api.put(
            `/api/resources/update_status/${resourceItemId}`,
            { status: "available" },
            { headers: { "Content-Type": "application/json" } } // Ensure proper headers
         );


         console.log("Deallocation response:", response.data); // Debugging

         if (response.status === 200) {
            setAllocations((prevAllocations) =>
               prevAllocations.filter((allocation) => allocation.resource_item_id !== resourceItemId)
            );
         }
      } catch (err) {
         console.error("Failed to deallocate resource:", err);

         if (err.response) {
            console.error("Server Response:", err.response.data);
            setError(`Failed to deallocate resource: ${err.response.data.message}`);
         } else if (err.request) {
            console.error("No response received:", err.request);
            setError("Network error: No response from server.");
         } else {
            console.error("Error setting up request:", err.message);
            setError(`Request error: ${err.message}`);
         }
      }
   };


   if (loading) {
      return (
         <Container sx={{ textAlign: "center", mt: 3 }}>
            <CircularProgress />
         </Container>
      );
   }

   if (error) {
      return (
         <Alert severity="error" sx={{ mt: 3 }}>
            {error}
         </Alert>
      );
   }

   return (
      <Container>
         <Typography variant="h5" align="center" gutterBottom>
            Allocated Resources for Project {projectId}
         </Typography>
         {allocations.length === 0 ? (
            <Alert severity="info" sx={{ mt: 2 }}>
               No resources allocated to this project.
            </Alert>
         ) : (
            <List>
               {allocations.map((allocation) => (
                  <ListItem key={allocation.resource_item_id} divider>
                     <ListItemText
                        primary={`Serial Number: ${allocation.serial_number || "Unnamed Resource"}`}
                        secondary={
                           <>
                              {allocation.status === "in use" && (
                                 <>
                                    <Typography component="span" variant="body2" display="block">
                                       Allocated At:{" "}
                                       {allocation.allocated_date
                                          ? new Date(allocation.allocated_date).toLocaleString()
                                          : "N/A"},<br />
                                       for project: {allocation.project_name}
                                    </Typography>

                                    <Button
                                       variant="contained"
                                       color="error"
                                       onClick={() => handleDeallocate(allocation.resource_item_id)}
                                       sx={{ mt: 1 }}
                                    >
                                       Deallocate
                                    </Button>
                                 </>
                              )}
                           </>
                        }
                     />
                  </ListItem>
               ))}
            </List>
         )}
      </Container>
   );
};

export default AllocatedResourceList;
