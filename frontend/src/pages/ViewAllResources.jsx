import React, { useState, useEffect } from "react";
import {
   Container, Typography, Table, TableHead, TableRow, TableCell,
   TableBody, TableContainer, Paper, IconButton, Menu, MenuItem,
   Dialog, DialogActions, DialogContent, DialogTitle, Button, FormControl, Select, Snackbar, Alert
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import api from "../api/api";

const ViewAllResources = () => {
   const [resources, setResources] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [openDialog, setOpenDialog] = useState(false);
   const [selectedResource, setSelectedResource] = useState(null);
   const [filter, setFilter] = useState("all");
   const [anchorEl, setAnchorEl] = useState(null);
   const [menuResource, setMenuResource] = useState(null);
   const [snackbarOpen, setSnackbarOpen] = useState(false);

   useEffect(() => {
      fetchResources();
   }, [filter]);

   const fetchResources = async () => {
   setLoading(true);
   setError(null);
   let endpoint = "/api/resources";

   if (filter === "available") {
      endpoint = "/api/resources/available";
   } else if (filter === "in_use") {
      endpoint = "/api/resources/in_use";
   }

   try {
      const response = await api.get(endpoint);
      if (response.data && Array.isArray(response.data)) {
         // Exclude deleted resources only when the filter is "all"
         const filteredResources = filter === "all" 
            ? response.data.filter(resource => resource.status !== "deleted") 
            : response.data;
            
         setResources(filteredResources);
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
            setResources(prevResources => prevResources.filter(resource => resource.resource_item_id !== selectedResource));
            setSnackbarOpen(true);
         }
      } catch (err) {
         setError("Failed to delete resource. Please try again.");
      } finally {
         setOpenDialog(false);
         handleCloseMenu();
      }
   };

   const handleOpenMenu = (event, resource) => {
      setAnchorEl(event.currentTarget);
      setMenuResource(resource);
   };

   const handleCloseMenu = () => {
      setAnchorEl(null);
      setMenuResource(null);
   };

   const handleOpenDialog = (resourceItemId) => {
      setSelectedResource(resourceItemId);
      setOpenDialog(true);
      handleCloseMenu();
   };

   return (
      <Container>
         <Typography variant="h5" sx={{ textAlign: "center", mt: 4 }}>View All Resources</Typography>
         <FormControl sx={{ minWidth: 150, my: 1 }}>
            <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
               <MenuItem value="all">No Filter</MenuItem>
               <MenuItem value="available">Available</MenuItem>
               <MenuItem value="in_use">In Use</MenuItem>
            </Select>
         </FormControl>
         {loading ? (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>Loading resources...</Typography>
         ) : error ? (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 4, color: "red" }}>{error}</Typography>
         ) : (
            <TableContainer component={Paper}>
               <Table>
                  <TableHead sx={{ backgroundColor: "#f7f7f7" }}>
                     <TableRow>
                        <TableCell>Resource Type</TableCell>
                        <TableCell>Serial Number</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Project (if in use)</TableCell>
                        <TableCell>Actions</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {resources.map((resource) => (
                        <TableRow key={resource.resource_item_id}>
                           <TableCell>{resource.resource_type}</TableCell>
                           <TableCell>{resource.serial_number}</TableCell>
                           <TableCell>{resource.status}</TableCell>
                           <TableCell>
                              {resource.status === "in use" ? resource.project_name || "N/A" : "-"}
                           </TableCell>
                           <TableCell>
                              <IconButton onClick={(event) => handleOpenMenu(event, resource)}>
                                 <MoreVertIcon />
                              </IconButton>
                              <Menu
                                 anchorEl={anchorEl}
                                 open={Boolean(anchorEl && menuResource)}
                                 onClose={handleCloseMenu}
                                 sx={{
                                    "& .MuiPaper-root": {
                                       boxShadow: "none", // Remove the shadow here
                                    },
                                 }}
                              >
                                 <MenuItem
                                    onClick={() => handleOpenDialog(menuResource?.resource_item_id)}
                                    disabled={menuResource?.status === "in use"}
                                    sx={{ color: "red" }} // Red text color for delete option
                                 >
                                    Delete
                                 </MenuItem>
                                 <MenuItem onClick={() => alert("Update/Rename functionality coming soon!")}>Update/Rename</MenuItem>
                              </Menu>


                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         )}
         <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
               <Typography>Are you sure you want to delete this item?</Typography>
            </DialogContent>
            <DialogActions>
               <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
               <Button onClick={handleDeleteResource} color="error">Delete</Button>
            </DialogActions>
         </Dialog>
         <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
            <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
               Resource deleted successfully!
            </Alert>
         </Snackbar>
      </Container>
   );
};

export default ViewAllResources;