import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./layouts/admin";
// import Auth from "./layouts/auth";
import Auth from "./views/auth/Auth"

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="auth/*" element={<Auth />} /> */}
        <Route path="/auth" element={<Auth />} />
        <Route path="admin/*" element={<Admin />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
