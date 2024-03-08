// import React, { useState } from "react";
// import Card from "../../../components/card";
// import { FaAngleDown } from "react-icons/fa";
// import { useMutation, useQueryClient } from "@tanstack/react-query"

// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, Controller } from "react-hook-form";
// import axios from 'axios'
// import { addInternship } from "../../../api/company";


// const PostInternship = () => {
//   const [name, setName] = useState('');

//   const [image, setImage] = useState(null);
//   const [companyname, setCompanyname] = useState('');
//   const [description, setDescription] = useState('');
//   const [location, setLocation] = useState('');
//   const [phono, setPhno] = useState('');


//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
// };


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const formData = new FormData();
//   formData.append('image', image);
//   formData.append('name', name);
//   formData.append('description', description);
//   formData.append('location', location);
//   formData.append('phono', phono);

//   try {
//       const response = await axios.post('http://localhost:8000/api/internship/addinternship', formData,    { withCredentials: true },{
//           headers: {
//               'Content-Type': 'multipart/form-data'
//           }
//       });
//       console.log(response.data);
//   } catch (error) {
//       console.error(error);
//   }
// };

//   // const submitData = (data) => {
//   //   console.log("IT WORKED", data);

//   //   const formData = new FormData();
//   //   formData.append("title", data.title);
//   //   formData.append("companyName", data.companyName);
//   //   formData.append("description", data.description);
//   //   formData.append("deadline", data.deadline);
//   //   formData.append("gender", data.gender);
//   //   formData.append("stipend", data.stipend);
//   //   formData.append("type", data.type);
//   //   formData.append("experience", data.experience);
//   //   formData.append("skills", data.skills);
//   //   formData.append("image", data.image[0]);

//   //   createInternshipMutation.mutate(formData, {
//   //     withCredentials: true
//   // });




//   // };



//   return (
//     <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
//       <div className="col-span-10 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
//         <h5 className="text-left text-xl font-bold leading-9 text-navy-700 dark:text-white">
//           Internship Page
//         </h5>
//         <form onSubmit={handleSubmit} className="rounded pt-6 pb-8 mb-4 bg-white pl-3 dark:!bg-navy-800 ">
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="title"
//             >
//               Title <span style={{ color: "red" }}>*</span>
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              
//               id="title"
//               type="text"
//               placeholder="title" value={name} onChange={(e) => setName(e.target.value)} 
//               required
//             />
//           </div>

//           <div className="mb-4">
//   <label
//     className="block text-gray-700 text-sm font-bold mb-2"
//     htmlFor="image"
//   >
//     Image <span style={{ color: "red" }}>*</span>
//   </label>
//   <input type="file" onChange={handleImageChange} />
// </div>


//           <div className="mb-4">
//           <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="description"
//             >
//               description <span style={{ color: "red" }}>*</span>
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              
//               id="description"
//     type="text"
//     placeholder="Description"
//     value={description}
//     onChange={(e) => setDescription(e.target.value)}
//     required
// />

// </div>

// <div className="mb-4">
// <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="description"
//             >
//                <span style={{ color: "red" }}>*</span>
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              
//               id="description"
//     type="text"
//     placeholder="Description"
//     value={description}
//     onChange={(e) => setDescription(e.target.value)}
//     required
// />
// </div>


// <div className="mb-4">
// <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="description"
//             >
//               description <span style={{ color: "red" }}>*</span>
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              
//               id="description"
//     type="text"
//     placeholder="Description"
//     value={description}
//     onChange={(e) => setDescription(e.target.value)}
//     required
// />
// </div>



// <div className="mb-4">
// <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="description"
//             >
//               description <span style={{ color: "red" }}>*</span>
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              
//               id="description"
//     type="text"
//     placeholder="Description"
//     value={description}
//     onChange={(e) => setDescription(e.target.value)}
//     required
// />
// </div>


// <div className="mb-4">
// <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="description"
//             >
//               description <span style={{ color: "red" }}>*</span>
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              
//               id="description"
//     type="text"
//     placeholder="Description"
//     value={description}
//     onChange={(e) => setDescription(e.target.value)}
//     required
// />
// </div>


// <div className="mb-4">
// <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="description"
//             >
//               description <span style={{ color: "red" }}>*</span>
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              
//               id="description"
//     type="text"
//     placeholder="Description"
//     value={description}
//     onChange={(e) => setDescription(e.target.value)}
//     required
// />
// </div>


// <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="location"
//             >
//               location <span style={{ color: "red" }}>*</span>
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              
//               id="location"
//               type="text"
//               placeholder="Name" value={location} onChange={(e) => setLocation(e.target.value)} 
//               required
//             />

// <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="phno"
//             >
//               phno <span style={{ color: "red" }}>*</span>
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              
//               id="phno"
//               type="text"
//               placeholder="Name" value={phono} onChange={(e) => setPhno(e.target.value)} 
//               required
//             />


            
//           <button
//                   // disabled={isSubmitting}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500"
//             type="submit"
//           >
//             Submit
//           </button>
//         </div>
//         </form>
//       </div>
//     </Card>
//   );
// };

// export default PostInternship;


//-=========================================================================

// import React from "react";
// import Card from "../../../components/card";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// const internshipSchema = z.object({
//   title: z.string().min(2).max(30),
//   companyName: z.string().min(2).max(30),
//   description: z.string(),
//   deadline: z.string(),
//   gender: z.string(),
//   stipend: z.number().positive("Stipend must be a positive number"),
//   type: z.string(),
//   experience: z.string(),
//   skills: z.string(),
// });

// const PostInternship = () => {
//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
//     resolver: zodResolver(internshipSchema),
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
// <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11"> 
// <div className="col-span-10 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
//     <h5 className="text-left text-xl font-bold leading-9 text-navy-700 dark:text-white">
//           Internship Page
//         </h5>
//         <form onSubmit={handleSubmit(onSubmit)} className="rounded pt-6 pb-8 mb-4 bg-white pl-3 dark:!bg-navy-800">
//           <div className="mb-4">
//             <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title <span style={{ color: "red" }}>*</span></label>
//             <input id="title" {...register("title")} type="text" placeholder="Title" required />
//             {errors.title && <p>{errors.title.message}</p>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="companyName" className="block text-gray-700 text-sm font-bold mb-2">Company Name <span style={{ color: "red" }}>*</span></label>
//             <input id="companyName" {...register("companyName")} type="text" placeholder="Company Name" required />
//             {errors.companyName && <p>{errors.companyName.message}</p>}
//           </div>
//           {/* Add similar structure for other fields */}
//           <div className="flex items-center justify-between">
//             <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
//           </div>
//         </form>
//       </div>
//     </Card>
//   );
// };

// export default PostInternship;


  // function App() {
  //   const schema = z
  //     .object({
  //       firstName: z.string().min(2).max(30),
  //       lastName: z.string().min(2).max(30),
  //       email: z.string().email(),
  //       age: z.number().min(18).max(70),
  //       password: z.string().min(5).max(20),
  //       confirmPassword: z.string().min(5).max(20),
  //     })
  //     .refine((data) => data.password === data.confirmPassword, {
  //       message: "Passwords do not match",
  //       path: ["confirmPassword"],
  //     });

  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm({
  //     resolver: zodResolver(schema),
  //   });

  //   const submitData = (data) => {
  //     console.log("IT WORKED", data);
  //   };

  //   return (
  //     <div className="App">
  //       <form onSubmit={handleSubmit(submitData)}>
  //         <label> First Name: </label>
  //         <input type="text" {...register("firstName")} />
  //         {errors.firstName && <span> {errors.firstName.message}</span>}
  //         <label> Last Name: </label>
  //         <input type="text" {...register("lastName")} />
  //         {errors.lastName && <span> {errors.lastName.message}</span>}
  //         <label> Email: </label>
  //         <input type="email" {...register("email")} />
  //         {errors.email && <span> {errors.email.message}</span>}
  //         <label> Age </label>
  //         <input type="number" {...register("age", { valueAsNumber: true })} />
  //         {errors.age && <span> {errors.age.message}</span>}
  //         <label> Password: </label>
  //         <input type="password" {...register("password")} />
  //         {errors.password && <span> {errors.password.message}</span>}
  //         <label> Confirm Password: </label>
  //         <input type="password" {...register("confirmPassword")} />
  //         {errors.confirmPassword && (
  //           <span> {errors.confirmPassword.message}</span>
  //         )}

  //         <input type="submit" />
  //       </form>
  //     </div>
  //   );
  // }

  // export default App;



  import React, { useState } from "react";
import Card from "../../../components/card";
import axios from "axios";

const PostInternship = () => {
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
      const response = await axios.post(
        "http://localhost:8000/api/internship/addinternship",
        formDataToSend,
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
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
              placeholder="freelance/internship"
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
              placeholder="remote/onsite"
              value={formData.mode}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </Card>
  );
};

export default PostInternship;
