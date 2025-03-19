// src/components/AllocateResource.jsx
import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import api from "../api/api";

const AllocateResource = ({ resourceId }) => {
   const [projectId, setProjectId] = useState("");

   const handleAllocate = async () => {
      try {
         await api.post(`/resources/${resourceId}/allocate`, { projectId });
         alert("Resource allocated successfully!");
      } catch (error) {
         console.error("Error allocating resource:", error);
         alert("Error allocating resource.");
      }
   };

   return (
      <Box sx={{ textAlign: "center", mt: 3 }}>
         <Typography variant="h5">Allocate Resource</Typography>
         <TextField
            label="Project ID"
            variant="outlined"
            fullWidth
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            sx={{ mt: 2 }}
         />
         <Button variant="contained" color="primary" onClick={handleAllocate} sx={{ mt: 2 }}>
            Allocate Resource
         </Button>
      </Box>
   );
};

export default AllocateResource;
