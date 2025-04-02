import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

function Layout({ children }) {
   return (
      <div>
         {/* <header>Global Header</header> */}
         <Navbar />
         <main><Outlet /></main>
         {/* <footer>Global Footer</footer> */}
      </div>
   );
}

export default Layout;
