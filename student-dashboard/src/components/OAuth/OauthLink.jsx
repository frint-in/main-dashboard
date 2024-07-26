import { setAuthChecked } from '@/state/authSlice';
import { selectUserDetails, setUserDetails } from '@/state/userSlice';
import { handleApiError, handleApiResponse } from '@/utils/apiResponseHandler';
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const OauthLink = ({ user }) => {
  const userDetails = useSelector(selectUserDetails)

  const dispatch = useDispatch()


  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_API_URL}api/auth/linkGoogleAccount`,
          { 
            code: codeResponse.code,
            scope: codeResponse.scope,
            userId: userDetails._id
          },
          { withCredentials: true }
        );

        // const message = res.data.message;
        // if (res.data) {
        //   handleApiResponse(res)
        //   // toast.success(message || "Sign up successful");
        // } else {
        //   toast.error(message || "Invalid credentials");
        // }
        dispatch(setAuthChecked());
        dispatch(setUserDetails(res.data.user));
        handleApiResponse(res)

      } catch (error) {
        console.error('Error:', error);
        handleApiError(error)
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar",
  });

  return (
    <div>
      {/* Other profile edit fields */}
      <button onClick={() => login()}   className='flex items-center justify-center gap-2 p-3 linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'>Link Google Account</button>
    </div>
  );
};

export default OauthLink;

// import React from 'react'

// const OauthLink = () => {
//   return (
//     <div>OauthLink</div>
//   )
// }

// export default OauthLink
