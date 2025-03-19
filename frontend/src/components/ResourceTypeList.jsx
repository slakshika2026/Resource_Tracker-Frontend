// src/components/ResourceTypeList.jsx
import React, { useEffect, useState } from "react";
import { Grid2, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResourceTypeList = () => {
   const navigate = useNavigate();
   const [resourceTypes, setResourceTypes] = useState([]);

   useEffect(() => {
      // Fetch all resource types
      const fetchResourceTypes = async () => {
         try {
            const response = await axios.get('/api/resources/categories');
            setResourceTypes(response.data);  // Assuming the API returns an array of categories with resource types
         } catch (error) {
            console.error("Error fetching resource types:", error);
         }
      };

      fetchResourceTypes();
   }, []);

   const handleSelectResourceType = (category) => {
      navigate(`/resources/categories/${category}/resource-types`);  // Navigating based on category
   };

   return (
      <Grid2 container spacing={3}>
         {resourceTypes.map((category) => (
            <Grid2 item xs={12} sm={6} md={4} key={category.category}>
               <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleSelectResourceType(category.category)}
               >
                  <Typography variant="h6">{category.category}</Typography> {/* Displaying category name */}
               </Button>
            </Grid2>
         ))}
      </Grid2>
   );
};

export default ResourceTypeList;
