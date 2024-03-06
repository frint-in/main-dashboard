import React from "react";
import Card from "../../../components/card";
import { FaAngleDown } from "react-icons/fa";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from 'axios'


const PostInternship = () => {

  const internshipSchema = z.object({
    title: z.string().min(2).max(30),
    companyName: z.string().min(2).max(30),
    description: z.string(),
    deadline: z.string(),
    gender: z.string(),
    stipend: z.string(),
    type: z.string(),
    experience: z.string(),
    skills: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(internshipSchema),
  });

  const submitData = (data) => {
    console.log("IT WORKED", data);


  };

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      <div className="col-span-10 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
        <h5 className="text-left text-xl font-bold leading-9 text-navy-700 dark:text-white">
          Internship Page
        </h5>
        <form onSubmit={handleSubmit(submitData)} className="rounded pt-6 pb-8 mb-4 bg-white pl-3 dark:!bg-navy-800 ">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              {...register("title")} 
              id="title"
              type="text"
              placeholder="Title"
              required
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="company"
            >
              Company Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="companyName"
              {...register("companyName")}
              type="text"
              placeholder="Company Name"
              required
            />
             {errors.companyName && <p>{errors.companyName.message}</p>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              rows={4}
              {...register("description")} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="description"
              type="text"
              placeholder="Description"
              required
            ></textarea>
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="deadline"
            >
              Application Deadline <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="deadline"
              {...register("deadline")}
              type="date"
              placeholder="deadline"
              required
            />
            {errors.deadline && <p>{errors.deadline.message}</p>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Gender <span style={{ color: "red" }}>*</span>
            </label>
            <input
            {...register("gender")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="gender"
              type="text"
              placeholder="Gender"
              required
            />
             {errors.gender && <p>{errors.gender.message}</p>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="stipend"
            >
              Stipend <span style={{ color: "red" }}>*</span>
            </label>
            <input
            {...register("stipend")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="stipend"
              type="number"
              placeholder="Stipend"
              required
            />
             {errors.stipend && <p>{errors.stipend.message}</p>}
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
              {...register("type")}
              type="text"
              placeholder="Eg: Freelance or Internship"
              required
            />
             {errors.type && <p>{errors.type.message}</p>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="experience"
            >
              Experience
            </label>
            <input
            {...register("experience")} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="experience"
              type="text"
              placeholder="eg: Fresh, 1 year etc."
            />
             {errors.experience && <p>{errors.experience.message}</p>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="skills"
            >
              Skills
            </label>
            <input
            {...register("skills")} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="skills"
              type="text"
              placeholder="Skills"
            />
            {errors.skills && <p>{errors.skills.message}</p>}
          </div>
        <div className="flex items-center justify-between">
          <button
                  disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500"
            type="submit"
          >
            Submit
          </button>
        </div>
        </form>
      </div>
    </Card>
  );
};

export default PostInternship;


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