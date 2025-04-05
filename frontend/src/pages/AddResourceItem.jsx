// import React, { useState, useEffect } from "react";
// import {
//    Container,
//    TextField,
//    Button,
//    Typography,
//    Box,
//    Alert,
//    MenuItem,
//    Select,
//    InputLabel,
//    FormControl,
//    CircularProgress,
// } from "@mui/material";
// import api from "../api/api";

// const AddResourceItem = () => {
//    const [resourceTypeName, setResourceTypeName] = useState(""); // store selected resource type name
//    const [resourceTypes, setResourceTypes] = useState([]); // store list of resource types
//    const [serialNumber, setSerialNumber] = useState("");
//    const [status, setStatus] = useState("");
//    const [error, setError] = useState(null);
//    const [success, setSuccess] = useState(null);
//    const [loading, setLoading] = useState(true);

//    // Fetch resource types on component mount
//    useEffect(() => {
//       const fetchResourceTypes = async () => {
//          try {
//             const response = await api.get("/api/resources/resource-types");
//             if (response.data) {
//                setResourceTypes(response.data);
//             }
//          } catch (err) {
//             console.error("Error fetching resource types", err);
//             setError("Failed to load resource types.");
//          } finally {
//             setLoading(false);
//          }
//       };

//       fetchResourceTypes();
//    }, []);

//    // Handle form submission
//    const handleSubmit = async (e) => {
//       e.preventDefault();

//       // Find the corresponding resource type ID based on the selected name
//       const selectedResourceType = resourceTypes.find(
//          (type) => type.name === resourceTypeName
//       );

//       const resourceTypeId = selectedResourceType ? selectedResourceType.resource_type_id : null;

//       if (!resourceTypeId) {
//          setError("Please select a valid resource type.");
//          return;
//       }

//       const statusValue = status || "available"; // Default status if not provided

//       try {
//          const response = await api.post("/api/resources", {
//             resource_type_id: resourceTypeId, // Pass the resource_type_id instead of resource_type_name
//             serial_number: serialNumber,
//             status: statusValue,
//          });

//          if (response.status === 201) {
//             setSuccess("Resource item added successfully!");
//             setResourceTypeName(""); // Reset selected resource type name
//             setSerialNumber(""); // Reset serial number
//             setStatus(""); // Reset status
//          }
//       } catch (err) {
//          console.error("Add resource error:", err);
//          setError("Failed to add resource item. Please try again.");
//       }
//    };

//    return (
//       <Container maxWidth="xs" sx={{ borderRadius: 2, p: 3, mt: 5 }}>
//          <Box sx={{ textAlign: "center", mb: 3 }}>
//             <Typography variant="h5" sx={{ fontWeight: "bold", color: "#205781" }}>
//                Add Resource Item
//             </Typography>
//          </Box>

//          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

//          <Box
//             component="form"
//             sx={{
//                display: "flex",
//                flexDirection: "column",
//                gap: 2,
//                padding: 3,
//                boxShadow: 2,
//             }}
//             onSubmit={handleSubmit}
//          >
//             {loading ? (
//                <Box display="flex" justifyContent="center">
//                   <CircularProgress />
//                </Box>
//             ) : (
//                <FormControl fullWidth required>
//                   <InputLabel sx={{ color: "#205781" }}>Resource Type</InputLabel>
//                   <Select
//                      value={resourceTypeName}
//                      onChange={(e) => {
//                         setResourceTypeName(e.target.value);
//                         console.log("Selected Resource Type:", e.target.value); // Log the selected resource type name
//                      }}
//                      label="Resource Type"
//                      sx={{
//                         backgroundColor: "#FFFFFF",
//                         borderRadius: 1,
//                         '& .MuiInputBase-root': { color: "#205781" },
//                      }}
//                   >
//                      {resourceTypes.map((type) => (
//                         <MenuItem key={type.id} value={type.name}>
//                            {type.name}
//                         </MenuItem>
//                      ))}
//                   </Select>

//                </FormControl>
//             )}

//             {/* Serial Number input */}
//             <TextField
//                label="Serial Number"
//                value={serialNumber}
//                onChange={(e) => setSerialNumber(e.target.value)}
//                fullWidth
//                required
//                sx={{
//                   backgroundColor: "#FFFFFF",
//                   borderRadius: 1,
//                   '& .MuiInputBase-root': { color: "#205781" },
//                   '& .MuiInputLabel-root': { color: "#205781" },
//                }}
//             />

//             {/* Submit button */}
//             <Button
//                fullWidth
//                variant="contained"
//                sx={{
//                   mt: 2,
//                   backgroundColor: "#205781",
//                   color: "#FFFFFF",
//                   '&:hover': { backgroundColor: "#4F959D" },
//                }}
//                type="submit"
//                disabled={loading} // Disable submit while loading
//             >
//                Add Resource Item
//             </Button>
//          </Box>
//       </Container>
//    );
// };

// export default AddResourceItem


//testing code
import React, { useState, useEffect } from "react";
import {
   Container,
   TextField,
   Button,
   Typography,
   Box,
   Alert,
   MenuItem,
   Select,
   InputLabel,
   FormControl,
   CircularProgress,
} from "@mui/material";
import api from "../api/api";

const AddResourceItem = () => {
   const [resourceTypeName, setResourceTypeName] = useState(""); // store selected resource type name
   const [resourceTypes, setResourceTypes] = useState([]); // store list of resource types
   const [serialNumber, setSerialNumber] = useState("");
   const [status, setStatus] = useState("");
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);
   const [loading, setLoading] = useState(true);
   const [isAddingNew, setIsAddingNew] = useState(false); // state to handle adding a new resource type
   const [newResourceType, setNewResourceType] = useState(""); // state to store new resource type name
   const [description, setDescription] = useState(""); // state for new resource type description
   const [category, setCategory] = useState(""); // state for new resource type category

   // Fetch resource types on component mount
   useEffect(() => {
      const fetchResourceTypes = async () => {
         try {
            const response = await api.get("/api/resources/resource-types");
            if (response.data) {
               setResourceTypes(response.data);
            }
         } catch (err) {
            console.error("Error fetching resource types", err);
            setError("Failed to load resource types.");
         } finally {
            setLoading(false);
         }
      };

      fetchResourceTypes();
   }, []);

   // Handle form submission
   const handleSubmit = async (e) => {
      e.preventDefault();

      // Find the corresponding resource type ID based on the selected name
      const selectedResourceType = resourceTypes.find(
         (type) => type.name === resourceTypeName
      );

      const resourceTypeId = selectedResourceType
         ? selectedResourceType.resource_type_id
         : null;

      if (!resourceTypeId && !isAddingNew) {
         setError("Please select a valid resource type.");
         return;
      }

      const statusValue = status || "available"; // Default status if not provided

      try {
         const response = await api.post("/api/resources", {
            resource_type_id: isAddingNew ? null : resourceTypeId, // Pass null if adding a new resource type
            serial_number: serialNumber,
            status: statusValue,
            new_resource_type: isAddingNew ? newResourceType : null, // Add new resource type if needed
            description: isAddingNew ? description : null, // Add description if creating new resource type
            category: isAddingNew ? category : null, // Add category if creating new resource type
         });

         if (response.status === 201) {
            setSuccess("Resource item added successfully!");
            setResourceTypeName(""); // Reset selected resource type name
            setSerialNumber(""); // Reset serial number
            setStatus(""); // Reset status
            setIsAddingNew(false); // Reset new resource type state
            setNewResourceType(""); // Reset new resource type field
            setDescription(""); // Reset description field
            setCategory(""); // Reset category field
         }
      } catch (err) {
         console.error("Add resource error:", err);
         setError("Failed to add resource item. Please try again.");
      }
   };

   return (
      <Container maxWidth="xs" sx={{ borderRadius: 2, p: 3, mt: 5 }}>
         <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#205781" }}>
               Add Resource Item
            </Typography>
         </Box>

         {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
         {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

         <Box
            component="form"
            sx={{
               display: "flex",
               flexDirection: "column",
               gap: 2,
               padding: 3,
               boxShadow: 2,
            }}
            onSubmit={handleSubmit}
         >
            {loading ? (
               <Box display="flex" justifyContent="center">
                  <CircularProgress />
               </Box>
            ) : (
               <FormControl fullWidth required>
                  <InputLabel sx={{ color: "#205781" }}>Resource Type</InputLabel>
                  <Select
                     value={resourceTypeName}
                     onChange={(e) => {
                        const selectedValue = e.target.value;
                        setResourceTypeName(selectedValue);

                        // Toggle isAddingNew based on selected option
                        if (selectedValue === "add-new") {
                           setIsAddingNew(true);
                        } else {
                           setIsAddingNew(false); // hide form if a valid existing type is selected
                        }

                        console.log("Selected Resource Type:", selectedValue);
                     }}
                     label="Resource Type"
                     sx={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: 1,
                        '& .MuiInputBase-root': { color: "#205781" },
                     }}
                  >
                     <MenuItem value="add-new">Add New Resource Type</MenuItem>
                     {resourceTypes.map((type) => (
                        <MenuItem key={type.id} value={type.name}>
                           {type.name}
                        </MenuItem>
                     ))}
                  </Select>

               </FormControl>
            )}

            {/* If "Add New Resource Type" is selected, show input fields for new resource type */}
            {isAddingNew && (
               <>
                  <TextField
                     label="New Resource Type"
                     value={newResourceType}
                     onChange={(e) => setNewResourceType(e.target.value)}
                     fullWidth
                     required
                     sx={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: 1,
                        '& .MuiInputBase-root': { color: "#205781" },
                        '& .MuiInputLabel-root': { color: "#205781" },
                     }}
                  />

                  <TextField
                     label="Description"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     fullWidth
                     required
                     sx={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: 1,
                        '& .MuiInputBase-root': { color: "#205781" },
                        '& .MuiInputLabel-root': { color: "#205781" },
                     }}
                  />

                  <TextField
                     label="Category"
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
                     fullWidth
                     required
                     sx={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: 1,
                        '& .MuiInputBase-root': { color: "#205781" },
                        '& .MuiInputLabel-root': { color: "#205781" },
                     }}
                  />
               </>
            )}

            {/* Serial Number input */}
            <TextField
               label="Serial Number"
               value={serialNumber}
               onChange={(e) => setSerialNumber(e.target.value)}
               fullWidth
               required
               sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 1,
                  '& .MuiInputBase-root': { color: "#205781" },
                  '& .MuiInputLabel-root': { color: "#205781" },
               }}
            />

            {/* Submit button */}
            <Button
               fullWidth
               variant="contained"
               sx={{
                  mt: 2,
                  backgroundColor: "#205781",
                  color: "#FFFFFF",
                  '&:hover': { backgroundColor: "#4F959D" },
               }}
               type="submit"
               disabled={loading} // Disable submit while loading
            >
               Add Resource Item
            </Button>
         </Box>
      </Container>
   );
};

export default AddResourceItem;

