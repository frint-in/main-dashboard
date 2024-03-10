

import React, { useState } from "react";
import Card from "../../../components/card";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getIntershipById } from "../../../api/intership";


const EditInternship = () => {

  const {id} = useParams();

  const {
    isLoading,
    isError,
    data: intership,
    error,
  } = useQuery({
    queryKey: ["intership", id], 
    queryFn: () => getIntershipById(id), 
  });


  console.log('intership>>>>>>>>>>>',intership );

  const [formData, setFormData] = useState({
    name: "",
    image: null,
    description: "",
    location: "",
    phono: "",
    companyName: "",
    deadline: "",
    stipend: "",
    type: "",
    experience: "",
    skills: "",
    position: "",
    mode: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { image, ...restFormData } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append("image", image);
    Object.entries(restFormData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    console.log("form data", formDataToSend);

    try {
      const response = await axios.put(
        `http://localhost:8000/api/internship/${id}`,
        formDataToSend,
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 2xl:grid-cols-11">
      <div className="col-span-10 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
        <h5 className="text-left text-xl font-bold leading-9 text-navy-700 dark:text-white">
          Internship Page
        </h5>
        <form
          onSubmit={handleSubmit}
          className="rounded pt-6 pb-8 mb-4 bg-white pl-3 dark:!bg-navy-800 "
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Title <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="name"
              name="name"
              type="text"
              placeholder="Title"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image <span style={{ color: "red" }}>*</span>
            </label>
            <input type="file" onChange={handleImageChange} />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="description"
              name="description"
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Location <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="location"
              name="location"
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phono"
            >
              Phone Number <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="phono"
              name="phono"
              type="text"
              placeholder="Phone Number"
              value={formData.phono}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="companyName"
            >
              Company Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="deadline"
            >
              Deadline <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="deadline"
              name="deadline"
              type="text"
              placeholder="Deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="stipend"
            >
              Stipend <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="stipend"
              name="stipend"
              type="text"
              placeholder="Stipend"
              value={formData.stipend}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Type <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="type"
              name="type"
              type="text"
              placeholder="Type"
              value={formData.type}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="experience"
            >
              Experience <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="experience"
              name="experience"
              type="text"
              placeholder="Experience"
              value={formData.experience}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="skills"
            >
              Skills <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="skills"
              name="skills"
              type="text"
              placeholder="Skills"
              value={formData.skills}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="position"
            >
              Position <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="position"
              name="position"
              type="text"
              placeholder="Position"
              value={formData.position}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mode"
            >
              Mode <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="mode"
              name="mode"
              type="text"
              placeholder="Mode"
              value={formData.mode}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </Card>
  );
};

export default EditInternship;
