import React, { useState } from "react";
import Card from "../../../components/card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosIntance";

const PostInternship = () => {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [duration, setDuration] = useState("");
  const [stipend, setStipend] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phono, setPhono] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [position, setPosition] = useState("");
  const [mode, setMode] = useState("");
  
  const navigate = useNavigate();

  const submitData = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("companyName", companyName);
    formData.append("deadline", deadline);
    formData.append("duration", duration);
    formData.append("stipend", stipend);
    formData.append("image", image);
    formData.append("phono", phono);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("experience", experience);
    formData.append("skills", skills);
    formData.append("position", position);
    formData.append("mode", mode);

    try {
      // console.log(formData);
      const res = await axiosInstance.post(
        `${import.meta.env.VITE_REACT_API_URL}api/internship/addinternship`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.data) {
        alert("successful");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      if (error.response.status === "401") {
        localStorage.removeItem("token");
      }
      alert(error.response.data.error);
      if (error.response.status === "401") {
        localStorage.removeItem("token");
        navigate("/auth");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleGenerateAI = async () => {
    try {
      const response = await axiosInstance.post(
        "https://frint-ai-ou22wujlaq-el.a.run.app/api/v1/llm/getDescription",
        {
          name: name,
          companyName: companyName,
          location: location,
          phono: phono,
          deadline: deadline,
          duration: duration,
          stipend: stipend,
          type: type,
          experience: experience,
          skills: skills,
          position: position,
          mode: mode,
        }
      );
      if (response.data) {
        // console.log(response.data.description);
        setDescription(response.data.description);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 2xl:grid-cols-11">
      <div className="col-span-10 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
        <form
          onSubmit={submitData}
          className="col-span-10 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800"
        >
          <h5 className=" my-4 text-3xl font-bold text-navy-700 dark:text-white">
            Internship Page
          </h5>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              // variant="auth"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              label="title*"
              placeholder="Eg: Digital Marketing Intern..."
              id="title"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="companyName"
            >
              Company Name
            </label>
            <input
              // variant="auth"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              label="companyName"
              placeholder="Eg: Google"
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
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
              placeholder="guwahati"
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="deadline"
            >
              Deadline
            </label>
            {/* Password */}
            <input
              // variant="auth"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              label="deadline*"
              placeholder="01/01/1999"
              id="deadline"
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="duration"
            >
              Duration
            </label>
            <input
              // variant="auth"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              label="duration*"
              placeholder="Eg: 6 Months"
              id="duration"
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          {/* Image upload */}
          <div className="mb-3">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Company Logo*
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
              label="phono"
              placeholder="+91-**********"
              id="phono"
              type="number"
              value={phono}
              onChange={(e) => setPhono(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Type
            </label>
            <input
              // variant="auth"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              label="type"
              placeholder=""
              id="type"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="stipend"
            >
              Stipend
            </label>
            <input
              // variant="auth"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              label="stipend*"
              placeholder="1000/month"
              id="stipend"
              type="text"
              value={stipend}
              onChange={(e) => setStipend(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mode"
            >
              Mode
            </label>
            <input
              // variant="auth"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              label="mode*"
              placeholder="online/offline"
              id="mode"
              type="text"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="experience"
            >
              Experience
            </label>
            <input
              // variant="auth"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              label="experience*"
              placeholder="oexperience required"
              id="experience"
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="skills"
            >
              Skills
            </label>
            <input
              // variant="auth"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              label="skills*"
              placeholder="required skills"
              id="skills"
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="position"
            >
              Position
            </label>
            <input
              // variant="auth"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              label="position*"
              placeholder="required position"
              id="position"
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <label
                className="flex items-center text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description <span style={{ color: "red" }}>*</span>
              </label>
              <div
                className="flex items-center gap-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
                onClick={handleGenerateAI}
              >
                ✨ Generate by AI
              </div>
            </div>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="description"
              name="description"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={10}
              required
            />
          </div>
          <button
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </Card>
  );
};

export default PostInternship;
