// src/pages/AddResourceItem.jsx
import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import api from "../api/api";
import Navbar from "../components/Navbar";

const AddResourceItem = () => {
   const [resourceTypeId, setResourceTypeId] = useState("");
   const [serialNumber, setSerialNumber] = useState("");
   const [status, setStatus] = useState("");
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   const handleSubmit = async (e) => {
      e.preventDefault(); //Form submitted, but page won't refresh


      const statusValue = status ? status : 'available';

      try {

         const response = await api.post("/api/resources", {
            resource_type_id: resourceTypeId,
            serial_number: serialNumber,
            status: statusValue
         });

         if (response.status === 201) {
            setSuccess("Resource item added successfully!");
            setResourceTypeId("");
            setSerialNumber("");
            setStatus('');
         }
      } catch (err) {
         setError("Failed to add resource item. Please try again.");
      }
   };


   return (
      <Container>
         <div>
            <Navbar />
         </div>
         <Typography variant="h4" sx={{ textAlign: "center", my: 2 }}>
            Add Resource Item
         </Typography>

         {error && <Typography color="error">{error}</Typography>}
         {success && <Typography color="success">{success}</Typography>}

         <Box
            component="form"
            sx={{
               display: "flex",
               flexDirection: "column",
               gap: 2,
               maxWidth: 400,
               margin: "0 auto",
               backgroundColor: "#f7f7f7",
               padding: 3,
               borderRadius: 2,
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
            />
            <TextField
               label="Serial Number"
               value={serialNumber}
               onChange={(e) => setSerialNumber(e.target.value)}
               fullWidth
               required
            />
            {/* <TextField
               label="Status"
               value={status}
               onChange={(e) => setStatus(e.target.value)}
               fullWidth
               required
            /> */}

            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
               Add Resource Item
            </Button>
         </Box>
      </Container>
   );
};

export default AddResourceItem;
