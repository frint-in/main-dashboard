import React, {useState,useEffect} from "react";
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
  const [isAuth, setIsAuth] = useState(null)

  console.log(isAuth);

  useEffect(() => {
    setIsAuth(localStorage.getItem("isAuth"))
  }, [])
  console.log(localStorage.getItem("isAuth"));
  return (
    <Router>
      <Routes>
        {/* <Route path="auth/" element={<Auth />} /> */}
        <Route path="/auth" element={isAuth ?<Navigate to="/admin" replace /> :<Auth />} />
        {/* <Route path="admin/*" element={isAuth ?<Admin />: <Navigate to="/auth" replace />} /> */}
        <Route path="admin/*" element={<Admin />} />
        {/* <Route path="admin/applicants" element={<PendingDashboard/>} />
        <Route path="admin/profile" element={<Profile/>} /> */}
        <Route path="/" element={isAuth ?<Navigate to="/admin" replace /> : <Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
