import React, { useState } from "react";
import {
   Container,
   TextField,
   Button,
   Typography,
   Box,
   Alert,
   Paper,
   Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const AddProject = () => {
   const [projectName, setProjectName] = useState("");
   const [description, setDescription] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [successMessage, setSuccessMessage] = useState("");
   const [buttonDisabled, setButtonDisabled] = useState(false);
   const navigate = useNavigate();

   const checkProjectNameUniqueness = async (name) => {
      try {
         const response = await api.post("/api/projects/check-name", { name });
         return response.data.isUnique;
      } catch (err) {
         console.error("Error checking project name:", err);
         return false;
      }
   };

   const handleAddProject = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      setSuccessMessage("");
      setButtonDisabled(true);

      const isUnique = await checkProjectNameUniqueness(projectName);
      if (!isUnique) {
         setError("Project name must be unique. Please choose another name.");
         setButtonDisabled(false);
         setLoading(false);
         return;
      }

      try {
         const response = await api.post("/api/projects", {
            name: projectName,
            description,
         });

         if (response.status === 201) {
            setSuccessMessage("Project added successfully!");
            setTimeout(() => navigate("/dashboard"), 2000);
         }
      } catch (err) {
         console.error("Error adding project:", err);
         setError("Failed to add the project. Please try again.");
         setButtonDisabled(false);
      } finally {
         setLoading(false);
      }
   };

   return (
      <Container
         maxWidth="sm"
         sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
         }}
      >
         <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, width: "100%" }}>
            <Box
               component="form"
               onSubmit={handleAddProject}
               sx={{
                  display: "flex",
                  flexDirection: "column",
               }}
            >
               <Typography
                  variant="h5"
                  align="center"
                  sx={{ mb: 3, fontWeight: "bold", color: "#205781" }}
               >
                  Add Project
               </Typography>

               <TextField
                  fullWidth
                  label="Project Name"
                  margin="normal"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
               />

               <TextField
                  fullWidth
                  label="Project Description"
                  margin="normal"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
               />

               {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                     {error}
                  </Alert>
               )}

               {successMessage && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                     {successMessage}
                  </Alert>
               )}

               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                     mt: 3,
                     backgroundColor: "#205781",
                     color: "#FFFFFF",
                     "&:hover": { backgroundColor: "#4F959D" },
                  }}
                  disabled={loading || buttonDisabled}
               >
                  {loading ? "Adding..." : "Add Project"}
               </Button>
            </Box>

            <Snackbar
               open={!!successMessage}
               message={successMessage}
               autoHideDuration={3000}
            />
         </Paper>
      </Container>
   );
};

export default AddProject;
