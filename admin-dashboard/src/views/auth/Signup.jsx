import InputField from "../../components/fields/InputField";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../../components/OAuth/Oauth";
import { Button } from "@/components/ui/button";


import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";

export default function Signup({ setIsAdminAuthenticated }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phono, setPhono] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
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


  const validateFields = () => {
    const validationErrors = {};

    if (!name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is not valid";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be more than 6 characters";
    } else if (!/[A-Z]/.test(password)) {
      validationErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(password)) {
      validationErrors.password = "Password must contain at least one number";
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      validationErrors.password = "Password must contain at least one special character";
    }

    if (!image) {
      validationErrors.image = "Profile image is required";
    }

    if (!phono.trim()) {
      validationErrors.phono = "Phone number is required";
    } else if (!/^\d{10}$/.test(phono)) {
      validationErrors.phono = "Phone number must be 10 digits";
    }

    if (!location.trim()) {
      validationErrors.location = "Location is required";
    }

    if (!description.trim()) {
      validationErrors.description = "Description is required";
    }

    return validationErrors;
  };

  const handleUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image);
      formData.append("phono", phono);
      formData.append("location", location);
      formData.append("description", description);

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_API_URL}api/company/signup`,
          formData,
          { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
        );
        if (res.data) {
          navigate("/auth");
          alert("Sign up successful");
        } else {
          alert("Invalid Credentials");
        }
      } catch (error) {
        alert(error.response.data.error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    if (!e.target.files[0]) {
      setErrors((prevErrors) => ({ ...prevErrors, image: "Profile image is required" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, image: undefined }));
    }
  };

  return (
    <div className="mt-1 mb-1 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign Up
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email, password, and upload an image to sign up!
        </p>

        <form onSubmit={handleUser}>
          <InputField
            extra="mb-3"
            label="Name*"
            placeholder="Company Name"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            required
          />
          <InputField
            extra="mb-3"
            label="Email*"
            placeholder="text@mail.com"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
          />
          <InputField
            extra="mb-3"
            label="Password*"
            placeholder="********"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
          />
          <div className="mb-3">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-white">
              Profile Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>
          <InputField
            extra="mb-3"
            label="Phone Number*"
            placeholder="+91-**********"
            id="phono"
            type="number"
            value={phono}
            onChange={(e) => setPhono(e.target.value)}
            error={errors.phono}
            required
          />
          <InputField
            extra="mb-3"
            label="Location*"
            placeholder="Guwahati"
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            error={errors.location}
            required
          />
          <InputField
            extra="mb-3"
            label="Description*"
            placeholder="A short description"
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description}
            required
          />
          <button
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          {/* <Oauth method="signinGoogle" links="/admin"/> */}
          <div className="mt-4">
            <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
              Already registered?
            </span>
            <Link
              to="/auth"
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Log in
            </Link>
          </div>
        </form>
        <Button
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            type="button"
            onClick={() => login()}
          >
            Sign in with Google 🚀
          </Button>
          <Button
          className="p-5 text-cyan-700 bg-white"
          onClick={async () => {
            googleLogout();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
