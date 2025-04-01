import React, { useState, useEffect } from "react";
import {
   Container, Typography, Table, TableHead, TableRow, TableCell,
   TableBody, TableContainer, Paper, Button
} from "@mui/material";
import api from "../api/api"; // Ensure that your api file is correctly set up for making requests to the backend
import Navbar from "../components/Navbar";

const ViewAllResources = () => {
   const [resources, setResources] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchResources = async () => {
         try {
            const response = await api.get("/api/resources");
            console.log("Fetched Resources:", response.data);

            // Check if resource_item_id exists in the fetched data
            if (response.data && Array.isArray(response.data)) {
               setResources(response.data);
            } else {
               setError("Invalid data structure received.");
            }
         } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to fetch resources. Please try again.");
         } finally {
            setLoading(false);
         }
      };

      fetchResources();
   }, []);

   const handleDeleteResource = async (resourceItemId) => {
      console.log("Deleting resource with ID:", resourceItemId);

      if (!resourceItemId) {
         console.error("Invalid resource ID:", resourceItemId);
         return;
      }

      try {
         // Send DELETE request to backend
         const response = await api.delete(`/api/resources/res_item/del/${resourceItemId}`);


         // If successful, update the resources state to remove the deleted resource
         if (response.status === 200) {
            setResources((prevResources) =>
               prevResources.filter((resource) => resource.resource_item_id !== resourceItemId)
            );
            console.log("Resource deleted successfully.");
         }
      } catch (err) {
         console.error("Delete error:", err);

         // Check if error response exists and handle accordingly
         if (err.response && err.response.data && err.response.data.message) {
            const errorMessage = err.response.data.message;

            // Show specific error message from backend
            if (errorMessage === 'Resource item is currently in use and cannot be deleted.') {
               setError("This resource is currently in use and cannot be deleted.");
            } else if (errorMessage === 'Resource item not found.') {
               setError("The resource item you are trying to delete was not found.");
            } else {
               setError("Failed to delete resource. Please try again.");
            }
         } else {
            setError("An unexpected error occurred. Please try again.");
         }
      }
   };

   // Filter out resources that have been marked as deleted
   const visibleResources = resources.filter((resource) => resource.status !== "deleted");

   return (
      <Container>
         <div >
            <Navbar />
         </div>
         <Typography variant="h4" sx={{ textAlign: "center", mt: 4 }}>
            View All Resources
         </Typography>
         {loading ? (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
               Loading resources...
            </Typography>
         ) : error ? (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 4, color: "red" }}>
               {error}
            </Typography>
         ) : (
            <TableContainer component={Paper}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell>Resource Type</TableCell>
                        <TableCell>Serial Number</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Resource Item ID</TableCell>
                        <TableCell>Actions</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {visibleResources.map((resource) => (
                        <TableRow key={resource.resource_item_id}>
                           <TableCell>{resource.resource_type}</TableCell>
                           <TableCell>{resource.serial_number}</TableCell>
                           <TableCell>{resource.status}</TableCell>
                           <TableCell>{resource.resource_item_id}</TableCell>
                           <TableCell>
                              <Button
                                 variant="contained"
                                 color="error"
                                 onClick={() => handleDeleteResource(resource.resource_item_id)}
                              >
                                 Delete
                              </Button>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         )}
      </Container>
   );
};

export default ViewAllResources;