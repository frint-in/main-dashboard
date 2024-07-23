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
import Meeting from "./components/create-meeting/Meeting";

const App = () => {

  
  
  const token = localStorage.getItem("token");
  const isAuth = useMemo(() => token, [token]);
  
  console.log(isAuth);

  return (
    <Router>
      <Routes>
      <Route path="/login" element={isAuth ? (<Navigate to="/"/>) : (<Auth/>)} />
        {/* <Route path="/auth" element={<Auth />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-meeting/:id" element={<Meeting />} />
        <Route path="/admin/*" element={isAuth ? (<Navigate to="/"/>) : (<Admin/>)} />
        <Route
          path="/"
          element={
            isAuth ? <Navigate to="/admin" replace /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
