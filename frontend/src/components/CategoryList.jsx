// // src/components/CategoryList.jsx
// import React from "react";
// import { Grid2, Button, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const CategoryList = ({ categories }) => {
//    const navigate = useNavigate();

//    const handleSelectCategory = (categoryId) => {
//       navigate(`/resource-types`, { state: { categoryId } });
//    };

//    return (
//       <Grid2 container spacing={3}>
//          {categories.map((category) => (
//             <Grid2 item xs={12} sm={6} md={4} key={category.id}>
//                <Button
//                   variant="contained"
//                   fullWidth
//                   onClick={() => handleSelectCategory(category.id)}
//                >
//                   {category.name}
//                </Button>
//             </Grid2>
//          ))}
//       </Grid2>
//    );
// };

// export default CategoryList;


import React, { useState, useEffect } from "react";
import { Grid2, Button, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const CategoryList = () => {
   const navigate = useNavigate();
   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   // Fetch categories from the backend
   useEffect(() => {
      const fetchCategories = async () => {
         try {
            const response = await api.get("/api/resources/categories"); // Adjust the endpoint as per your backend
            setCategories(response.data);
         } catch (err) {
            setError("Failed to load categories.");
            console.error("Error fetching categories:", err);
         } finally {
            setLoading(false);
         }
      };

      fetchCategories();
   }, []);

   const handleSelectCategory = (categoryId) => {
      navigate(`/resource-types`, { state: { categoryId } });
   };

   if (loading) {
      return (
         <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <CircularProgress />
         </div>
      );
   }

   if (error) {
      return <Typography color="error" sx={{ textAlign: "center", mt: 3 }}>{error}</Typography>;
   }

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