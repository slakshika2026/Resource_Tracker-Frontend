// // src/components/ProjectList.jsx
// import React, { useEffect, useState } from "react";
// import { Grid2, Button, Typography, CircularProgress } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import api from "../api/api"; // Assuming your api instance is correctly set up

// const ProjectList = () => {
//    const navigate = useNavigate();
//    const [projects, setProjects] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState("");

//    // Fetch the projects when the component mounts
//    useEffect(() => {
//       const fetchProjects = async () => {
//          try {
//             const response = await api.get('/projects'); // Adjusted to match backend route
//             setProjects(response.data);
//          } catch (err) {
//             setError("Failed to load projects.");
//             console.error(err);
//          } finally {
//             setLoading(false);
//          }
//       };

//       fetchProjects();
//    }, []);

//    const handleSelectProject = (projectId) => {
//       navigate(`/categories`, { state: { projectId } });
//    };

//    if (loading) {
//       return (
//          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
//             <CircularProgress />
//          </div>
//       );
//    }

//    if (error) {
//       return <Typography color="error" sx={{ textAlign: "center", mt: 3 }}>{error}</Typography>;
//    }

//    return (
//       <Grid2 container spacing={3}>
//          {projects.map((project) => (
//             <Grid2 item xs={12} sm={6} md={4} key={project.project_id}>
//                <Button
//                   variant="contained"
//                   fullWidth
//                   onClick={() => handleSelectProject(project.project_id)}
//                >
//                   {project.name}
//                </Button>
//             </Grid2>
//          ))}
//       </Grid2>
//    );
// };

// export default ProjectList;


import React, { useState, useEffect } from "react";
import { Grid2, Button, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // Ensure this is correctly pointing to your API

const ProjectList = () => {
   const [projects, setProjects] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   // Fetch projects from the backend
   useEffect(() => {
      const fetchProjects = async () => {
         try {
            const response = await api.get('api/projects/');
            console.log('Projects fetched:', response.data); // Log the response
            setProjects(response.data);
         } catch (err) {
            setError(`Failed to load projects: ${err.message}`);
            console.error('Error fetching projects:', err);
         } finally {
            setLoading(false);
         }
      };

      fetchProjects();
   }, []);

   const handleSelectProject = (projectId) => {
      navigate(`/categories`, { state: { projectId } });
   };

   if (loading) {
      return <CircularProgress />;  // Show loading spinner while fetching data
   }

   if (error) {
      return <Typography color="error">{error}</Typography>;  // Display error if fetching fails
   }

   return (
      <Grid2 container spacing={3}>
         {projects.map((project) => (
            <Grid2 item xs={12} sm={6} md={4} key={project.project_id}>
               <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleSelectProject(project.project_id)}
               >
                  {project.name}

               </Button>
               {project.description}
               <br />
               {project.start_date}
            </Grid2>
         ))}
      </Grid2>
   );
};

export default ProjectList;
