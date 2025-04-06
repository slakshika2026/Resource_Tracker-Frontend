import React, { useState, useEffect }
   from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import ProjectList from "../components/ProjectList";

const Dashboard = () => {

   const [projects, setProjects] = useState([]);
   const [loading, setLoading] = useState(true); // Loading state

   return (
      <Container>
         <ProjectList projects={projects} loading={loading} />
      </Container>
   );
};

export default Dashboard;
