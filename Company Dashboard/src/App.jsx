import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Admin from "./layouts/admin";
// import Auth from "./layouts/auth";
import PendingDashboard from "./views/admin/Orders_sidebar/Pending_sidebar";
import Profile from "./views/admin/profile";
import Auth from "./views/auth/Auth";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="auth/*" element={<Auth />} /> */}
        <Route path="/auth" element={<Auth />} />
        <Route path="admin/*" element={<Admin />} />
        {/* <Route path="admin/applicants" element={<PendingDashboard/>} />
        <Route path="admin/profile" element={<Profile/>} /> */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
