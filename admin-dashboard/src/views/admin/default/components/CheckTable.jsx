import React, { useEffect, useMemo, useState } from "react";
// import CardMenu from "../../../../components/card/CardMenu";
// import Checkbox from "../../../../components/checkbox/index";
import Card from "../../../../components/card/index";
import axios from "axios";
import { FcApproval } from "react-icons/fc";
import Popup from "../../../../components/popup/Popup";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AiFillProfile } from "react-icons/ai";
import { SiGoogledocs } from "react-icons/si";
import {
  approveUserByIntershipId,
  completeUserByIntershipId,
} from "../../../../api/intership";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// const instance = axios.create({
//   id: userId,
// });

const CheckTable = ({ intershipId, name, tableData, action, status }) => {
  console.log("tableData>>>>>>>>>>>", tableData);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleUserClick = (id) => {
    // console.log('userId', id);

    navigate(`/admin/student details/${id}`);
  };

  const updateApprovedStatusMutation = useMutation({
    mutationFn: approveUserByIntershipId,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["intershipUsers"] });
      // console.log("success bro!")
    },
  });

  const updateCompletedStatusMutation = useMutation({
    mutationFn: completeUserByIntershipId,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["intershipUsers"] });
      // console.log("success bro!")
    },
  });

  const handleButtonSubmit = async (action, userId) => {
    const instance = await axios.create({
      id: userId,
    });
    if (action === "Approve") {
      // console.log('approved');

      // console.log(userId);
      // updateApprovedStatusMutation.mutate(intershipId, userId);
      const response = await axios.put(
        `${
          import.meta.env.VITE_REACT_API_URL
        }api/internship/updatetoapprove/${intershipId}`,
        {
          id: userId,
        },
        {
          withCredentials: true,
        }
      );

      if (response) {
        queryClient.invalidateQueries({ queryKey: ["intershipUsers"] });
      }

      const data = response.data;
      console.log("data>>>>", data);

      return data;
    } else {
      // console.log('completed');
      // updateCompletedStatusMutation.mutate(userId);
      const response = await instance.put(
        `${
          import.meta.env.VITE_REACT_API_URL
        }api/internship/updatetocomplete/${intershipId}`,
        {
          id: userId,
        },
        {
          withCredentials: true,
        }
      );

      if (response) {
        queryClient.invalidateQueries({ queryKey: ["intershipUsers"] });
      }

      const data = response.data;
      // console.log("data>>>>", data);

      return data;
    }
  };

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {name}
        </div>
        {/* <button className="bg-[#4318ff] text-white px-2 py-1 rounded">
          See All
        </button> */}
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden  max-h-[340px]">
        <table className="w-full" variant="simple" color="gray-500" mb="24px">
          <thead>
            <tr>
              <th className="border-b border-gray-200 pb-[10px] text-center dark:!border-navy-700  ">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs mx-7">
                  Name
                </div>
              </th>
              <th className="border-b border-gray-200 pb-[10px] text-center dark:!border-navy-700  ">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs mx-7">
                  Phone
                </div>
              </th>
              <th className="border-b border-gray-200 pb-[10px] text-center dark:!border-navy-700  ">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs mx-7">
                  Email
                </div>
              </th>
              <th className="border-b border-gray-200 pb-[10px] text-center dark:!border-navy-700  ">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs mx-7">
                  Specialization
                </div>
              </th>
              <th className="border-b border-gray-200 pb-[10px] text-center dark:!border-navy-700  ">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs mx-7">
                  Resume
                </div>
              </th>
              <th className="border-b border-gray-200 pb-[10px] text-center dark:!border-navy-700  ">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs mx-7">
                  Profile
                </div>
              </th>
              <th className="border-b border-gray-200 pb-[10px] text-center dark:!border-navy-700  ">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs mx-7">
                  Status
                </div>
              </th>
            </tr>
          </thead>
          {tableData.length ? (
            tableData.map((row, _id) => (
              <tbody className="flex-1 justify-evenly">
                <tr key={row.userId}>
                  <td className="text-sm text-center font-bold text-navy-700 dark:text-white cursor-default mx-2 p-3">
                    {row.uname}
                  </td>
                  <td className="pt-[15px] text-center pb-[16px] sm:text-[14px] cursor-default mx-2 p-3">
                    {row.phone || "not given"}
                  </td>
                  <td className="pt-[15px] text-center pb-[16px] sm:text-[14px] cursor-default mx-2 p-3">
                    {row.email}
                  </td>
                  <td className="pt-[15px] text-center pb-[16px] sm:text-[14px] cursor-default mx-2 p-3">
                    {row.specs || "not given"}
                  </td>

                  <td className="pt-[15px] text-center pb-[16px] sm:text-[14px]  mx-2 p-3  ">
                    {row.resume ? (
                      <SiGoogledocs
                        className="text-blue-300 w-20 h-7 text-center cursor-pointer"
                        onClick={() => window.open(row.resume, '_blank')}
                      />
                    ) : (
                      <div>⚠️</div>
                    )}
                  </td>

                  <td
                    className="pt-[15px] text-center pb-[16px] sm:text-[14px] mx-2 p-3 flex justify-center"
                    onClick={() => handleUserClick(row.userId)}
                  >
                    <AiFillProfile className="w-20 h-8 cursor-pointer " />
                  </td>
                  <td className="pt-[15px] text-center pb-[16px] sm:text-[14px]">
                    <button
                      className="bg-[#4318ff] text-white px-2 py-1 rounded"
                      onClick={() => handleButtonSubmit(action, row.userId)}
                    >
                      {action}
                    </button>
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <tbody className=" ">
              <tr className="flex-1     ">
                <td
                  colSpan={10}
                  className="p-10 text-md font-medium text-center   "
                >
                  💻 No data present
                </td>
              </tr>
            </tbody>
          )}
        </table>
        {showModal ? (
          <Popup setShowModal={setShowModal} order={selectedOrderId} />
        ) : null}
      </div>
    </Card>
  );
};

export default CheckTable;
