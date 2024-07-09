import { useEffect, useState } from "react";
import General from "./components/General";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useColumnOrder } from "react-table";
import { applyInternshipByStudentTokenAndInternshipId } from "../../../api/internship";
import { getStudentByToken } from "../../../api/student";
import axiosInstance from "../../../utils/axiosIntance";

const SingleInternship = () => {
  const { id } = useParams();
  const [details, setDetails] = useState();
  const [userDetail, setUserdetail] = useState([]);

  useEffect(() => {
    const storedDetails = localStorage.getItem("details");
    if (storedDetails) {
      const details = JSON.parse(storedDetails);
      setUserdetail(details._id);
    }
  }, []);

  const applyInternshipByStudentTokenAndInternshipId = async (id) => {
    try {
      const response = await axiosInstance.put(
        `${
          import.meta.env.VITE_REACT_API_URL
        }api/internship/addapplicants/${id}`,
        null,
        { withCredentials: true }
      );
    } catch (error) {
      alert(error);
      // console.log(error)
    }
  };

  const findIntershipById = async (id) => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_REACT_API_URL}api/internship/find/${id}`,
        { withCredentials: true }
      );

      const data = response.data;
      setDetails(data);
    } catch (error) {
      // console.log(error)
      alert(error);
    }
  };

  useEffect(() => {
    findIntershipById(id);
  }, []);

  // console.log(details)

  const handleClick = async () => {
    try {
      if (details.subuser?.includes(userDetail)) {
        alert("You have already applied to this internship.");
      } else {
        await applyInternshipByStudentTokenAndInternshipId(id);
        alert("Applied successfully!");
      }
    } catch (error) {
      if (error.response.status === "401") {
        localStorage.removeItem("token");
      }
      alert(error.response.data.error);
      if (error.response.status === "401") {
        navigate("/login");
      } else {
        alert("Access Token Error");
      }
    }
  };

  return (
    <div>
      <General details={details} />
      <div className="mt-4 flex justify-end">
        <Link
          // to="/admin/internships"
          onClick={handleClick}
          className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
        >
          Apply
        </Link>
      </div>
    </div>
  );
};

export default SingleInternship;
