import React, { useState } from "react";
import { FaLinkedinIn, FaRegEnvelope, FaSchool } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoMdContact } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { MdEngineering } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [college, setCollege] = useState("");
  const [field, setField] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password.length < 8) {
        toast.info("Password should be at least 8 characters", {
          position: "bottom-center",
        });
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Profile", user.uid), {
          firstname: firstname,
          lastname: lastname,
          email: email,
          date: date,
          college: college,
          field: field,
          linkedin: linkedin,
        });
      }
      console.log("User Created Successfully");
      toast.success("User Created Successfully !!", { position: "top-center" });
      navigate("/home");
    } catch (error) {
      console.log(error.message);
      toast.error("User Already Registered", { position: "bottom-center" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col justify-center items-center w-full flex-1 px-4 md:px-10 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full max-w-md md:max-w-4xl md:flex-row">
          <div className="w-full p-5">
            <div className="text-left font-bold">
              <span className="text-blue-500">Fri</span>
              <span className="text-black">nt</span>
            </div>

            <div className="py-10">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">
                Create your Account
              </h2>
              <form action="" onSubmit={handleSubmit}>
                <div className="border-2 w-10 border-blue-500 inline-block mb-4"></div>

                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 w-full p-2 flex items-center mb-3 rounded-xl">
                    <IoMdContact className="text-gray-400 m-2" />
                    <input
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                  <div className="bg-gray-100 w-full p-2 flex items-center mb-3 rounded-xl">
                    <IoMdContact className="text-gray-400 m-2" />
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Last name"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                  <div className="bg-gray-100 w-full p-2 flex items-center mb-3 rounded-xl">
                    <FaRegEnvelope className="text-gray-400 m-2" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="bg-gray-100 w-full p-2 flex items-center mb-3 rounded-xl">
                    <RiLockPasswordLine className="text-gray-400 m-2" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="bg-gray-100 w-full p-2 flex items-center mb-3 rounded-xl">
                    <CiCalendarDate className="text-gray-400 m-2" />
                    <input
                      type="date"
                      name="date"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div className="bg-gray-100 w-full p-2 flex items-center mb-3 rounded-xl">
                    <FaSchool className="text-gray-400 m-2" />
                    <input
                      type="text"
                      name="college"
                      placeholder="Enter your college"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      onChange={(e) => setCollege(e.target.value)}
                    />
                  </div>

                  <div className="bg-gray-100 w-full p-2 flex items-center mb-3 rounded-xl">
                    <MdEngineering className="text-gray-400 m-2" />
                    <input
                      type="text"
                      name="field"
                      placeholder="Enter your field"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      onChange={(e) => setField(e.target.value)}
                    />
                  </div>

                  <div className="bg-gray-100 w-full p-2 flex items-center rounded-xl">
                    <FaLinkedinIn className="text-gray-400 m-2" />
                    <input
                      type="url"
                      name="linkedin"
                      placeholder="LinkedIn Url"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      onChange={(e) => setLinkedin(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="border-2 border-blue-500 border-solid text-blue-500 rounded-full px-10 py-2 mt-5 inline-block font-bold hover:text-white hover:bg-blue-500 transition-colors duration-300"
                    onClick={handleSubmit}
                  >
                    Create Account
                  </button>
                </div>
              </form>
              <div className="mt-4">
                <Link to="/">
                  <p className="text-blue-500 hover:underline">
                    Already have an account? Sign In
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
