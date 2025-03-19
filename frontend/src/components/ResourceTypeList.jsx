import React, { useState, useEffect } from "react";
import { Grid2, Button, Typography, CircularProgress, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const CategoryList = () => {
   const navigate = useNavigate();
   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {
      const fetchCategories = async () => {
         try {
            const response = await api.get("/categories"); // Adjusted API endpoint
            if (response.data.length > 0) {
               setCategories(response.data);
            } else {
               setError("No categories found.");
            }
         } catch (err) {
            setError("Failed to load categories.");
            console.error("Error fetching categories:", err);
         } finally {
            setLoading(false);
         }
      };

      fetchCategories();
   }, []);

   const handleSelectCategory = (category) => {
      navigate(`/resource-types`, { state: { category } });
   };

   if (loading) {
      return (
         <Container sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <CircularProgress />
         </Container>
      );
   }

   if (error) {
      return <Typography color="error" align="center" sx={{ mt: 3 }}>{error}</Typography>;
   }

   return (
      <Container>
         <Typography variant="h5" align="center" gutterBottom>
            Select a Category
         </Typography>
         <Grid2 container spacing={3} justifyContent="center">
            {categories.map((category) => (
               <Grid2 item xs={12} sm={6} md={4} key={category.category}>
                  <Button
                     variant="contained"
                     fullWidth
                     sx={{ py: 2 }}
                     onClick={() => handleSelectCategory(category.category)}
                  >
                     {category.category}
                  </Button>
               </Grid2>
            ))}
         </Grid2>
      </Container>
   );
};

export default CategoryList;
