import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../../components/card";
// import input from "../../../components/fields/input";

export default function EditProfile({ setIsAdminAuthenticated }) {
  const navigate = useNavigate();
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phno, setPhno] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState([]);
  // const [catagories, setCatagories] = useState([]);
  const [specialisation, setSpecialisation] = useState("");
  const [education, setEducation] = useState("");
  const [dob, setDob] = useState("");
  const [languages, setLanguages] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const storedDetails = localStorage.getItem("details");
    if (storedDetails) {
      const details = JSON.parse(storedDetails);
      setDetails(details);
      setUname(details.uname || ""); // Set default value to empty string if field is undefined
      setEmail(details.email || "");
      setPhno(details.phno || "");
      setGender(details.gender || "");
      setDescription(details.description || "");
      setSpecialisation(details.specialisation || "");
      // setCatagories(details.catagories || []);
      setSpecialisation(details.specialisation || "");
      setEducation(details.education || "");
      setDob(details.dob || "");
      setLanguages(details.languages || "");
      setSkills(details.skills || "");
      // setResume(details.resume || null)
    }
  }, []);

  const handleUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", uname);
    formData.append("email", email);
    formData.append("image", image);
    formData.append("phono", phno);
    formData.append("gender", gender);
    formData.append("description", description);
    // formData.append("catagories", catagories);
    formData.append("specialisation", specialisation);
    formData.append("education", education);
    formData.append("dob", dob);
    formData.append("languages", languages);
    formData.append("skills", skills);
    formData.append("resume", resume);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_API_URL}api/user/updateuser`,
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
        navigate("/login");
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
          Edit Profile
        </h4>
        {/* <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email, password, and upload an image to sign up!
        </p> */}
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
            value={uname}
            onChange={(e) => setUname(e.target.value)}
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
            Profile Photo
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
            type="text"
            value={phno}
            onChange={(e) => setPhno(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Gender
          </label>
          <input
            // variant="auth"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            label="Gender*"
            placeholder=""
            id="gender"
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
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
            Specialisation
          </label>
          <input
            // variant="auth"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            label="specialisation*"
            placeholder=""
            id="specialisation"
            type="text"
            value={specialisation}
            onChange={(e) => setSpecialisation(e.target.value)}
          />
        </div>
        {/* <div className="mb-4">
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
        </div> */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="catagories"
          >
            Education
          </label>
          <input
            // variant="auth"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            label="education*"
            placeholder="education"
            id="education"
            type="text"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="catagories"
          >
            Date of Birth
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            id="dob"
            name="dob"
            type="date"
            onChange={(e) => setDob(e.target.value)}
            value={dob}
            placeholder="Date of Birth"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="catagories"
          >
            Languages
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            id="languages"
            name="languages"
            type="text"
            onChange={(e) => setLanguages(e.target.value)}
            value={languages}
            placeholder="languages"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="catagories"
          >
            Skills
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            id="skills"
            name="skills"
            type="text"
            onChange={(e) => setSkills(e.target.value)}
            value={skills}
            placeholder="skills"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="catagories"
          >
            Resume
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            id="resume"
            name="resume"
            type="file"
            onChange={(e) => setResume(e.target.value)}
            value={resume}
            accept=".pdf"
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
