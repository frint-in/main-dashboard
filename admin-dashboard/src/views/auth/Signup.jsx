import InputField from "../../components/fields/InputField";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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




  const handleUser = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        alert("Sign in successful");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      alert(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="mt-1 mb-1 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign Up
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email, password, and upload an image to sign up!
        </p>

        <form onSubmit={handleUser}>
        <InputField
            // variant="auth"
            extra="mb-3"
            label="Name*"
            placeholder="Company Name"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <InputField
            // variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="text@mail.com"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            required
          />

          {/* Image upload */}
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
          </div>
          <InputField
            // variant="auth"
            extra="mb-3"
            label="Phone Number*"
            placeholder="+91-**********"
            id="phono"
            type="number"
            value={phono}
            onChange={(e) => setPhono(e.target.value)}
            required
          />
          <InputField
            // variant="auth"
            extra="mb-3"
            label="location*"
            placeholder="Guwahati"
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <InputField
            // variant="auth"
            extra="mb-3"
            label="description*"
            placeholder="a short description"
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* Checkbox */}
          {/* <div className="mb-4 flex items-center justify-between px-2">
            <a
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              href=" "
            >
              Forgot Password?
            </a>
          </div> */}
          <button
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <div className="mt-4">
            <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
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
      </div>
    </div>
  );
}
