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
import NewLogin from "./views/New Auth/NewLogin";
import NewSignup from "./views/New Auth/NewSignup";

const App = () => {
  const isLoggedIn = useSelector(selectAuthChecked);

  // console.log("App render, isLoggedIn:", isLoggedIn);

  useEffect(() => {
    // console.log("App useEffect, isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        {/* <Route
          path="/login"
          element={!isLoggedIn ? <Auth /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/sign-up"
          element={!isLoggedIn ? <Signup /> : <Navigate to="/admin" replace />}
        /> */}
        <Route path="/verifyemail" element={<VerifyEmailPage />} />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/new-login" replace />
            )
          }
        />
        <Route
          path="/admin/*"
          element={
            isLoggedIn ? (
              <Admin />
            ) : (
              // <DelayedRedirect to="/login" delay={5000} />
              <Navigate to="/new-login" replace />
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
};

export default App;
