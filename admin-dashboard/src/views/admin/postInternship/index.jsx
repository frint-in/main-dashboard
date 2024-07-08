import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/card";
import axiosInstance from "../../../utils/axiosIntance";

const PostInternship = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("companyName", data.companyName);
    formData.append("deadline", data.deadline);
    formData.append("duration", data.duration);
    formData.append("stipend", data.stipend);
    formData.append("phono", data.phono);
    formData.append("location", data.location);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("experience", data.experience);
    formData.append("skills", data.skills);
    formData.append("position", data.position);
    formData.append("mode", data.mode);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}api/internship/addinternship`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        alert("successful");
      } else {
        alert("Invalid Credentials");
      }

      console.log("formData logs:");

      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
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
    }
  };

  const handleGenerateAI = async (data) => {
    try {
      const response = await axiosInstance.post(
        "https://frint-ai-ou22wujlaq-el.a.run.app/api/v1/llm/getDescription",
        {
          name: data.name,
          companyName: data.companyName,
          location: data.location,
          phono: data.phono,
          deadline: data.deadline,
          duration: data.duration,
          stipend: data.stipend,
          type: data.type,
          experience: data.experience,
          skills: data.skills,
          position: data.position,
          mode: data.mode,
        }
      );
      if (response.data) {
        setValue("description", response.data.description);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 2xl:grid-cols-11">
      <div className="col-span-10 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-span-10 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800"
        >
          <h5 className="my-4 text-3xl font-bold text-navy-700 dark:text-white">
            Internship Page
          </h5>



          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Title is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              placeholder="Eg: Digital Marketing Intern..."
              id="name"
              name="name"
              required
            />
            {errors.name && (
              <span className="text-red-600 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="companyName"
            >
              Company Name
            </label>
            <input
              type="text"
              {...register("companyName", {
                required: "Company Name is required",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              placeholder="Eg: Google"
              id="companyName"
              name="companyName"
              required
            />
            {errors.companyName && (
              <span className="text-red-600 text-sm">
                {errors.companyName.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              placeholder="Guwahati"
              id="location"
              name="location"
              required
            />
            {errors.location && (
              <span className="text-red-600 text-sm">
                {errors.location.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="deadline"
            >
              Deadline
            </label>
            <input
              type="text"
              {...register("deadline", { required: "Deadline is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              placeholder="01/01/1999"
              id="deadline"
              name="deadline"
              required
            />
            {errors.deadline && (
              <span className="text-red-600 text-sm">
                {errors.deadline.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="duration"
            >
              Duration
            </label>
            <input
              type="text"
              {...register("duration", { required: "Duration is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              placeholder="Eg: 6 Months"
              id="duration"
              name="duration"
              required
            />
            {errors.duration && (
              <span className="text-red-600 text-sm">
                {errors.duration.message}
              </span>
            )}
          </div>
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
              // onChange={handleImageChange}
              {...register("image", { required: "image is required" })}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
            {errors.image && (
              <span className="text-red-600 text-sm">
                {errors.image.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phono"
            >
              Phone Number
            </label>
            <input
              type="number"
              {...register("phono", { required: "Phone Number is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              placeholder="+91-**********"
              id="phono"
              name="phono"
              required
            />
            {errors.phono && (
              <span className="text-red-600 text-sm">
                {errors.phono.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Type
            </label>
            <input
              type="text"
              {...register("type", { required: "Type is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              placeholder=""
              id="type"
              name="type"
              required
            />
            {errors.type && (
              <span className="text-red-600 text-sm">
                {errors.type.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="stipend"
            >
              Stipend
            </label>
            <input
              type="text"
              {...register("stipend", { required: "Stipend is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              placeholder="1000/month"
              id="stipend"
              name="stipend"
              required
            />
            {errors.stipend && (
              <span className="text-red-600 text-sm">
                {errors.stipend.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mode"
            >
              Mode
            </label>
            <input
              type="text"
              {...register("mode", { required: "Mode is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              placeholder="online/offline"
              id="mode"
              name="mode"
              required
            />
            {errors.mode && (
              <span className="text-red-600 text-sm">
                {errors.mode.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="experience"
            >
              Experience
            </label>
            <input
              type="text"
              {...register("experience", {
                required: "Experience is required",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              placeholder="experience required"
              id="experience"
              name="experience"
              required
            />
            {errors.experience && (
              <span className="text-red-600 text-sm">
                {errors.experience.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="skills"
            >
              Skills
            </label>
            <input
              type="text"
              {...register("skills", { required: "Skills are required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              placeholder="Skills required"
              id="skills"
              name="skills"
              required
            />
            {errors.skills && (
              <span className="text-red-600 text-sm">
                {errors.skills.message}
              </span>
            )}
          </div>


          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="position"
            >
              Position
            </label>
            <input
              type="text"
              {...register("position", { required: "position are required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              placeholder="position required"
              id="position"
              name="position"
              required
            />
            {errors.position && (
              <span className="text-red-600 text-sm">
                {errors.position.message}
              </span>
            )}
          </div>



          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Type
            </label>
            <input
              type="text"
              {...register("type", { required: "type are required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              placeholder="onsite/remote"
              id="type"
              name="type"
              required
            />
            {errors.type && (
              <span className="text-red-600 text-sm">
                {errors.type.message}
              </span>
            )}
          </div>


          <div className="mb-4">
            <div className="flex justify-between">
              <label
                className="flex items-center text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Position <span style={{ color: "red" }}>*</span>
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
              {...register("description", { required: "description is required" })}
              rows={10}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </Card>
  );
};

export default PostInternship;
