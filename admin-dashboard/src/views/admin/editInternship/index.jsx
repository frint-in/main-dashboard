// import React, { useState, useEffect } from "react";
// import Card from "../../../components/card";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { getIntershipById } from "../../../api/intership";
// import axiosInstance from "../../../utils/axiosIntance";

// const EditInternship = () => {
//   const { id } = useParams();

//   const [name, setName] = useState("");
//   const [companyName, setCompanyName] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [duration, setDuration] = useState("");
//   const [stipend, setStipend] = useState("");
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [phono, setPhono] = useState("");
//   const [location, setLocation] = useState("");
//   const [description, setDescription] = useState("");
//   const [type, setType] = useState("");
//   const [experience, setExperience] = useState("");
//   const [skills, setSkills] = useState("");
//   const [position, setPosition] = useState("");
//   const [mode, setMode] = useState("");

//   useEffect(() => {
//     const fetchInternship = async () => {
//       try {
//         const response = await getIntershipById(id);

//         console.log(response);


//         setName(response.name)
//         setCompanyName(response.companyName)
//         setDeadline(response.deadline)
//         setDuration(response.duration)
//         setStipend(response.stipend)
//         setImage(response.imgurl)
//         setPhono(response.phono)
//         setLocation(response.location)
//         setDescription(response.description)
//         setType(response.type)
//         setExperience(response.experience)
//         setSkills(response.skills)
//         setPosition(response.position)
//         setMode(response.mode)

//         // console.log("internship within useEffect>>>>>>>>", internship);
//       } catch (error) {
//         // console.error(error);
//       }
//     };

//     fetchInternship();

//     console.log('image', image);
//   }, [id]);

//   console.log('image outside of useEffect', image);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInternship((prevInternship) => ({
//       ...prevInternship,
//       [name]: value,
//     }));
//   };

//   // console.log("internship>>>>>>>>", internship);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axiosInstance.put(
//         `${
//           import.meta.env.VITE_REACT_API_URL
//         }api/internship/updateinternship/${id}`,
//         internship,
//         { withCredentials: true }
//       );
//       alert("Profile is saved");
//     } catch (error) {
//       if (error.response.status === "401") {
//         localStorage.removeItem("token");
//       }
//       alert(error.response.data.error);
//       if (error.response.status === "401") {
//         navigate("/auth");
//       } else {
//         alert("Access Token Error");
//       }
//     }
//   };



//   const submitData = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("companyName", companyName);
//     formData.append("deadline", deadline);
//     formData.append("duration", duration);
//     formData.append("stipend", stipend);
//     formData.append("image", image);
//     formData.append("phono", phono);
//     formData.append("location", location);
//     formData.append("description", description);
//     formData.append("type", type);
//     formData.append("experience", experience);
//     formData.append("skills", skills);
//     formData.append("position", position);
//     formData.append("mode", mode);

//     try {
//       // console.log(formData);
//       const res = await axiosInstance.put(
//         `${import.meta.env.VITE_REACT_API_URL}api/internship/updateinternship/${id}`,
//         formData,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       if (res.data) {
//         alert("successful");
//       } else {
//         alert("Invalid Credentials");
//       }
//     } catch (error) {
//       if (error.response.status === "401") {
//         localStorage.removeItem("token");
//       }
//       alert(error.response.data.error);
//       if (error.response.status === "401") {
//         localStorage.removeItem("token");
//         navigate("/auth");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleDelete = async (e) => {
//     e.preventDefault();
//     try {
//       await axiosInstance.delete(
//         `${
//           import.meta.env.VITE_REACT_API_URL
//         }api/internship/deleteinternship/${id}`,
//         internship,
//         { withCredentials: true }
//       );
//       alert("Internship Deleted Successfully");
//     } catch (error) {
//       alert("Oops! Something went wrong.");
//     }
//   };


//   return (
//     <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 2xl:grid-cols-11">
//       <div className="col-span-10 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
//         <form
//           onSubmit={submitData}
//           className="col-span-10 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800"
//         >
//           <h5 className=" my-4 text-3xl font-bold text-navy-700 dark:text-white">
//             Internship Page
//           </h5>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="title"
//             >
//               Title
//             </label>
//             <input
//               // variant="auth"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
//               label="title*"
//               placeholder="Eg: Digital Marketing Intern..."
//               id="title"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
              
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="companyName"
//             >
//               Company Name
//             </label>
//             <input
//               // variant="auth"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
//               label="companyName"
//               placeholder="Eg: Google"
//               id="companyName"
//               type="text"
//               value={companyName}
//               onChange={(e) => setCompanyName(e.target.value)}
              
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="location"
//             >
//               Location
//             </label>
//             <input
//               // variant="auth"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
//               label="location*"
//               placeholder="guwahati"
//               id="location"
//               type="text"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
              
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="deadline"
//             >
//               Deadline
//             </label>
//             {/* Password */}
//             <input
//               // variant="auth"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
//               label="deadline*"
//               placeholder="01/01/1999"
//               id="deadline"
//               type="text"
//               value={deadline}
//               onChange={(e) => setDeadline(e.target.value)}
              
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="duration"
//             >
//               Duration
//             </label>
//             <input
//               // variant="auth"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
//               label="duration*"
//               placeholder="Eg: 6 Months"
//               id="duration"
//               type="text"
//               value={duration}
//               onChange={(e) => setDuration(e.target.value)}
              
//             />
//           </div>
//           {/* Image upload */}

//             <div className="size-3/12"><img src={image} alt="" srcset="" /></div>
          
//           <div className="mb-3">
//             <label
//               htmlFor="image"
//               className="block text-sm font-medium text-gray-700 dark:text-white"
//             >
//               Company Logo*
//             </label>
//             <input
//               id="image"
//               name="image"
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="phono"
//             >
//               Phone Number
//             </label>
//             <input
//               // variant="auth"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
//               label="phono"
//               placeholder="+91-**********"
//               id="phono"
//               type="number"
//               value={phono}
//               onChange={(e) => setPhono(e.target.value)}
              
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="type"
//             >
//               Type
//             </label>
//             <input
//               // variant="auth"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
//               label="type"
//               placeholder=""
//               id="type"
//               type="text"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
              
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="stipend"
//             >
//               Stipend
//             </label>
//             <input
//               // variant="auth"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
//               label="stipend*"
//               placeholder="1000/month"
//               id="stipend"
//               type="text"
//               value={stipend}
//               onChange={(e) => setStipend(e.target.value)}
              
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="mode"
//             >
//               Mode
//             </label>
//             <input
//               // variant="auth"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
//               label="mode*"
//               placeholder="online/offline"
//               id="mode"
//               type="text"
//               value={mode}
//               onChange={(e) => setMode(e.target.value)}
              
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="experience"
//             >
//               Experience
//             </label>
//             <input
//               // variant="auth"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
//               label="experience*"
//               placeholder="oexperience "
//               id="experience"
//               type="text"
//               value={experience}
//               onChange={(e) => setExperience(e.target.value)}
              
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="skills"
//             >
//               Skills
//             </label>
//             <input
//               // variant="auth"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
//               label="skills*"
//               placeholder=" skills"
//               id="skills"
//               type="text"
//               value={skills}
//               onChange={(e) => setSkills(e.target.value)}
              
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="position"
//             >
//               Position
//             </label>
//             <input
//               // variant="auth"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
//               label="position*"
//               placeholder=" position"
//               id="position"
//               type="text"
//               value={position}
//               onChange={(e) => setPosition(e.target.value)}
              
//             />
//           </div>
//           <div className="mb-4">
//             <div className="flex justify-between">
//               <label
//                 className="flex items-center text-gray-700 text-sm font-bold mb-2"
//                 htmlFor="description"
//               >
//                 Description <span style={{ color: "red" }}>*</span>
//               </label>
//             </div>
//             <textarea
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
//               id="description"
//               name="description"
//               type="text"
//               placeholder="Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows={10}
              
//             />
//           </div>
//           <button
//             className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//           <button
//               className="bg-red-500 mt-2 hover:red-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500"
//               onClick={handleDelete}
//             >
//               Delete
//             </button>
//         </form>
//       </div>
//     </Card>
//   );
// };

// export default EditInternship;


import React, { useState, useEffect } from "react";
import Card from "../../../components/card";
import { useParams, useNavigate } from "react-router-dom";
import { getIntershipById } from "../../../api/intership";
import axiosInstance from "../../../utils/axiosIntance";

const EditInternship = () => {
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
    for (const key in internshipData) {
      if (key === 'image') {
        formData.append('image', internshipData.image); // Append the file directly
      } else {
        formData.append(key, internshipData[key]);
      }
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
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/auth");
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
      await axiosInstance.delete(
        `${import.meta.env.VITE_REACT_API_URL}api/internship/deleteinternship/${id}`,
        { withCredentials: true }
      );
      alert("Internship Deleted Successfully");
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
