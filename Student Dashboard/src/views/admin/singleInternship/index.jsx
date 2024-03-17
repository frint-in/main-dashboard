import { useState } from "react";
import General from "./components/General";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useColumnOrder } from "react-table";
import { applyInternshipByStudentTokenAndInternshipId } from "../../../api/internship";
import { getStudentByToken } from "../../../api/student";

const SingleInternship = () => {

  const {id} = useParams();

  const queryClient = useQueryClient()

  const {
    data: student,
  } = useQuery({
    queryKey: ["student"], 
    queryFn: () => getStudentByToken(), 
  });

  const current_internship = student?.applications.find( e => e.internship === id)

  console.log("current_internship>>>>>>>>>>>>>>>", current_internship);

  const applyInternshipMutation = useMutation({
    mutationFn: applyInternshipByStudentTokenAndInternshipId,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student']});
      console.log("success bro!")
    }
  });

  const handleClick = async () => {
    applyInternshipMutation.mutate(id)

  };
  
  return (
      <div>
        <General />
        <div className="mt-4 flex justify-end">
          { current_internship === undefined  ? (
            <Link
              // to="/admin/internships"
              onClick={handleClick}
              className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            >
              Apply
            </Link>
          ) : (
            <Link
              // to="/admin/internships"
              className="linear rounded-[20px] bg-cyan-500 px-4 py-2 text-base font-medium text-black transition duration-200 hover:bg-cyan-400 active:bg-cyan-300 dark:bg-cyan-300 dark:hover:bg-cyan-200 dark:active:opacity-90"
            >
              Applied !!!
            </Link>
          )}
        </div>
      </div>
  );
};

export default SingleInternship;
