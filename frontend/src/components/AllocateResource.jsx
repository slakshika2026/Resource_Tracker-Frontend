import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import api from "../api/api";

const AllocateResource = ({ resourceId, projectId }) => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [successMessage, setSuccessMessage] = useState(""); // Track successful allocation

   const handleAllocate = async () => {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      try {
         // API call to allocate the resource
         const response = await api.post(`/api/resources/${resourceId}/allocate_resource`,
            {
               project_id: projectId,
            }
         );

         if (response.status === 200) {
            setSuccessMessage("Resource allocated successfully!");
         }
      } catch (error) {
         console.error("Error allocating resource:", error);
         setError("Error allocating resource.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <Box
         sx={{
            textAlign: "center",
            mt: 3,
            border: "1px solid #ccc",
            padding: 3,
            borderRadius: 2,
         }}
      >
         <Typography variant="h5">Allocate Resource</Typography>
         <Typography variant="body1" sx={{ mt: 1 }}>
            Resource ID: {resourceId}, Project ID: {projectId}
         </Typography>



         {error && (
            <Typography color="error" sx={{ mt: 2 }}>
               {error}
            </Typography>
         )}
         {successMessage && (
            <Typography color="success" sx={{ mt: 2 }}>
               {successMessage}
            </Typography>
         )}

         <Button
            variant="contained"
            color="primary"
            onClick={handleAllocate}
            sx={{ mt: 2 }}
            disabled={loading}
         >
            {loading ? "Allocating..." : "Allocate Resource"}
         </Button>
      </Box>
   );
};
export default AllocateResource;