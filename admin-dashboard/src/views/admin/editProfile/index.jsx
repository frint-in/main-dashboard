import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../../components/card";
import axiosInstance from "../../../utils/axiosIntance";
// import input from "../../../components/fields/input";

export default function EditProfile({ setIsAdminAuthenticated }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phono, setPhono] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState([]);
  const [catagories, setCatagories] = useState([]);
  const [website, setWebsite] = useState([]);

  useEffect(() => {
    const storedDetails = localStorage.getItem("details");
    if (storedDetails) {
      const details = JSON.parse(storedDetails);
      setDetails(details);
      // console.log(details);
      setName(details.name);
      setEmail(details.email);
      setPhono(details.phono);
      setLocation(details.location);
      setDescription(details.description);
      setWebsite(details.website);
      setCatagories(details.catagories);
    }
  }, []);

  const handleUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", image);
    formData.append("phono", phono);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("catagories", catagories);
    formData.append("website", website);

    try {
      const res = await axiosInstancence.put(
        `${import.meta.env.VITE_REACT_API_URL}api/company/updatecompany`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.data) {
        alert("Profile Updated")
      }
    } catch (error) {
      if (error.response.status === "401") {
        localStorage.removeItem("token");
      }
      alert(error.response.data.error);
      if (error.response.status === "401") {
        navigate("/auth");
      } else {
        alert("Access Token Error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Card className="grid h-full w-full my-4 grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      <form
        className="col-span-10 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800"
        onSubmit={handleUser}
      >
        <h4 className=" my-4 text-4xl font-bold text-navy-700 dark:text-white">
          Edit Company Profile
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email, password, and upload an image to sign up!
        </p>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            // variant="auth"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            label="name*"
            placeholder="Company Name"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            // variant="auth"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            label="Email*"
            placeholder="text@mail.com"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Password */}
        {/* <input
            // variant="auth"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            label="Password*"
            placeholder="********"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /> */}

        {/* Image upload */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Company Logo
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phono"
          >
            Phone Number
          </label>
          <input
            // variant="auth"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            label="phono*"
            placeholder="+91-**********"
            id="phono"
            type="number"
            value={phono}
            onChange={(e) => setPhono(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            // variant="auth"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            label="location*"
            placeholder="Guwahati"
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            // variant="auth"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            label="description*"
            placeholder="a short description"
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="website"
          >
            Website link
          </label>
          <input
            // variant="auth"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            label="website*"
            placeholder="www.something.com"
            id="website"
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="catagories"
          >
            Categories
          </label>
          <input
            // variant="auth"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            label="catagories*"
            placeholder="Category"
            id="catagories"
            type="text"
            value={catagories}
            onChange={(e) => setCatagories(e.target.value.split(","))}
          />
        </div>

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
          {loading ? "Saving..." : "Save"}
        </button>
        {/* <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Already registered?
          </span>
          <Link
            to="/auth"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Log in
          </Link>
        </div> */}
      </form>
    </Card>
  );
}
