

import React from 'react';
import { GrGoogle } from 'react-icons/gr';
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setAuthChecked } from "@/state/authSlice";
import { Toaster, toast } from 'sonner';
import axios from 'axios'; // Import axios for HTTP requests

import { useGoogleLogin } from "@react-oauth/google";

const Oauth = () => {
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_API_URL}api/auth/signingoogle`,
          { 
            code: codeResponse.code,
            scope: codeResponse.scope
          },
          { withCredentials: true }
        );

        const message = res.data.message;
        if (res.data) {
          dispatch(setAuthChecked());
          toast.success(message || "Sign up successful");
        } else {
          toast.error(message || "Invalid credentials");
        }
      } catch (error) {
        console.error('Error:', error);

        // Check if error.response exists before accessing its properties
        if (error.response) {
          console.error('response status>>>', error.response.status);
          console.error('response >>>', error.response);
          const message = error.response.data.message;
          toast.error(message || "An error occurred. Please try again.");
        } else {
          toast.error("An unexpected error occurred. Please try again later.");
        }
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/meetings.space.created",
  });

  return (
    <Button
      type="button"
      onClick={() => login()}
      className='flex items-center justify-center gap-2 py-2 linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'
    >
      <GrGoogle className='w-6 h-6' />
      Continue with Google
    </Button>
  );
};

export default Oauth;
