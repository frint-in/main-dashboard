import { handleApiError, handleApiResponse } from '@/utils/apiResponseHandler';
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';


const OauthLink = ({ user }) => {
  const signIn = useGoogleLogin({
    onSuccess: async (response) => {
      const { code } = response;

      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}api/auth/linkGoogleAccountCompany`, 
            {
              code,
            },{
              withCredentials: true,
            }
          );

          handleApiResponse(response)

          if (response.status === 200) {
            console.log('Google account linked successfully:', response.data.user);
          } else {
            console.error('Error linking Google account:', response.data.message);
          }
        } catch (err) {
          console.error('Error linking Google account:', err);
          handleApiError(err)
        }
    },
    onError: (err) => {
      console.log("Login Failed in oauth link admin", err);
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/meetings.space.created",
  });

  return (
    <div>
      {/* Other profile edit fields */}
      <button onClick={signIn}   className='flex items-center justify-center gap-2 py-2 linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'>Link Google Account</button>
    </div>
  );
};

export default OauthLink;
