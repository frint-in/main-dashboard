import React, { useState, useEffect } from "react";
import Card from "../../../components/card";
import axios from "axios";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudentByToken } from "../../../api/student";
import { useDispatch, useSelector } from "react-redux";
import { setAvatarUrl, setResumeUrl } from "../../../state/editSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const user1 = useSelector((state) => state.user);
  const avatar1 = useSelector((state) => state.user.avatar.url);
  const resume1 = useSelector((state) => state.user.resume);

  console.log(user1);
  const {
    isLoading,
    isError,
    data: student,
    error,
  } = useQuery({
    queryKey: ["student"],
    queryFn: () => getStudentByToken(),
  });

  console.log("the logged in user", student);

  const [user, setUser] = useState({
    uname: "",
    email: "",
    gender: "",
    phno: "",
    description: "",
    specialisation: "",
    education: "",
    dob: "",
    languages: "",
    skills: "",
    avatar: {
      url: "",
    },
    resume: "",
  });

  const [resumeData, setResumeData] = useState(null);
  const [avatarData, setAvatarData] = useState(null);

  useEffect(() => {
    if (student) {
      setUser({
        uname: student.uname || "",
        email: student.email || "",
        gender: student.gender || "",
        phno: student.phno || "",
        description: student.description || "",
        specialisation: student.specialisation || "",
        education: student.education || "",
        dob: student.dob || "",
        languages: student.languages || "",
        skills: student.skills || "",
        avatar: student.avatar || { url: "" },
        resume: student.resume || "",
      });
    }
  }, [student]);

  const handleChangeInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleResumeChange = (e) => {
    console.log("resume change?", e.target.files[0]);
    // setUser(e.target.files[0]);
    setResumeData(e.target.files[0]);
  };

  const handleAvatarChange = (e) => {
    console.log("avatar change?", e.target.files[0]);
    setAvatarData(e.target.files[0]);
    // setUser({...user, avatar:e.target.files[0] });
  };

  //trial-----------------------------x-----------------------------

  const avatarUpload = async () => {
    try {
      const formAvatarData = new FormData();
      formAvatarData.append("file", avatarData);
      formAvatarData.append(
        "upload_preset",
        import.meta.env.VITE_REACT_CLOUDINARY_UPLOAD_PRESET
      );

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_REACT_CLOUDINARY_CLOUD_NAME
        }/auto/upload`,
        formAvatarData
      );

      const avatarUrl = response.data.secure_url;
      setAvatarUrl(response.data.secure_url);
      console.log("avatarUrl>>>>>>>>>>>>>", avatarUrl);

      dispatch(setAvatarUrl(avatarUrl));
    } catch (error) {
      console.log("error in avatar upload");
    }
  };

  const resumeUpload = async () => {
    try {
      const formResumeData = new FormData();
      formResumeData.append("file", resumeData);
      formResumeData.append(
        "upload_preset",
        import.meta.env.VITE_REACT_CLOUDINARY_UPLOAD_PRESET
      );

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_REACT_CLOUDINARY_CLOUD_NAME
        }/auto/upload`,
        formResumeData
      );

      const resumeUrl = response.data.secure_url;

      console.log("resumeUrl>>>>>>>>>>>>>", resumeUrl);
      dispatch(setResumeUrl(resumeUrl));
    } catch (error) {
      console.log("error in resume upload", error);
    }
  };

  const updateUser = async () => {
    const res = await axios.put(
      `${import.meta.env.VITE_REACT_API_URL}api/user/updateuser/${student._id}`,
      // user,
      {
        uname: user.uname,
        email: user.email,
        gender: user.gender,
        phno: user.phno,
        description: user.description,
        specialisation: user.description,
        education: user.education,
        dob: user.dob,
        languages: user.languages,
        skills: user.skills,
        avatar: {
          url: avatar1,
        },
        resume: resume1,
      },
      { withCredentials: true }
    );

    alert("Profile is saved");

    if (res.data) {
      // Handle successful response if needed
    } else {
      alert("Oops!! Something went wrong");
    }
  };

  const handleUser = async (e) => {
    e.preventDefault();

    if (avatarData) {
      try {
        const formAvatarData = new FormData();
        formAvatarData.append("file", avatarData);
        formAvatarData.append(
          "upload_preset",
          import.meta.env.VITE_REACT_CLOUDINARY_UPLOAD_PRESET
        );

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_REACT_CLOUDINARY_CLOUD_NAME
          }/auto/upload`,
          formAvatarData
        );
        if (response.data) {
          const avatarUrl = response.data.secure_url;
          setAvatarUrl(response.data.secure_url);
          console.log("avatarUrl>>>>>>>>>>>>>", avatarUrl);
          if (resumeData) {
            try {
              const formResumeData = new FormData();
              formResumeData.append("file", resumeData);
              formResumeData.append(
                "upload_preset",
                import.meta.env.VITE_REACT_CLOUDINARY_UPLOAD_PRESET
              );

              const response2 = await axios.post(
                `https://api.cloudinary.com/v1_1/${
                  import.meta.env.VITE_REACT_CLOUDINARY_CLOUD_NAME
                }/auto/upload`,
                formResumeData
              );

              if (response2.data) {
                const resumeUrl = response2.data.secure_url;

                console.log("resumeUrl>>>>>>>>>>>>>", resumeUrl);
                const res = await axios.put(
                  `${import.meta.env.VITE_REACT_API_URL}api/user/updateuser/${
                    student._id
                  }`,
                  // user,
                  {
                    uname: user.uname,
                    email: user.email,
                    gender: user.gender,
                    phno: user.phno,
                    description: user.description,
                    specialisation: user.description,
                    education: user.education,
                    dob: user.dob,
                    languages: user.languages,
                    skills: user.skills,
                    avatar: {
                      url: avatarUrl,
                    },
                    resume: resumeUrl,
                  },
                  { withCredentials: true }
                );

                alert("Profile is saved");

                if (res.data) {
                  // Handle successful response if needed
                } else {
                  alert("Oops!! Something went wrong");
                }
              }

              // dispatch(setResumeUrl(resumeUrl))
            } catch (error) {
              console.log("error in resume upload", error);
            }
          } else {
            const res = await axios.put(
              `${import.meta.env.VITE_REACT_API_URL}api/user/updateuser/${
                student._id
              }`,
              // user,
              {
                uname: user.uname,
                email: user.email,
                gender: user.gender,
                phno: user.phno,
                description: user.description,
                specialisation: user.description,
                education: user.education,
                dob: user.dob,
                languages: user.languages,
                skills: user.skills,
                avatar: {
                  url: avatarUrl,
                },
                resume: null,
              },
              { withCredentials: true }
            );

            alert("Profile is saved");

            if (res.data) {
              // Handle successful response if needed
            } else {
              alert("Oops!! Something went wrong");
            }
          }
        }

        // dispatch(setAvatarUrl(avatarUrl))
      } catch (error) {
        console.log("error in avatar upload");
      }
    } else if (resumeData) {
      try {
        const formResumeData = new FormData();
        formResumeData.append("file", resumeData);
        formResumeData.append(
          "upload_preset",
          import.meta.env.VITE_REACT_CLOUDINARY_UPLOAD_PRESET
        );

        const response2 = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_REACT_CLOUDINARY_CLOUD_NAME
          }/auto/upload`,
          formResumeData
        );

        if (response2.data) {
          const resumeUrl = response2.data.secure_url;

          console.log("resumeUrl>>>>>>>>>>>>>", resumeUrl);
          const res = await axios.put(
            `${import.meta.env.VITE_REACT_API_URL}api/user/updateuser/${
              student._id
            }`,
            // user,
            {
              uname: user.uname,
              email: user.email,
              gender: user.gender,
              phno: user.phno,
              description: user.description,
              specialisation: user.description,
              education: user.education,
              dob: user.dob,
              languages: user.languages,
              skills: user.skills,
              avatar: {
                url: null,
              },
              resume: resumeUrl,
            },
            { withCredentials: true }
          );

          alert("Profile is saved");

          if (res.data) {
            // Handle successful response if needed
          } else {
            alert("Oops!! Something went wrong");
          }
        }

        // dispatch(setResumeUrl(resumeUrl))
      } catch (error) {
        console.log("error in resume upload", error);
      }
    } else {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_API_URL}api/user/updateuser/${
          student._id
        }`,
        // user,
        {
          uname: user.uname,
          email: user.email,
          gender: user.gender,
          phno: user.phno,
          description: user.description,
          specialisation: user.description,
          education: user.education,
          dob: user.dob,
          languages: user.languages,
          skills: user.skills,
          avatar: {
            url: null,
          },
          resume: null,
        },
        { withCredentials: true }
      );

      alert("Profile is saved");

      if (res.data) {
        // Handle successful response if needed
      } else {
        alert("Oops!! Something went wrong");
      }
    }
  };

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      <form
        className="col-span-10 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800"
        onSubmit={handleUser}
      >
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
            <input type="file" onChange={handleAvatarChange} />
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
              id="uname"
              name="uname"
              // value={student?.uname}
              onChange={handleChangeInput}
              value={user.uname}
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
              name="email"
              // value={student?.email}
              onChange={handleChangeInput}
              value={user.email}
              // onChange={handleNameChange}
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
              name="gender"
              // value={student?.gender}
              onChange={handleChangeInput}
              value={user.gender}
              // onChange={handleNameChange}
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
              id="phno"
              name="phno"
              // value={student?.phone}
              onChange={handleChangeInput}
              value={user.phno}
              // onChange={handleNameChange}
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
              name="specialisation"
              onChange={handleChangeInput}
              value={user.specialisation}
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
              name="description"
              type="text"
              onChange={handleChangeInput}
              value={user.description}
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
              name="education"
              type="text"
              onChange={handleChangeInput}
              value={user.education}
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
              name="dob"
              type="date"
              onChange={handleChangeInput}
              value={user.dob}
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
              id="languages"
              name="languages"
              onChange={handleChangeInput}
              value={user.languages}
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
              name="skills"
              type="text"
              onChange={handleChangeInput}
              value={user.skills}
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
            <input type="file" onChange={handleResumeChange} />
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