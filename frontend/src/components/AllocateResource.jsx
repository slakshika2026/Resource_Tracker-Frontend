// src/components/AllocateResource.jsx
import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import api from "../api/api"; // Assuming your api instance is correctly set up

const AllocateResource = ({ resourceId }) => {
   const [projectId, setProjectId] = useState("");
   const [loading, setLoading] = useState(false); // To manage loading state
   const [error, setError] = useState(""); // To handle error messages

   const handleAllocate = async () => {
      if (!projectId) {
         alert("Please enter a Project ID.");
         return;
      }

      setLoading(true);
      setError(""); // Reset the error before making the request

      try {
         // Assuming your API follows this endpoint pattern for allocation
         const response = await api.post(`/resources/${resourceId}/allocate`, { projectId });

         if (response.status === 200) {
            alert("Resource allocated successfully!");
         }
      } catch (error) {
         console.error("Error allocating resource:", error);
         setError("Error allocating resource.");
      } finally {
         setLoading(false);
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
         {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>} {/* Show error message */}
         <Button
            variant="contained"
            color="primary"
            onClick={handleAllocate}
            sx={{ mt: 2 }}
            disabled={loading} // Disable button while request is loading
         >
            {loading ? "Allocating..." : "Allocate Resource"}
         </Button>
      </Box>
   );
};

export default AllocateResource;
