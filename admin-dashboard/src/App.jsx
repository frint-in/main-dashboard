import React, {useState,useEffect, useMemo} from "react";
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
import Signup from "./views/auth/Signup";

const App = () => {

  // console.log(isAuth);


  const token = localStorage.getItem("token");
  console.log(token)
  const isAuth = useMemo(() => token, [token]);


  return (
    <Router>
      <Routes>
      <Route path="/auth" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route
          path="/"
          element={
            isAuth ? <Navigate to="/admin" replace /> : <Navigate to="/auth" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
