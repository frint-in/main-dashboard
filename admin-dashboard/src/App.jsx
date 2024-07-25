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
import { selectAuthChecked } from "./state/authSlice";
import { useSelector } from "react-redux";
import Meeting from "./components/create-meeting/Meeting";

const App = () => {

  // console.log(isAuth);


  // const token = localStorage.getItem("token");
  // const isAuth = useMemo(() => token, [token]);

  const isLoggedIn = useSelector(selectAuthChecked); 
 
  console.log('App render, isLoggedIn:', isLoggedIn); 


  return (
    <Router>
      <Routes>
      <Route path="/login" element={!isLoggedIn ? <Auth /> : <Navigate to="/admin" replace />} /> 
      <Route path="/create-meeting/:id" element={<Meeting />} />
        <Route path="/sign-up" element={!isLoggedIn ? <Signup /> : <Navigate to="/admin" replace />} /> 
        {/* <Route path="/verifyemail" element={<VerifyEmailPage />} />  */}
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/admin" replace /> : <Navigate to="/login" replace />} 
        /> 
        <Route 
  path="/admin/*" 
  element={ 
    isLoggedIn ? ( 
      <Admin /> 
    ) : ( 
      // <DelayedRedirect to="/login" delay={5000} /> 
      <Navigate to="/login" replace /> 
    ) 
  } 
        />
      </Routes>
    </Router>
  );
};

export default App;
