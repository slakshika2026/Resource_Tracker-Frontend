import React, { useState, useEffect } from "react";
import {
   Grid2,
   Button,
   Typography,
   CircularProgress,
   Container,
   Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import ResourceTypeList from "./ResourceTypeList"; // Import ResourceType component

const CategoryList = ({ projectId }) => {
   const navigate = useNavigate();
   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const [selectedCategory, setSelectedCategory] = useState(null); // State to hold selected category
   console.log("Project ID:", projectId); // Debugging log

   useEffect(() => {
      const fetchCategories = async () => {
         try {
            console.log("Fetching categories..."); // Debugging log

            const response = await api.get("/api/resources/categories");

            console.log("API Response:", response); // Log entire response

            if (response.status === 200 && response.data.length > 0) {
               setCategories(response.data);
            } else {
               setError("No categories found.");
            }
         } catch (err) {
            console.error("Error fetching categories:", err);
            setError(`Failed to load categories: ${err.message}`);
         } finally {
            setLoading(false);
         }
      };

      fetchCategories();
   }, []);

   const handleSelectCategory = (category) => {
      console.log("Selected category:", category); // Debugging log
      setSelectedCategory(category); // Set selected category
   };

   if (loading) {
      return (
         <Container sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <CircularProgress />
         </Container>
      );
   }

   if (error) {
      return (
         <Typography color="error" align="center" sx={{ mt: 3, color: "#333333" }}>
            {error}
         </Typography>
      );
   }

   return (
      <Container>
         <Typography variant="body1" align="center" gutterBottom sx={{ color: "#333333" }}>
            Select a Category
         </Typography>
         <Grid2 container spacing={3} justifyContent="center">
            {categories.map((category, index) => (
               <Grid2 item xs={12} sm={6} md={4} key={index}>
                  <Button
                     variant={selectedCategory === category.category ? "contained" : "outlined"} // Change variant based on selection
                     fullWidth
                     sx={{
                        py: 1,
                        borderColor: "#666666", // Dark Gray border
                        color: selectedCategory === category.category ? "#ffffff" : "#333333", // White text when selected, Dark Gray when not
                        backgroundColor: selectedCategory === category.category ? "#4F959D" : "transparent", // LinkedIn Blue background when selected
                        '&:hover': {
                           borderColor: "#888888", // Medium Gray border on hover
                           color: selectedCategory === category.category ? "#ffffff" : "#555555", // Darker text on hover
                          
                        },
                        fontWeight: "bold", // Bold text
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Small shadow
                        borderRadius: "8px", // Slightly rounded corners
                     }}
                     onClick={() => handleSelectCategory(category.category)}
                  >
                     {category.category}
                  </Button>
               </Grid2>
            ))}
         </Grid2>

         {/* Display ResourceType component if category is selected */}
         {selectedCategory && (
            <Stack spacing={3} mt={3}>
               <ResourceTypeList category={selectedCategory} projectId={projectId} />
            </Stack>
         )}
      </Container>
   );
};

export default CategoryList;
