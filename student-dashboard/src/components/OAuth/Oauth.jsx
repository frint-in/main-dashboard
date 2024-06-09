import React from 'react'
import { GrGoogle } from 'react-icons/gr'
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { app } from "../../firebase"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const auth = getAuth();

const Oauth = (props) => {
  const navigate = useNavigate();

  const handleClickGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultFromGoogle);
      // const res = await axios.post(`${import.meta.env.VITE_REACT_API_URL}api/auth/signupGoogle`, 
      const res = await axios.post(`${import.meta.env.VITE_REACT_API_URL}api/auth/${props.method}`,
      // const res = await axios.post(`https://api.frint.in/api/auth/${props.method}`,
        {
          email: resultFromGoogle.user.email,
          avatar: resultFromGoogle.user.photoURL,
          uname: resultFromGoogle.user.displayName,
          phno: resultFromGoogle.user.phoneNumber ? resultFromGoogle.user.phoneNumber : "",
        },
        { withCredentials: true }
      );
      if (res.data) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem("details", JSON.stringify(res.data.others));
        alert('Sign in successfull')
        navigate(`${props.links}`);

      } else {
        alert('Invalid Credentials')
      }

    } catch (error) {
      console.log(error.response.status)
      if (error.response.status === 409){
        alert("Account already exists")
      }
      console.error(error);
    }
  }

  return (
    <button type="button" className="mt-2 flex items-center justify-center gap-2 w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2" onClick={handleClickGoogle}>
      <GrGoogle className='w-6 h-6' />
      Continue with Google
    </button>
  )
}

export default Oauth
