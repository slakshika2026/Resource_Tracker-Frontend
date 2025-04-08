import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
   Container,
   Typography,
   Box,
   Stack,
   Button,
   Collapse,
} from "@mui/material";
import CategoryList from "../components/CategoryList";
import AllocatedResourceList from "../components/AllocatedResourceList";

const ResourceAllocationPage = () => {
   const { state } = useLocation();
   const { projectId } = useParams();

   const [showAllocations, setShowAllocations] = useState(false); // 👈 state to toggle visibility

   if (!state || !state.projectName) {
      return (
         <Container>
            <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
               Project details not found.
            </Typography>
         </Container>
      );
   }

   const { projectName } = state;

   const handleToggleAllocations = () => {
      setShowAllocations((prev) => !prev); // 👈 toggle visibility
   };

   return (
      <Container>
         <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h5" sx={{ mt: 2 }}>
               Selected Project Name: {projectName.toUpperCase()}
            </Typography>

         </Box>

         {/* Category selection */}
         <Stack spacing={3} mt={4}>
            <CategoryList projectId={projectId} />
         </Stack>

         {/* Show Allocated Resources Button */}
         <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
               variant={showAllocations ? "outlined" : "contained"}
               onClick={handleToggleAllocations}
               sx={{
                  maxWidth: "150px",
                  backgroundColor: "#4F7C5A",
                  color: "white",

               }}
            >
               {showAllocations ? "Hide Allocated Resources" : "See Allocated Resources"}
            </Button>
         </Box>


         {/* Conditionally render AllocatedResourceList with animation */}
         <Collapse in={showAllocations}>
            <Stack spacing={3} mt={4}>
               <AllocatedResourceList projectId={projectId} />
            </Stack>
         </Collapse>
      </Container>
   );
};

export default ResourceAllocationPage;
