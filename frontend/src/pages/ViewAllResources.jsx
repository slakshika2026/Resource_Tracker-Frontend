
import React, { useState, useEffect } from "react";
import {
   Container, Typography, Table, TableHead, TableRow, TableCell,
   TableBody, TableContainer, Paper, IconButton, Menu, MenuItem,
   Dialog, DialogActions, DialogContent, DialogTitle, Button,
   FormControl, Select, Snackbar, Alert, TextField
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
   const [searchQuery, setSearchQuery] = useState("");
   const [serialSearchQuery, setSerialSearchQuery] = useState("");
   const [statusUpdateSnackbarOpen, setStatusUpdateSnackbarOpen] = useState(false);
   const [openStatusUpdateDialog, setOpenStatusUpdateDialog] = useState(false);  // New state for status update confirmation
   const [statusToUpdate, setStatusToUpdate] = useState(null);  // New state to store the status update info
   const [openAllocateDialog, setOpenAllocateDialog] = useState(false);
   const [availableProjects, setAvailableProjects] = useState([]);
   const [selectedProject, setSelectedProject] = useState("");
   const [expectedReturnDate, setExpectedReturnDate] = useState("");


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
      } else if (filter === "under_maintenance") {
         endpoint = "/api/resources/under_maintenance";
      }
      //Don't call Apis seperately here

      try {
         const response = await api.get(endpoint);
         if (response.data && Array.isArray(response.data)) {
            const filteredResources =
               filter === "all"
                  ? response.data.filter((resource) => resource.status !== "deleted")
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

   const handleUpdateStatus = async (resource_item_id, newStatus) => {
      // Instead of directly updating, trigger the confirmation dialog
      setMenuResource({ resource_item_id, newStatus });
      setOpenStatusUpdateDialog(true);

   };

   const confirmUpdateStatus = async () => {
      if (menuResource) {
         const { resource_item_id, newStatus } = menuResource;
         try {
            const response = await api.put(`/api/resources/update_status/${resource_item_id}`, {
               status: newStatus,
            });

            if (response.status === 200) {
               // Update the status in the local list
               setResources(prevResources =>
                  prevResources.map(resource =>
                     resource.resource_item_id === resource_item_id
                        ? { ...resource, status: newStatus }
                        : resource
                  )
               );
               setStatusUpdateSnackbarOpen(true);
               handleCloseMenu();// Trigger status update success snackbar
            }
         } catch (err) {
            console.error("Error updating resource status:", err);
            setError("Failed to update resource status. Please try again.");
         } finally {
            setOpenStatusUpdateDialog(false);  // Close the dialog after confirming
         }
      }
   };

   const handleOpenMenu = (event, resource) => {
      console.log("Resource menu opened for:", resource);
      setAnchorEl(event.currentTarget);
      setMenuResource(resource);
      // Check if this is properly set
   };

   const handleCloseMenu = () => {
      setAnchorEl(null);
      setMenuResource(null);
   };

   const handleOpenDialog = (resourceItemId) => {
      setSelectedResource(resourceItemId);
      setOpenDialog(true);
      // handleCloseMenu();
   };

   // Group resources by type
   const groupedResources = resources.reduce((acc, resource) => {
      if (!acc[resource.resource_type]) {
         acc[resource.resource_type] = [];
      }
      acc[resource.resource_type].push(resource);
      return acc;
   }, {});

   const filteredResources = Object.entries(groupedResources).map(([resourceType, resourcesByType]) => {
      return {
         resourceType,
         resources: resourcesByType.filter(resource => {
            const matchesResourceType = resource.resource_type && resource.resource_type.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSerialNumber = resource.serial_number && resource.serial_number.toLowerCase().includes(serialSearchQuery.toLowerCase());
            return matchesResourceType && matchesSerialNumber;
         })
      };
   });

   const handleAllocateResource = async () => {
      console.log("Allocating resource:", menuResource);
      console.log("Selected project:", selectedProject);
      console.log("Expected return date:", expectedReturnDate);
      console.log("Selected resource:", menuResource);
      if (!selectedProject || !expectedReturnDate) {
         setError("Please select a project and set the expected return date.");
         return;
      }
      try {
         // Make an API request to allocate the resource to the project
         const response = await api.post(`/api/resources/${menuResource.resource_item_id}/allocate_resource`, {
            project_id: selectedProject,
            // user_id: "user-id-here",  // Replace with actual user ID
            expected_return_date: expectedReturnDate
         });

         if (response.status === 200) {
            // Update the local state to reflect the resource allocation
            setResources(prevResources =>
               prevResources.map(resource =>
                  resource.resource_item_id === menuResource.resource_item_id
                     ? { ...resource, status: "in use", name: response.data.name, expectedReturnDate }
                     : resource
               )
            );
            setSnackbarOpen(true);
            setOpenAllocateDialog(false);
         }
      } catch (err) {
         setError("Failed to allocate resource. Please try again.");
      }
   };


   return (
      <Container>
         <Typography variant="h5" sx={{ textAlign: "center", mt: 4 }}>VIEW ALL RESOURCES</Typography>

         <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px", marginTop: "16px" }}>
            <FormControl sx={{ minWidth: 150, py: 1 }} size="small">
               <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <MenuItem value="all">No Filter</MenuItem>
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="in_use">In Use</MenuItem>
                  <MenuItem value="under_maintenance">Under Maintenance</MenuItem>
               </Select>
            </FormControl>

            <TextField
               label="Search Resource Type"
               variant="outlined"
               size="small"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               sx={{ flex: 1 }}
            />

            <TextField
               label="Search Serial Number"
               variant="outlined"
               size="small"
               value={serialSearchQuery}
               onChange={(e) => setSerialSearchQuery(e.target.value)}
               sx={{ flex: 1 }}
            />
         </div>

         {loading ? (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>LOADING RESOURCES...</Typography>
         ) : error ? (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 4, color: "red" }}>{error}</Typography>
         ) : (
            <TableContainer component={Paper}>
               <Table>
                  <TableHead sx={{ backgroundColor: "#f0f0f0", fontWeight: "bolder" }}>
                     <TableRow>
                        <TableCell sx={{ padding: "4px 8px", fontWeight: "bold" }}>RESOURCE TYPE</TableCell>
                        <TableCell sx={{ padding: "4px 8px", fontWeight: "bold" }}>SERIAL NUMBER</TableCell>
                        <TableCell sx={{ padding: "4px 8px", fontWeight: "bold" }}>STATUS</TableCell>
                        <TableCell sx={{ padding: "4px 8px", fontWeight: "bold" }}>PROJECT (IF IN USE)</TableCell>
                        <TableCell sx={{ padding: "4px 8px", fontWeight: "bold" }}>EXPECTED RETURN DATE</TableCell>
                        <TableCell sx={{ padding: "4px 8px", fontWeight: "bold" }}>ACTIONS</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {filteredResources.length === 0 ? (
                        <TableRow>
                           <TableCell colSpan={6} sx={{ textAlign: "center", color: "gray", fontSize: "0.85rem", py: 1 }}>
                              NO MATCHING RESOURCES FOUND.
                           </TableCell>
                        </TableRow>
                     ) : (
                        filteredResources.map((group) => (
                           <React.Fragment key={group.resourceType}>
                              <TableRow>
                                 <TableCell colSpan={6} sx={{ fontWeight: "bold", backgroundColor: "#fff", fontSize: "0.9rem", py: 1 }}>
                                    {group.resourceType?.toUpperCase()}
                                 </TableCell>
                              </TableRow>
                              {group.resources.map((resource, index) => (
                                 <TableRow
                                    key={resource.resource_item_id}
                                    sx={{
                                       fontSize: "0.85rem",
                                       backgroundColor:
                                          resource.status === "available"
                                             ? "#A8D5BA" // Muted Green
                                             : resource.status === "in use"
                                                ? "#f5f183" // Muted Yellow
                                                : resource.status === "under maintenance"
                                                   ? "#f8d7da" // Soft Red for Maintenance
                                                   : index % 2 === 0
                                                      ? "#fafafa"
                                                      : "#fff"
                                    }}
                                 >
                                    <TableCell sx={{ padding: "4px 8px", fontSize: "0.85rem" }}></TableCell>
                                    <TableCell sx={{ padding: "4px 8px", fontSize: "0.85rem" }}>
                                       {resource.serial_number?.toUpperCase()}
                                    </TableCell>
                                    <TableCell sx={{ padding: "4px 8px", fontSize: "0.85rem" }}>
                                       {resource.status?.toUpperCase()}
                                    </TableCell>
                                    <TableCell sx={{ padding: "4px 8px", fontSize: "0.85rem" }}>
                                       {resource.status === "in use"
                                          ? (resource.project_name?.toUpperCase() || "N/A")
                                          : "-"}

                                    </TableCell>
                                    <TableCell sx={{ padding: "4px 8px", fontSize: "0.85rem" }}>
                                       {resource.status === "in use" && resource.expected_return_date
                                          ? new Date(resource.expected_return_date).toLocaleDateString()
                                          : "-"}
                                    </TableCell>
                                    <TableCell sx={{ padding: "4px 8px", fontSize: "0.85rem" }}>
                                       <IconButton onClick={(event) => handleOpenMenu(event, resource)} size="small">
                                          <MoreVertIcon fontSize="small" />
                                       </IconButton>
                                    </TableCell>
                                 </TableRow>
                              ))}
                           </React.Fragment>
                        ))
                     )}
                  </TableBody>
               </Table>
            </TableContainer>
         )}

         <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "left",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "left",
            }}
         >
            {/* Delete Option */}
            <MenuItem
               onClick={() => handleOpenDialog(menuResource?.resource_item_id)}
               sx={{
                  color: "red",
                  cursor: menuResource?.status === "in use" ? "not-allowed" : "pointer",
               }}
               disabled={menuResource?.status === "in use"}
            >
               Delete Resource
            </MenuItem>

            {/* Update Status Option */}
            <MenuItem
               onClick={() =>
                  handleUpdateStatus(
                     menuResource?.resource_item_id,
                     menuResource?.status === "available" ? "under maintenance" : "available"
                  )
               }
               sx={{
                  color: "blue",
                  cursor: menuResource?.status === "in use" ? "not-allowed" : "pointer",
               }}
               disabled={menuResource?.status === "in use"}
            >
               {menuResource?.status === "available"
                  ? "Make Status: Under Maintenance"
                  : menuResource?.status === "under maintenance"
                     ? "Make Status: Available"
                     : "Update Status"}
            </MenuItem>
            <MenuItem
               onClick={async () => {
                  if (menuResource?.status !== "available") return;

                  try {

                     const response = await api.get("/api/projects");
                     setAvailableProjects(response.data || []);
                     setOpenAllocateDialog(true);
                  } catch (err) {
                     console.error(err);
                     setError("Failed to fetch project list.");
                  }
               }}
               sx={{
                  color: "#1976d2", // MUI primary blue or choose a darker color if needed
                  cursor: menuResource?.status !== "available" ? "not-allowed" : "pointer",
               }}
               disabled={menuResource?.status !== "available"}
            >
               Allocate to Project
            </MenuItem>


         </Menu>

         {/* Status Update Confirmation Dialog */}
         <Dialog open={openStatusUpdateDialog} onClose={() => setOpenStatusUpdateDialog(false)}>
            <DialogTitle>CONFIRM STATUS UPDATE</DialogTitle>
            <DialogContent>
               <Typography>ARE YOU SURE YOU WANT TO UPDATE THE STATUS?</Typography>
            </DialogContent>
            <DialogActions>
               <Button onClick={() => setOpenStatusUpdateDialog(false)} color="primary">CANCEL</Button>
               <Button onClick={confirmUpdateStatus} color="primary">UPDATE</Button>
            </DialogActions>
         </Dialog>

         <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>CONFIRM DELETION</DialogTitle>
            <DialogContent>
               <Typography>ARE YOU SURE YOU WANT TO DELETE THIS ITEM?</Typography>
            </DialogContent>
            <DialogActions>
               <Button onClick={() => setOpenDialog(false)} color="primary">CANCEL</Button>
               <Button onClick={handleDeleteResource} color="error">DELETE</Button>
            </DialogActions>
         </Dialog>
         <Dialog open={openAllocateDialog} onClose={() => setOpenAllocateDialog(false)}>
            <DialogTitle>ALLOCATE RESOURCE TO PROJECT</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
               <FormControl fullWidth size="small">
                  <Select
                     value={selectedProject}
                     onChange={(e) => setSelectedProject(e.target.value)}
                     displayEmpty
                  >
                     <MenuItem value="" disabled>Select Project</MenuItem>
                     {availableProjects.map((project) => (
                        <MenuItem key={project.project_id} value={project.project_id}>
                           {project.name.toUpperCase()}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
               <TextField
                  label="Expected Return Date"
                  type="date"
                  value={expectedReturnDate}
                  onChange={(e) => setExpectedReturnDate(e.target.value)}
                  size="small"
                  fullWidth
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={() => setOpenAllocateDialog(false)} color="primary">
                  CANCEL
               </Button>
               <Button onClick={handleAllocateResource} color="primary">
                  ALLOCATE
               </Button>
            </DialogActions>
         </Dialog>




         <Snackbar
            open={statusUpdateSnackbarOpen}
            autoHideDuration={3000}
            onClose={() => setStatusUpdateSnackbarOpen(false)}
         >
            <Alert onClose={() => setStatusUpdateSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
               STATUS UPDATED SUCCESSFULLY!
            </Alert>
         </Snackbar>
         <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
         >
            <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
               Resource updated successfully!
            </Alert>
         </Snackbar>

      </Container>
   );
};

export default ViewAllResources;


