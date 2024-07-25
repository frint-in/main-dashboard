import { handleApiError, handleApiResponse } from '@/utils/apiResponseHandler';
import { useGoogleLogin } from 'react-google-login';

const OauthLink = ({ user }) => {
  const { signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onSuccess: async (response) => {
      const { code } = response;

      try {
        const response = await axios.post('/api/linkGoogleAccount', {
            code,
            userId: user._id
          });

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
    onFailure: (error) => console.error('Google login failed:', error),
    responseType: 'code',
    accessType: 'offline',
    prompt: 'consent',
  });

  return (
    <div>
      {/* Other profile edit fields */}
      <button onClick={signIn}   className='flex items-center justify-center gap-2 py-2 linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'>Link Google Account</button>
    </div>
  );
};

export default OauthLink;
