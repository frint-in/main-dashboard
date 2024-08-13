import React, { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Admin from "./layouts/admin";
// import Auth from "./layouts/auth";
import Auth from "./views/auth/Auth";
import Signup from "./views/auth/Signup";
import SingleInternship from "./views/admin/singleInternship";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setAuthChecked, selectAuthChecked } from "./state/authSlice";
import VerifyEmailPage from "./views/verifyemail/page";
import Onboarding from "./views/onboarding/Onboarding";
import NewLogin from "./views/New Auth/NewLogin";
import NewSignup from "./views/New Auth/NewSignup";
import { selectUserDetails } from "./state/userSlice";

const App = () => {
  const isLoggedIn = useSelector(selectAuthChecked);

  const user = useSelector(selectUserDetails)

  

  // console.log("App render, isLoggedIn:", isLoggedIn);

  useEffect(() => {
    // console.log("App useEffect, isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
      <Route path="/onboarding" element={isLoggedIn ? (user.isOnboarded ? <Navigate to="/admin" replace /> : <Onboarding />) : <Navigate to="/new-login" replace />} />
       <Route path="/login" element={!isLoggedIn ? <Auth /> : <Navigate to="/admin" replace />} />
        <Route path="/sign-up" element={!isLoggedIn ? <Signup /> : <Navigate to="/admin" replace />} /> 
        <Route path="/verifyemail" element={<VerifyEmailPage />} />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              user.isOnboarded ? <Navigate to="/admin" replace /> : <Navigate to="/onboarding" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/*"
          element={
            isLoggedIn ? (
              user.isOnboarded ? <Admin /> : <Navigate to="/onboarding" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/new-login"
          element={!isLoggedIn ? <NewLogin /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/new-signup"
          element={!isLoggedIn ? <NewSignup /> : <Navigate to="/admin" replace />}
        />
      </Routes>
    </Router>
  );

  // return ( 
  //   <Router> 
  //     <Routes> 
  //       <Route path="/onboarding" element={<Onboarding /> }/> 
  //      <Route path="/login" element={!isLoggedIn ? <Auth /> : <Navigate to="/admin" replace />} /> 
  //       <Route path="/sign-up" element={!isLoggedIn ? <Signup /> : <Navigate to="/admin" replace />} />  
  //       <Route path="/verifyemail" element={<VerifyEmailPage />} /> 
  //       <Route 
  //         path="/" 
  //         element={ 
  //           isLoggedIn ? ( 
  //             <Navigate to="/admin" replace /> 
  //           ) : ( 
  //             <Navigate to="/new-login" replace /> 
  //           ) 
  //         } 
  //       /> 
  //       <Route 
  //         path="/admin/*" 
  //         element={ 
  //           isLoggedIn ? ( 
  //             <Admin /> 
  //           ) : ( 
  //             // <DelayedRedirect to="/login" delay={5000} /> 
  //             <Navigate to="/new-login" replace /> 
  //           ) 
  //         } 
  //       /> 
  //       <Route 
  //         path="/new-login" 
  //         element={!isLoggedIn ? <NewLogin /> : <Navigate to="/admin" replace />} 
  //       /> 
  //       <Route 
  //         path="/new-signup" 
  //         element={!isLoggedIn ? <NewSignup /> : <Navigate to="/admin" replace />} 
  //       /> 
  //     </Routes> 
  //   </Router> 
  // ); 







};

export default App;
