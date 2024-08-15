import InputField from "../../components/fields/InputField";
import { BsEnvelopeAt } from "react-icons/bs";
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import Signup from "./Signup";
import Oauth from "../../components/OAuth/Oauth";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { setAuthChecked } from "@/state/authSlice";
import { setUserDetails } from "@/state/userSlice";

const NewSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phno, setPhno] = useState("");
  const [uname, setUname] = useState("");
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Handlers for input changes with validation
  const handleUnameChange = (e) => {
    setUname(e.target.value);
    if (!e.target.value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, uname: "Name is required" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, uname: undefined }));
    }
  };

  const handlePhnoChange = (e) => {
    setPhno(e.target.value);
    if (!e.target.value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phno: "Phone number is required",
      }));
    } else if (!/^\d{10}$/.test(e.target.value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phno: "Phone number must be 10 digits",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phno: undefined }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
    } else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is not valid",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: undefined }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!e.target.value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
    } else if (e.target.value.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters",
      }));
    } else if (!/[A-Z]/.test(e.target.value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must contain at least one uppercase letter",
      }));
    } else if (!/[0-9]/.test(e.target.value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must contain at least one number",
      }));
    } else if (!/[^A-Za-z0-9]/.test(e.target.value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must contain at least one special character",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: undefined }));
    }
  };

  // Handle form submission
  const handleUser = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    // Validate each field again on submission
    if (!uname.trim()) validationErrors.uname = "Name is required";
    if (!phno.trim()) {
      validationErrors.phno = "Phone number is required";
    } else if (!/^\d{10}$/.test(phno)) {
      validationErrors.phno = "Phone number must be 10 digits";
    }
    if (!email.trim()) validationErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      validationErrors.email = "Email is not valid";
    if (!password.trim()) validationErrors.password = "Password is required";
    else if (password.length < 6)
      validationErrors.password = "Password must be at least 6 characters";
    else if (!/[A-Z]/.test(password))
      validationErrors.password =
        "Password must contain at least one uppercase letter";
    else if (!/[0-9]/.test(password))
      validationErrors.password = "Password must contain at least one number";
    else if (!/[^A-Za-z0-9]/.test(password))
      validationErrors.password =
        "Password must contain at least one special character";

    // If there are validation errors, set them and stop the form submission
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // Data to be sent
    const dataToSend = { uname, phno, email, password };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}api/auth/signup`,
        dataToSend,
        { withCredentials: true }
      );

      const message = res.data.message;

      if (res.data) {
        navigate("/new-login");
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
  };

  return (
    <div className="font-[sans-serif]">
      {/* <img className="absolute" src="/login.jpg" alt="" /> */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/login_screen1.png')] bg-cover">
        {/*shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] for the box shadow*/}
        <div className="items-center gap-4 max-md:gap-8 max-w-3xl max-md:max-w-lg w-full p-4 m-4 rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <form onSubmit={handleUser}>
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">
                  Sign up
                </h3>
                <p className="text-sm mt-4 text-gray-800">
                  Already have and account{" "}
                  <Link
                    to="/new-login"
                    className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                  >
                    Login
                  </Link>
                </p>
              </div>
              <div>
                <label className="text-gray-800 text-xs block mb-2">Name</label>
                <div className="relative flex items-center">
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 rounded-md focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Full Name"
                    value={uname}
                    onChange={handleUnameChange}
                  />
                  <IoPersonOutline className="w-[18px] h-[18px] absolute right-2 text-[#1e1e1e]" />
                </div>
                <p className="text-red-500">{errors.uname}</p>
              </div>
              <div className="mt-4">
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
                    onChange={handleEmailChange}
                  />
                  <BsEnvelopeAt className="w-[18px] h-[18px] absolute right-2 text-[#1e1e1e]" />
                </div>
                <p className="text-red-500">{errors.email}</p>
              </div>
              <div className="mt-4">
                <label className="text-gray-800 text-xs block mb-2">
                  Phone Number
                </label>
                <div className="relative flex items-center">
                  <input
                    name="phone"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 rounded-md focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter Phone Number"
                    value={phno}
                    onChange={handlePhnoChange}
                  />
                  <MdOutlinePhoneEnabled className="w-[18px] h-[18px] absolute right-2 text-[#1e1e1e]" />
                </div>
                <p className="text-red-500">{errors.phno}</p>
              </div>

              <div className="mt-4">
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
                    onChange={handlePasswordChange}
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
                <p className="text-red-500">{errors.password}</p>
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
                    I hereby accept the{" "}
                    <Link
                      to="frint.in/terms-conditions"
                      className="text-blue-600 font-semibold text-sm hover:underline"
                    >
                      Terms & Conditions
                    </Link>
                  </label>
                </div>
              </div>

              <div className="mt-8 mb-2">
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

export default NewSignup;
