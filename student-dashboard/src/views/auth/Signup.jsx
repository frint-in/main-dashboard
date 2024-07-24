import InputField from "../../components/fields/InputField";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Oauth from "../../components/OAuth/Oauth";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setAuthChecked } from "@/state/authSlice";


export default function Signup({ setIsAdminAuthenticated }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phno, setPhno] = useState("");
  const [uname, setUname] = useState("");
  const [errors, setErrors] = useState({});

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_API_URL}api/auth/google-create-token`,
          { code: codeResponse.code,
            scope: codeResponse.scope
           },
          { withCredentials: true }
        );

        const message = res.data.message;
        if (res.data) {
          dispatch(setAuthChecked())
          // navigate("/login");
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
        navigate("/login");
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
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white text-center">
          Sign Up
        </h4>
        <form onSubmit={handleUser}>
          <InputField
            extra="mb-3"
            label="Name*"
            placeholder="Full Name"
            id="uname"
            type="text"
            value={uname}
            onChange={handleUnameChange}
            error={errors.uname}
          />
          <InputField
            extra="mb-3"
            label="Phone number*"
            placeholder="+91 ..."
            id="phno"
            type="number"
            value={phno}
            onChange={handlePhnoChange}
            error={errors.phno}
          />
          <InputField
            extra="mb-3"
            label="Email*"
            placeholder="mail@example.com"
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
            error={errors.email}
          />
          <InputField
            extra="mb-3"
            label="Password*"
            placeholder="****"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            error={errors.password}
          />
          <p className="mb-9 ml-1 text-base text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-brand-500">
              {" "}
              Log in{" "}
            </Link>
          </p>
          <button
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            type="submit"
          >
            Register
          </button>
          {/* <Oauth method="signinGoogle" links="/admin"/> */}
          {/* <GoogleLogin
            type="standard"
            shape="circle"
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          /> */}
          {/* <button
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            type="button"
            onClick={() => login()}
          >
            Sign in with Google 🚀
          </button> */}

        </form>
            <Oauth/>
        <button
          className="p-5 text-cyan-700 bg-white"
          onClick={async () => {
            googleLogout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
