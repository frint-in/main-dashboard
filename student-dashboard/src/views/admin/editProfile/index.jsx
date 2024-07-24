import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/card";
import { selectUserDetails, setUserDetails } from "@/state/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { handleApiError, handleApiResponse } from "../../../utils/apiResponseHandler";
import axiosInstance from "@/utils/axiosIntance";

export default function EditProfile({ setIsAdminAuthenticated }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm();
  const [image, setImage] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const storedDetails = localStorage.getItem("details");
    if (userDetails) {
      // const details = JSON.parse(storedDetails);
      for (const key in userDetails) {
        setValue(key, userDetails[key]);
      }
    }
  }, [setValue]);
  
  const userDetails = useSelector(selectUserDetails);
  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();

    for (const key in data) {
      if (key !== "image" && key !== "resume" && data[key] !== "") {
        formData.append(key, data[key]);
      }
    }
    if (image) formData.append("profileImg", image);
    if (resume) formData.append("resume", resume);

    try {
      const res = await axiosInstance.put(
        `${import.meta.env.VITE_REACT_API_URL}api/user/updateuser`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.data) {
        handleApiResponse(res);
        dispatch(setUserDetails(res.data.user));

      }


    } catch (error) {
      // if (error.response.status === 401) {
      //   localStorage.removeItem("token");
      //   navigate("/login");
      // } else {
      //   alert("Access Token Error");
      // }
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  return (
    <Card className="grid h-full w-full my-4 grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      <form
        className="col-span-10 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className="my-4 text-4xl font-bold text-navy-700 dark:text-white">
          Edit Profile
        </h4>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uname">Name</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            placeholder="Company Name"
            id="uname"
            type="text"
            {...register("uname")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            placeholder="text@mail.com"
            id="email"
            type="text"
            {...register("email")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Profile Photo</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phno">Phone Number</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            placeholder="+91-**********"
            id="phno"
            type="text"
            {...register("phno")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Gender</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            placeholder=""
            id="gender"
            type="text"
            {...register("gender")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            placeholder="a short description"
            id="description"
            type="text"
            {...register("description")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialisation">Specialisation</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            placeholder=""
            id="specialisation"
            type="text"
            {...register("specialisation")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="education">Education</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            placeholder="education"
            id="education"
            type="text"
            {...register("education")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">Date of Birth</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            id="dob"
            name="dob"
            type="date"
            {...register("dob")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="languages">Languages</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            placeholder="languages"
            id="languages"
            type="text"
            {...register("languages")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skills">Skills</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
            placeholder="skills"
            id="skills"
            type="text"
            {...register("skills")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resume">Resume</label>
          <input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isSubmitting}
          >
            Update Profile
          </button>
        </div>
      </form>
    </Card>
  );
}
