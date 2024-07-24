import React, { useState, useEffect } from "react";
import Card from "../../../components/card";
import { useParams, useNavigate } from "react-router-dom";
import { getIntershipById } from "../../../api/intership";
import axiosInstance from "../../../utils/axiosIntance";
import { deleteAuthChecked } from "@/state/authSlice";
import { useDispatch } from "react-redux";

const EditInternship = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [internshipData, setInternshipData] = useState({
    name: "",
    companyName: "",
    deadline: "",
    duration: "",
    stipend: "",
    image: null,
    phono: "",
    location: "",
    description: "",
    type: "",
    experience: "",
    skills: "",
    position: "",
    mode: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await getIntershipById(id);
        setInternshipData({ ...response, image: null });
      } catch (error) {
        console.error(error);
      }
    };
    fetchInternship();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInternshipData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setInternshipData((prevData) => ({
      ...prevData,
      image: e.target.files[0]
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
    const fields = [
      'name', 'companyName', 'deadline', 'duration', 'stipend', 'phono', 
      'location', 'description', 'type', 'experience', 'skills', 
      'position', 'mode'
    ];
  
    fields.forEach((field) => {
      formData.append(field, internshipData[field]);
    });
  
    if (internshipData.image) {
      formData.append('image', internshipData.image);
    }
  
    try {
      const res = await axiosInstance.put(
        `${import.meta.env.VITE_REACT_API_URL}api/internship/updateinternship/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.data) {
        alert("Successful");
      } else {
        alert("Invalid Credentials");
      }

      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(deleteAuthChecked())
      } else {
        alert("Access Token Error");
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (e) => {
    e.preventDefault();
    try {

      const response = await axiosInstance.delete(
        `${import.meta.env.VITE_REACT_API_URL}api/internship/deleteinternship/${id}`,
        { withCredentials: true }
      );
      if(response.status == 200){
        alert("Internship Deleted Successfully");
        navigate('/admin/internships')
      }
    } catch (error) {
      alert("Oops! Something went wrong.");
    }
  };

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 2xl:grid-cols-11">
      <div className="col-span-10 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
        <form onSubmit={handleSubmit} className="col-span-10 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
          <h5 className="my-4 text-3xl font-bold text-navy-700 dark:text-white">
            Internship Page
          </h5>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Title</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800" placeholder="Eg: Digital Marketing Intern..." id="name" type="text" name="name" value={internshipData.name} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">Company Name</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800" placeholder="Company Name" id="companyName" type="text" name="companyName" value={internshipData.companyName} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deadline">Deadline</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800" placeholder="Deadline" id="deadline" type="date" name="deadline" value={internshipData.deadline} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">Duration</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800" placeholder="Duration" id="duration" type="text" name="duration" value={internshipData.duration} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stipend">Stipend</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800" placeholder="Stipend" id="stipend" type="text" name="stipend" value={internshipData.stipend} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phono">Phone Number</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800" placeholder="Phone Number" id="phono" type="text" name="phono" value={internshipData.phono} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800" placeholder="Location" id="location" type="text" name="location" value={internshipData.location} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800" placeholder="Description" id="description" name="description" value={internshipData.description} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">Type</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800" placeholder="Type" id="type" type="text" name="type" value={internshipData.type} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">Experience</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800" placeholder="Experience" id="experience" type="text" name="experience" value={internshipData.experience} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skills">Skills</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800" placeholder="Skills" id="skills" type="text" name="skills" value={internshipData.skills} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">Position</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800" placeholder="Position" id="position" type="text" name="position" value={internshipData.position} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mode">Mode</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800" placeholder="Mode" id="mode" type="text" name="mode" value={internshipData.mode} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800" id="image" type="file" name="image" accept="image/*" onChange={handleImageChange} />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Update Internship"}
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleDelete}>
              Delete Internship
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default EditInternship;
