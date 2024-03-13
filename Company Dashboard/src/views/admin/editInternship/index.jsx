import React, { useState, useEffect } from "react";
import Card from "../../../components/card";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getIntershipById } from "../../../api/intership";

const EditInternship = () => {
  const { id } = useParams();

  const [internship, setInternship] = useState({
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
    mode: "",
  });

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await getIntershipById(id);
        setInternship(response);

  console.log("internship within useEffect>>>>>>>>", internship);

      } catch (error) {
        console.error(error);
      }
    };

    fetchInternship();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInternship((prevInternship) => ({
      ...prevInternship,
      [name]: value,
    }));
  };

  console.log("internship>>>>>>>>", internship);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `/api/internship/${id}`,
        internship,
        { withCredentials: true }
      );
      alert("Profile is saved");
    } catch (error) {
      console.error(error);
      alert("Oops! Something went wrong.");
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
          className="rounded pt-6 pb-8 mb-4 bg-white pl-3 dark:!bg-navy-800"
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
              value={internship?.name}
              onChange={handleChange}
            />
          </div>

          {/* Add the rest of your form fields here */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image <span style={{ color: "red" }}>*</span>
            </label>
            {/* Input for image */}
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
              // value={formData.description}
              // onChange={handleInputChange}
              value={internship?.description}
              onChange={handleChange}
              
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
              // value={formData.location}
              // onChange={handleInputChange}
              value={internship?.location}
              onChange={handleChange}
              
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
              // value={formData.phono}
              // onChange={handleInputChange}
              value={internship?.phono}
              onChange={handleChange}
              
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
              // value={formData.companyName}
              // onChange={handleInputChange}
              value={internship?.companyName}
              onChange={handleChange}
              
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
              // value={formData.deadline}
              // onChange={handleInputChange}
              value={internship?.deadline}
              onChange={handleChange}
              
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
              // value={formData.stipend}
              // onChange={handleInputChange}
              value={internship?.stipend}
              onChange={handleChange}
              
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
              // value={formData.type}
              // onChange={handleInputChange}
              value={internship?.type}
              onChange={handleChange}
              
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
              // value={formData.experience}
              // onChange={handleInputChange}
              value={internship?.experience}
              onChange={handleChange}
              
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
              // value={formData.skills}
              // onChange={handleInputChange}
              value={internship?.skills}
              onChange={handleChange}
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
              // value={formData.position}
              // onChange={handleInputChange}
              value={internship?.position}
              onChange={handleChange}
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
              // value={formData.mode}
              // onChange={handleInputChange}
              value={internship?.mode}
              onChange={handleChange}
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
