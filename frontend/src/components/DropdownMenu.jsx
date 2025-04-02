import React, { useState } from "react";
import { Menu, MenuItem, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const DropdownMenu = ({ username, handleLogout }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [openDialog, setOpenDialog] = useState(false); // State for opening the confirmation dialog

   // Function to handle the opening of the dropdown
   const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget); // Open the menu
   };

   // Function to handle the closing of the dropdown
   const handleMenuClose = () => {
      setAnchorEl(null); // Close the menu
   };

   // Function to open the confirmation dialog
   const handleLogoutClick = () => {
      setOpenDialog(true); // Open the confirmation dialog
      handleMenuClose(); // Close the menu when Logout is clicked
   };

   // Function to handle logout confirmation
   const handleConfirmLogout = () => {
      handleLogout(); // Perform the logout action
      setOpenDialog(false); // Close the dialog
   };

   // Function to cancel logout
   const handleCancelLogout = () => {
      setOpenDialog(false); // Close the dialog
   };

   return (
      <div>
         {/* Button that triggers the dropdown */}
         <Button
            color="inherit"
            onClick={username && username !== "Guest" ? handleMenuClick : null} // Only open the menu if the user is not "Guest"
            sx={{
               fontWeight: "bold",
               color: "#FFFFFF",
               borderBottom: "2px solid transparent",
               "&:hover": {
                  backgroundColor: "#205781",
               },
            }}
         >
            {username ? username : "Guest"} {/* Display username or "Guest" */}
         </Button>

         {/* Menu (Dropdown) only opens if the user is not a "Guest" */}
         {username && username !== "Guest" && (
            <Menu
               anchorEl={anchorEl} // The element to anchor the menu to (the button)
               open={Boolean(anchorEl)} // The menu is open if anchorEl is not null
               onClose={handleMenuClose} // Close the menu when clicked outside
            >
               <MenuItem onClick={handleLogoutClick}>Logout</MenuItem> {/* Trigger the confirmation dialog */}
            </Menu>
         )}

         {/* Confirmation Dialog */}
         <Dialog open={openDialog} onClose={handleCancelLogout}>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogContent>
               <p>Are you sure you want to logout?</p>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCancelLogout} color="primary">
                  Cancel
               </Button>
               <Button onClick={handleConfirmLogout} color="primary">
                  Logout
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
};

export default DropdownMenu;
