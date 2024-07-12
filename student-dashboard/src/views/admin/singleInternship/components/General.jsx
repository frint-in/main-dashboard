import { useParams } from "react-router-dom";
import Card from "../../../../components/card";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { getAllInterships } from "../../../../api/student";
import { findIntershipById } from "../../../../api/user";
import axios from "axios";

const General = ({details}) => {
  const {id} = useParams();
  const paragraphs = details?.description.split('\n\n').map((paragraph, index) => (
    <div key={index} style={{ whiteSpace: 'pre-line' }}>{paragraph}</div>
  ));
  
  // const [details, setDetails] = useState()


  // const findIntershipById =  async(id)=> {
  //   console.log(id)
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_REACT_API_URL}api/internship/find/${id}`,
  //       { withCredentials: true }
  //     );
  
  //     const data = response.data;
  //     setDetails(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(()=>{
  //   findIntershipById(id)
  // },[])


  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <img src={details?.imgurl} alt="" className="w-1/2 p-2" />
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
        {details?.name || 'Company Name' }
        </h4>
        <h5 className="px-2 text-l font-bold text-navy-700 dark:text-white">
        {details?.companyName || 'Company Name' }
        </h5>
        <div className="mt-2 px-2 text-base text-gray-600">
          {/* {details?.description} */}
          {paragraphs}
        </div>
      </div>
      {/* Cards */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Position</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {details?.position}
          </p>
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Location</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {details?.location}
          </p>
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Mode</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {details?.mode || 'mode'}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Deadline </p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {details?.deadline || 'deadline'}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Stipend</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {details?.stipend || 'stipend'}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Type</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {details?.type || 'remote/onsite'}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Experience</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {details?.experience || 'experience'}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Skills</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {details?.skills || 'Skills'}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;
