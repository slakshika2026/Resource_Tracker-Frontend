import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/GlobalLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddProject from "./pages/AddProject";
import Resource_Timeline_Display from "./pages/ResourceTimelineDisplay";
import AddResourceItem from "./pages/AddResourceItem";
import ViewAllResources from './pages/ViewAllResources';


function App() {
  return (
    <Router>

      <Routes>
        //Routes without layout
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        //Routes with layout
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/allocation-history" element={<Resource_Timeline_Display />} />
          <Route path="/add-resource-item" element={<AddResourceItem />} />
          <Route path="/view-all-resources" element={<ViewAllResources />} />
        </Route>
      </Routes>

    </Router>
  );
}

export default App;
