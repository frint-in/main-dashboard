import React, { useEffect, useMemo, useState } from "react";
import Card from "../../../../components/card/index";
import axios from "axios";
import Popup from "../../../../components/popup/Popup";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllInterships } from "../../../../api/company";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const CheckTable = ({ name, tableData, action, status }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);


  const {
    isLoading,
    isError,
    data: internships,
    error,
  } = useQuery({
    queryKey: ["interships"], // Include user.uid in the query key
    queryFn: () => getAllInterships(), // Call fetchEventsById with user.uid
  });
  // console.log("hi2");
  // console.log("data in frontend", internships);

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Posted Works
        </div>
        <button className="bg-[#4318ff] text-white px-2 py-1 rounded">
          See All
        </button>
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden  max-h-[340px]">
        <table className="w-full" variant="simple" color="gray-500" mb="24px">
          <thead>
            <tr>
              <th className="border-b border-gray-200 pr-16 pb-[10px] text-center dark:!border-navy-700">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                  Name
                </div>
              </th>
              <th className="border-b border-gray-200 pr-16 pb-[10px] text-center dark:!border-navy-700">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                Deadline
                </div>
              </th>
              <th className="border-b border-gray-200 pr-16 pb-[10px] text-center dark:!border-navy-700">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                  Position
                </div>
              </th>
              <th className="border-b border-gray-200 pr-16 pb-[10px] text-center dark:!border-navy-700">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                  Type
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {internships?.map((row, _id) => (
              <tr key={row._id}>
                <td className="text-sm font-bold text-navy-700 dark:text-white ">
                  {row.name}
                </td>
                <td className="pt-[15px] pb-[16px] sm:text-[14px]">
                  {formatDate(row.deadline)}
                </td>
                <td className="pt-[15px] pb-[16px] sm:text-[14px]">
                  {row.position}
                </td>
                <td className="pt-[15px] pb-[16px] sm:text-[14px]">
                  {row.type}
                </td>
                {/* <td className="pt-[15px] pb-[16px] sm:text-[14px]">
                  <button
                    className="bg-[#4318ff] text-white px-2 py-1 rounded"
                    //  onClick={() => pending(order)}
                  >
                    Details
                  </button>
                </td> */}
                {/* <td className="pt-[15px] pb-[16px] sm:text-[14px]">
                  <button
                    className="bg-[#4318ff] text-white px-2 py-1 rounded"
                    onClick={(e) => pickup(row)}
                  >
                    {action}
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {showModal ? (
          <Popup setShowModal={setShowModal} order={selectedOrderId} />
        ) : null}
      </div>
    </Card>
  );
};

export default CheckTable;
