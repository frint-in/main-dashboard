import React from "react";
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
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  

  const isAuth = useSelector(selectAuthChecked);

  // console.log("isAuth>>>>>>>>>>>", isAuth);

  return (
    <Router>
      <Routes>
        {/* <Route path="auth/*" element={<Auth />} /> */}
        {/* <Route path="/auth" element={ <Auth /> } /> */}
        <Route path="/sign-up" element={<Signup />} />
        {/* <Route path='/single-internship/:id' element={<SingleInternship />} /> */}
        <Route path="admin/*" element={isAuth ? <Admin /> : <Navigate to="/"/> }/>
        <Route path="/" element={isAuth ? <Navigate to="/admin " replace /> : <Auth replace/>} />
    
      </Routes>
    </Router>
  );
};

export default App;
