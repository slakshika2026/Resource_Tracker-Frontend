import React, { useState } from "react";
import { Container, Typography, TextField, Button, Stack, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";  // Assuming you have an api.js file for API calls


const AddProject = () => {
   const [projectName, setProjectName] = useState("");
   const [description, setDescription] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [successMessage, setSuccessMessage] = useState("");  // State to hold success message
   const [buttonDisabled, setButtonDisabled] = useState(false);  // To disable button after project is added
   const navigate = useNavigate();

   // Function to check project name uniqueness
   const checkProjectNameUniqueness = async (projectName) => {
      try {
         const response = await api.post('/api/projects/check-name', { name: projectName });
         return response.data.isUnique;  // Return true if unique, false if not
      } catch (error) {
         console.error('Error checking project name:', error);
         return false;  // Return false if there was an error
      }
   };

   const handleAddProject = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      setSuccessMessage(""); // Clear previous success message
      setButtonDisabled(true); // Disable button when adding the project

      // Check if project name is unique
      const isUnique = await checkProjectNameUniqueness(projectName);
      if (!isUnique) {
         setError("Project name must be unique. Please choose another name.");
         setButtonDisabled(false); // Re-enable button if name is not unique
         setLoading(false);
         return;
      }

      try {
         const response = await api.post("/api/projects", {
            name: projectName,
            description,
         });

         if (response.status === 201) {
            setSuccessMessage("Project added successfully!");  // Set success message
            setTimeout(() => navigate("/dashboard"), 2000); // Redirect after 2 seconds
         }
      } catch (err) {
         setError("Failed to add the project. Please try again.");
         console.error("Error adding project:", err);
         setButtonDisabled(false); // Re-enable button if there's an error
      } finally {
         setLoading(false);
      }
   };

   return (
      <Container sx={{ maxWidth: 600, mt: 5 }}>
         <Typography variant="h5" align="center" gutterBottom sx={{ color: "#333333", mt: 3 }}>
            Add New Project
         </Typography>

         {
            error && (
               <Typography color="error" align="center" sx={{ mb: 2 }}>
                  {error}
               </Typography>
            )
         }

         {
            successMessage && (
               <Typography color="success" align="center" sx={{ mb: 2 }}>
                  {successMessage}
               </Typography>
            )
         }

         <form onSubmit={handleAddProject}>
            <Stack spacing={2}>
               <TextField
                  label="Project Name"
                  variant="outlined"
                  fullWidth
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
               />
               <TextField
                  label="Project Description"
                  variant="outlined"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  multiline
                  rows={4}
               />
               <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  disabled={loading || buttonDisabled} // Disable button when adding or if already added
               >
                  {loading ? "Adding..." : "Add Project"}
               </Button>
            </Stack>
         </form>

         {/* Success Snackbar */}
         <Snackbar
            open={!!successMessage}
            message={successMessage}
            autoHideDuration={3000}
         />
      </Container >
   );
};

export default AddProject;
