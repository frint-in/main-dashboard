import InputField from "../../components/fields/InputField";
import { BsEnvelopeAt } from "react-icons/bs";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import Signup from "./Signup";
import Oauth from "../../components/OAuth/Oauth";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { setAuthChecked } from "@/state/authSlice";
import { setUserDetails } from "@/state/userSlice";

const NewLogin = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      if (res.data) {
        // localStorage.setItem('token', res.data.token);
        // localStorage.setItem("details", JSON.stringify(res.data.others));
        dispatch(setAuthChecked());
        dispatch(setUserDetails(res.data.others));

        // navigate('/admin');
        navigate("/admin", { replace: true });
        toast.success("Sign in successfull");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const statusCode = error.response.status;
        const message = error.response.data.message;

        if (statusCode === 401) {
          toast.warning(message || "Unauthorized access");
        } else if (statusCode === 409) {
          toast.error(message || " Incorrect email or password");
        } else {
          toast.error(message || "An error occurred");
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("Error in setting up the request");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-[sans-serif]">
      {/* <img className="absolute" src="/login.jpg" alt="" /> */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/login_screen1.png')] bg-cover">
        {/*shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] for the box shadow*/}
        <div className="items-center max-w-3xl max-md:max-w-lg w-full p-4 m-4 rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <form onSubmit={handleUser}>
              <div className="mb-12">
                <h3 className="text-gray-800 text-3xl font-extrabold">Login</h3>
                <p className="text-sm mt-4 text-gray-800">
                  Don't have an account{" "}
                  <Link
                    to="/new-signup"
                    className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                  >
                    Register here
                  </Link>
                </p>
              </div>

              <div>
                <label className="text-gray-800 text-xs block mb-2">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 rounded-md focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <BsEnvelopeAt className="w-[18px] h-[18px] absolute right-2 text-[#1e1e1e]" />
                </div>
              </div>

              <div className="mt-8">
                <label className="text-gray-800 text-xs block mb-2">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={isPasswordVisible ? "text" : "password"} // Toggle between text and password
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 rounded-md focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* Eye icon to toggle password visibility */}
                  <div
                    className="absolute right-2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <IoEyeOffOutline className="w-[18px] h-[18px] text-[#1e1e1e]" />
                    ) : (
                      <IoEyeOutline className="w-[18px] h-[18px] text-[#1e1e1e]" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <a
                    href="jajvascript:void(0);"
                    className="text-blue-600 font-semibold text-sm hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              <div className="mt-12 mb-2">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  disabled={loading}
                  // onClick={handleUser}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </div>
              <Oauth />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLogin;
