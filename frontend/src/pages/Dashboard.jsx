import React, { useState, useEffect }
   from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import ProjectList from "../components/ProjectList";

const Dashboard = () => {

   return (
      <Container>
         <ProjectList />
      </Container>
   );
};

export default Dashboard;
