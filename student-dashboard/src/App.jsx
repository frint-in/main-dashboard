import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./layouts/admin";
// import Auth from "./layouts/auth";
import Auth from "./views/auth/Auth"
import Signup from "./views/auth/Signup";
import SingleInternship from "./views/admin/singleInternship";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'; 

import { setAuthChecked, selectAuthChecked } from "./state/authSlice";


const App = () => {
  // const token = localStorage.getItem("token");
  // const isAuth = useMemo(() => token, [token]);



  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuth(!!localStorage.getItem("token"));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
                                                                                                                                          
  // console.log("isAuth>>>>>>>>>>>", isAuth);

  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Auth />} />
        <Route path="/sign-up" element={<Signup />} />
        {/* <Route path='/single-internship/:id' element={<SingleInternship />} /> */}
        <Route path="/admin/*" element={<Admin />}/>
        <Route path="/" element={
            isAuth ? <Navigate to="/admin" replace /> : <Navigate to="/login" replace />
          } />
    
      </Routes>
    </Router>
  );
};

export default App;
