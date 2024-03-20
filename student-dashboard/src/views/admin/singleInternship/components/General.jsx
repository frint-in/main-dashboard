import { useParams } from "react-router-dom";
import Card from "../../../../components/card";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { getAllInterships } from "../../../../api/student";
import { findIntershipById } from "../../../../api/user";

const General = () => {
  const {id} = useParams();
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: internship,
    error,
  } = useQuery({
    queryKey: ["intership", id], // Include user.uid in the query key
    queryFn: () => findIntershipById(id), // Call fetchEventsById with user.uid
  });

  
  // console.log("this is general");
  // console.log("data in frontend", internship);

  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <img src={internship?.imgurl} alt="" className="w-auto h-40 p-2" />
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
        {internship?.name || 'Company Name' }
        </h4>
        <h5 className="px-2 text-l font-bold text-navy-700 dark:text-white">
        {internship?.companyName || 'Company Name' }
        </h5>
        <p className="mt-2 px-2 text-base text-gray-600">
          {internship?.description}
        </p>
      </div>
      {/* Cards */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Position</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {internship?.position}
          </p>
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Location</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {internship?.location}
          </p>
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Mode</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {internship?.mode || 'mode'}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Deadline </p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {internship?.deadline || 'deadline'}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Stipend</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {internship?.stipend || 'stipend'}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Type</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {internship?.type || 'remote/onsite'}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Experience</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {internship?.experience || 'experience'}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Skills</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {internship?.skills || 'Skills'}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;
