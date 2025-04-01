import React from "react";
import ResourceTimeline from "../components/ResourceTimeline";
// import api from '../api/api'; // Adjust the path based on your file structure
import Navbar from "../components/Navbar";


function Resource_Timeline_Display() {
   return (
      <div>
         <Navbar />
         <h1>Resource Allocation Tracker</h1>
         <ResourceTimeline />
      </div>
   );
}

export default Resource_Timeline_Display;
