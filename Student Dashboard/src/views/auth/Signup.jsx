import InputField from "../../components/fields/InputField";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


export default function Signup({setIsAdminAuthenticated}) {

  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phno, setphno] = useState('');
  const [uname, setUname] = useState('');


  const handleUser = async (e) => {
    
    e.preventDefault();

    try {
      const res = await axios.post('/api/auth/signup', { email, password, uname, phno },
      { withCredentials: true }

      );
      if (res.data) {
        console.log(res.data);
        navigate('/auth');
        // setIsAdminAuthenticated(true)
        // sessionStorage.setItem('token', res.data.token)
        alert('Sign in successfull')

      } else {
        alert('Invalid Credentials')
        console.log('invalid credentials');
      }
    } catch (error) {
      console.log(error);
      
    }
    
  }

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center" >
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white text-center">
          Sign Up
        </h4>
        {/* <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div> */}
        {/* <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div> */}
        {/* Email */}
        <form onSubmit={handleUser} >
        <InputField
          // variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <InputField
          // variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="********"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />

<InputField
          // variant="auth"
          extra="mb-3"
          label="Name*"
          placeholder=""
          id="uname"
          type="text"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
        />

        {/* Password */}
        <InputField
          // variant="auth"
          extra="mb-3"
          label="Phone number*"
          placeholder="********"
          id="phno"
          type="text"
          value={phno}
          onChange={(e) => setphno(e.target.value)} 
        />
        
        {/* Checkbox */}
        {/* <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Keep me logged In
            </p>
          </div>
          <a
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href=" "
          >
            Forgot Password?
          </a>
        </div> */}
        <p className="mb-9 ml-1 text-base text-gray-600 text-center">
          Already have an account? <Link to="/auth" className="text-brand-500"> Log in </Link> 
        </p>
        <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
         type="submit"
         >
          Sign In
        </button>
        </form>
        {/* <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <a
            href=" "
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </a>
        </div> */}
      </div>
    </div>
  );
}
