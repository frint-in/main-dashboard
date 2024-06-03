import React from "react";
import googleImage from "../assets/google.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GoogleSignIn = () => {
  const navigate = useNavigate();

  function googleLogo() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      if (result.user) {
        toast.success("User Logged In Successfully !!", {
          position: "top-center",
        });
        navigate("/home");
      }
    });
  }

  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div style={{ cursor: "pointer" }} onClick={googleLogo}>
        <img src={googleImage} width={"20%"} />
      </div>
    </div>
  );
};

export default GoogleSignIn;
