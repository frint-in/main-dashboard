import InputField from "../../components/fields/InputField";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Signup from "./Signup";


export default function SignIn({setIsAdminAuthenticated}) {

  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const handleUser = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_API_URL}api/company/signin`, { email, password },
      { withCredentials: true }

      );
      if (res.data) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem("details", JSON.stringify(res.data.others));
        navigate('/admin/default');
        alert('Sign in successfull')

      } else {
        alert('Invalid Credentials')
      }
    } catch (error) {
      alert(error.response.data.error)
      
    } finally {
      setLoading(false);
    }
    
  }

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center" >
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        
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
        
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          
          <a
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href=" "
          >
            Forgot Password?
          </a>
        </div>
        <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
         type="submit"
         disabled={loading}
         >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <Link to='/signup'
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </Link>
        </div>
        </form>
        
      </div>
    </div>
  );
}