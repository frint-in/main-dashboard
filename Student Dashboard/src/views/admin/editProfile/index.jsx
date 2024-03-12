import React, {useState} from "react";
import Card from "../../../components/card";
import axios from "axios";

import { useMutation, useQuery, useQueryClient   } from "@tanstack/react-query";
import { getStudentByToken } from "../../../api/student";

const EditProfile = () => {
  
  const [uname, setUname] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [phno, setphno] = useState('');
  const [description, setDescription] = useState('');
  const [specialisation, setSpecialisation] = useState('');
  const [education, setEducation] = useState('');
  const [dob, setDob] = useState('');
  const [languages, setLanguages] = useState('');
  const [skills, setSkills] = useState('');
  const [resume, setResume] = useState('');

  const handleUser = async (e) => {
    
    e.preventDefault();

    try {

      const res = await axios.put(`http://localhost:8000/api/user/updateuser/${student._id}`, { email, uname, phno, gender, description, specialisation, education, dob, languages, skills, resume },
      { withCredentials: true }
      )

      alert('Profile is saved')



      if (res.data) {
        console.log(res.data);
        // navigate('/auth');
        // setIsAdminAuthenticated(true)
        // sessionStorage.setItem('token', res.data.token)

       

      } else {
        alert('Opps!! Something gone wrong')
        console.log('invalid credentials');
      }
    } catch (error) {
      console.log(error);
      
    }
    
  }

  const {
    isLoading,
    isError,
    data: student,
    error,
  } = useQuery({
    queryKey: ["student"], 
    queryFn: () => getStudentByToken(), 
  });

  console.log('the logged in user',student );

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      <form className="col-span-10 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800" onSubmit={handleUser}>
        <h5 className="text-left text-xl font-bold leading-9 text-navy-700 dark:text-white">
          Edit Profile
        </h5>
        <form className="rounded pt-6 pb-8 mb-4 bg-white pl-3 dark:!bg-navy-800 ">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="profile "
            >
              Profle Pic
            </label>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="name"
              value={student?.uname}
              onChange={(e) => setUname(e.target.value)} 
              type="text"
              placeholder="Full Name"
              required
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="email"
              value={student?.email}
              onChange={(e) => setEmail(e.target.value)} 
              type="email"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Gender
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="gender"
              value={student?.gender}
              onChange={(e) => setGender(e.target.value)} 
              type="text"
              placeholder="Gender"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="phone"
              value={student?.phone}
              onChange={(e) => setphno(e.target.value)} 
              type="tel"
              placeholder="Phone Number"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="specialisation"
            >
              Specialisation
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="specialisation"
              value={student?.specialisation}
              onChange={(e) => setSpecialisation(e.target.value)} 
              type="text"
              placeholder="specialisation"
              required
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="description"
              type="text"
              value={student?.description}
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Description"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="education"
            >
              Education
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="education"
              type="text"
              value={student?.education}
              onChange={(e) => setEducation(e.target.value)} 
              placeholder="Current College"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dob"
            >
              Date of Birth
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="dob"
              type="date"
              value={student?.dob}
              onChange={(e) => setDob(e.target.value)} 
              placeholder="Date of Birth"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="language"
            >
              Languages
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="language"
              value={student?.languages}
              onChange={(e) => setLanguages(e.target.value)} 
              type="text"
              placeholder="Languages"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pl-3 dark:!bg-navy-800"
              id="skills"
              type="text"
              value={student?.skills}
              onChange={(e) => setSkills(e.target.value)} 
              placeholder="Skills"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="resume"
            >
              Resume
            </label>
          </div>
        </form>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </Card>
  );
};

export default EditProfile;
