import React from "react";
import { GrGoogle } from "react-icons/gr";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Oauth = () => {
  const navigate = useNavigate()

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_API_URL}api/auth/signingoogle`,
          { code: codeResponse.code, scope: codeResponse.scope },
          { withCredentials: true }
        );

        const message = res.data.message;
        if (res.data) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("details", JSON.stringify(res.data.user));
          navigate("/admin/default");
          toast.success(message || "Sign up successful");
        } else {
          toast.error(message || "Invalid credentials");
        }
      } catch (error) {
        const statusCode = error.response.status;
        const message = error.response.data.message;
        console.error(error);
        toast.error(message || "An error occurred. Please try again.");
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
    flow: "auth-code",
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar",
  });

  return (
    <Button
      className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
      type="button"
      onClick={() => login()}
    >
      <GrGoogle className="mx-2" /> Sign In With Google
    </Button>
  );
};

export default Oauth;
