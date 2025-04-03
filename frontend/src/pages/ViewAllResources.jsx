import React, { useState, useEffect } from "react";
import {
   Container, Typography, Table, TableHead, TableRow, TableCell,
   TableBody, TableContainer, Paper, Button, Dialog, DialogActions,
   DialogContent, DialogTitle, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import api from "../api/api";

const ViewAllResources = () => {
   const [resources, setResources] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [openDialog, setOpenDialog] = useState(false);
   const [selectedResource, setSelectedResource] = useState(null);
   const [filter, setFilter] = useState("all");

   useEffect(() => {
      fetchResources();
   }, [filter]);

   const fetchResources = async () => {
      setLoading(true);
      setError(null);
      let endpoint = "/api/resources";
      if (filter === "available") endpoint = "/api/resources/available";
      else if (filter === "in_use") endpoint = "/api/resources/in_use";
      else if (filter === "deleted") endpoint = "/api/resources/deleted";

      try {
         const response = await api.get(endpoint);
         if (response.data && Array.isArray(response.data)) {
            setResources(response.data);
         } else {
            setError("Invalid data structure received.");
         }
      } catch (err) {
         setError("Failed to fetch resources. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   const handleDeleteResource = async () => {
      if (!selectedResource) return;
      try {
         const response = await api.delete(`/api/resources/res_item/del/${selectedResource}`);
         if (response.status === 200) {
            setResources((prevResources) => prevResources.filter((resource) => resource.resource_item_id !== selectedResource));
         }
      } catch (err) {
         setError("Failed to delete resource. Please try again.");
      } finally {
         setOpenDialog(false);
      }
   };

   const handleOpenDialog = (resourceItemId) => {
      setSelectedResource(resourceItemId);
      setOpenDialog(true);
   };

   const handleCloseDialog = () => {
      setOpenDialog(false);
      setSelectedResource(null);
   };

   return (
      <Container>
         <Typography variant="h5" sx={{ textAlign: "center", mt: 4 }}>

            View All Resources
         </Typography>
         <FormControl sx={{ minWidth: 150, my: 1 }}>
            <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
               <MenuItem value="all">All</MenuItem>
               <MenuItem value="available">Available</MenuItem>
               <MenuItem value="in_use">In Use</MenuItem>
               <MenuItem value="deleted">Deleted</MenuItem>
            </Select>
         </FormControl>
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
                  <TableHead sx={{ backgroundColor: "#f7f7f7" }}>
                     <TableRow>
                        <TableCell>Resource Type</TableCell>
                        <TableCell>Serial Number</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Resource Item ID</TableCell>
                        <TableCell>Actions</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {resources.map((resource) => (
                        <TableRow key={resource.resource_item_id}>
                           <TableCell>{resource.resource_type}</TableCell>
                           <TableCell>{resource.serial_number}</TableCell>
                           <TableCell>{resource.status}</TableCell>
                           <TableCell>{resource.resource_item_id}</TableCell>
                           <TableCell>
                              <Button
                                 variant="contained"
                                 color="error"
                                 onClick={() => handleOpenDialog(resource.resource_item_id)}
                                 disabled={resource.status === "in use" || resource.status === "deleted"}
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
         {/* Confirmation Dialog */}
         <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
               <Typography>Are you sure you want to delete this item?</Typography>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
               <Button onClick={handleDeleteResource} color="error">Delete</Button>
            </DialogActions>
         </Dialog>
      </Container>
   );
};

export default ViewAllResources;
