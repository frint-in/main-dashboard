import { useEffect, useState } from "react";
import General from "./components/General";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useColumnOrder } from "react-table";
import { applyInternshipByStudentTokenAndInternshipId } from "../../../api/internship";
import { getStudentByToken } from "../../../api/student";
import axiosInstance from "../../../utils/axiosIntance";
import { toast } from "sonner";
import { handleApiError, handleApiResponse } from "../../../utils/apiResponseHandler";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetails } from "@/state/userSlice";
import { deleteAuthChecked } from "@/state/authSlice";

const SingleInternship = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [details, setDetails] = useState();


  // useEffect(() => {
  //   const storedDetails = localStorage.getItem("details");
  //   if (storedDetails) {
  //     const details = JSON.parse(storedDetails);
  //     setUserdetail(details._id);
  //   }
  // }, []);

  const userDetails = useSelector(selectUserDetails);

  const userId = userDetails._id;

  console.log("userId", userId);
  id
  console.log("id from params", id);
  

  
  const applyInternshipByStudentTokenAndInternshipId = async () => {
    try {
      const response = await axiosInstance.put(
        `${
          import.meta.env.VITE_REACT_API_URL
        }api/internship/addapplicants/${id}`,
        null,
        { withCredentials: true }
      );

      handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
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

      console.log(data);
    } catch (error) {
      // console.log(error)
      alert(error);
    }
  };

  useEffect(() => {
    findIntershipById(id);
  }, [id]);

  // console.log(details)

  const handleClick = async () => {
    try {
      if (!details.subuser?.includes(userId)) {
        await applyInternshipByStudentTokenAndInternshipId();
      } else {
        toast.info("You have already applied to this internship.");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        // Redirect to login or handle unauthorized access
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <General details={details} />
      <div className="mt-4 flex justify-end">
        {!details?.subuser?.includes(userId) ? (<Link
          // to="/admin/internships"
          onClick={handleClick}
          className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
        >
          Apply
        </Link>) : (<button
          onClick={handleClick}
          className={`linear rounded-[20px] px-4 py-2 text-base font-medium text-white transition duration-200 ${
            details?.subuser?.includes(userId)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-brand-900 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
          }`}
          disabled={details?.subuser?.includes(userId)}
        >
          Applied
        </button>)}
        
        
      </div>
    </div>
  );
};

export default SingleInternship;
