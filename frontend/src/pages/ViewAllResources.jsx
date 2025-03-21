import React, { useState, useEffect } from "react";
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from "@mui/material";
import api from "../api/api";

const ViewAllResources = () => {
   const [resources, setResources] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchResources = async () => {
         try {
            const response = await api.get("/api/resources"); // Adjust the endpoint based on your actual API
            setResources(response.data);
         } catch (err) {
            setError("Failed to fetch resources. Please try again.");
         } finally {
            setLoading(false);
         }
      };

      fetchResources();
   }, []);

   return (
      <Container>
         <Typography variant="h4" sx={{ textAlign: "center", mt: 4 }}>
            View All Resources
         </Typography>

         {loading && <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>Loading...</Typography>}

         {error && <Typography variant="body1" sx={{ textAlign: "center", mt: 2, color: "red" }}>{error}</Typography>}

         {!loading && !error && (
            <TableContainer component={Paper} sx={{ mt: 4 }}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell><strong>Resource Type</strong></TableCell>
                        <TableCell><strong>Serial Number</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {resources.length === 0 ? (
                        <TableRow>
                           <TableCell colSpan={3} align="center">
                              No resources available.
                           </TableCell>
                        </TableRow>
                     ) : (
                        resources.map((resource, index) => (
                           <TableRow key={index}>
                              <TableCell>{resource.resource_type}</TableCell>
                              <TableCell>{resource.serial_number}</TableCell>
                              <TableCell>{resource.status}</TableCell>
                           </TableRow>
                        ))
                     )}
                  </TableBody>
               </Table>
            </TableContainer>
         )}
      </Container>
   );
};

export default ViewAllResources;
