import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";
import api from "../api/api";

const AddResourceItem = () => {
   const [resourceTypeId, setResourceTypeId] = useState("");
   const [serialNumber, setSerialNumber] = useState("");
   const [status, setStatus] = useState("");
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const statusValue = status ? status : "available";

      try {
         const response = await api.post("/api/resources", {
            resource_type_id: resourceTypeId,
            serial_number: serialNumber,
            status: statusValue,
         });

         if (response.status === 201) {
            setSuccess("Resource item added successfully!");
            setResourceTypeId("");
            setSerialNumber("");
            setStatus("");
         }
      } catch (err) {
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
            <TextField
               label="Resource Type ID"
               value={resourceTypeId}
               onChange={(e) => setResourceTypeId(e.target.value)}
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
            >
               Add Resource Item
            </Button>
         </Box>
      </Container>
   );
};

export default AddResourceItem;