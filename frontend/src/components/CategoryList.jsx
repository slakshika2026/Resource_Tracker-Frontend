// src/components/CategoryList.jsx
import React from "react";
import { Grid2, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CategoryList = ({ categories }) => {
   const navigate = useNavigate();

   const handleSelectCategory = (categoryId) => {
      navigate(`/resource-types`, { state: { categoryId } });
   };

   return (
      <Grid2 container spacing={3}>
         {categories.map((category) => (
            <Grid2 item xs={12} sm={6} md={4} key={category.id}>
               <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleSelectCategory(category.id)}
               >
                  {category.name}
               </Button>
            </Grid2>
         ))}
      </Grid2>
   );
};

export default CategoryList;
