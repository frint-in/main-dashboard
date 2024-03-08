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
  console.log("this is general");
  console.log("data in frontend", internship);

  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
        Title
        </h4>
        <h5 className="px-2 text-l font-bold text-navy-700 dark:text-white">
        Company Name
        </h5>
        <p className="mt-2 px-2 text-base text-gray-600">
          (Description)
          As we live, our hearts turn colder. Cause pain is what we go through
          as we become older. We get insulted by others, lose trust for those
          others. We get back stabbed by friends. It becomes harder for us to
          give others a hand. We get our heart broken by people we love, even
          that we give them all...
        </p>
      </div>
      {/* Cards */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Position</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Assam Engineering College
          </p>
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Location</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Assam Engineering College
          </p>
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Mode</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Assam Engineering College
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Deadline </p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Assamese, English, Hindi
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Stipend</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Software Developer, Coder
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Type</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            abc@gmail.com
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Experience</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            +91 9365353256
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Skills</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            7 May 2002
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;
