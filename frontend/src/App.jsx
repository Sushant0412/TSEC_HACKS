// src/App.jsx
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./UndertrialComponents/Dashboard";
import LawyerDashboard from "./lawyerComponents/components/Pages/LawyerDashboard.jsx";
import Home from "./lawyerComponents/components/Pages/Home.jsx";
import JudgeDashboard from "./lawyerComponents/components/Pages/JudgeDashboard.jsx";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/utp/*" element={<Dashboard />} />{" "}
          <Route path="/lawyer/*" element={<LawyerDashboard />} />{" "}
          <Route path="/judge/*" element={<JudgeDashboard />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
