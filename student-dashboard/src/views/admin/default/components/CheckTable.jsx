import React, { useEffect, useMemo, useState } from "react";
import Card from "../../../../components/card/index";
import axios from "axios";
import Popup from "../../../../components/popup/Popup";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { getAllInterships } from "../../../../api/company";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const CheckTable = ({ name, tableData, action, status }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);


  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {name}
        </div>
        <button className="bg-[#4318ff] text-white px-2 py-1 rounded">
          See All
        </button>
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden  max-h-[340px]">
        <table className="w-full" variant="simple" color="gray-500" mb="24px">
          <thead>
            <tr>
              <th className="border-b border-gray-200 pb-[10px] text-center dark:!border-navy-700">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                  Company Name
                </div>
              </th>
              <th className="border-b border-gray-200 pb-[10px] text-center dark:!border-navy-700">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                Position
                </div>
              </th>
              <th className="border-b border-gray-200 pb-[10px] text-center dark:!border-navy-700">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs ">
                  Type
                </div>
              </th>
              <th className="border-b border-gray-200 pb-[10px] text-center dark:!border-navy-700">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                  Status
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
          

            {tableData?.map((row) => (
              <tr key={row.internshipId}>
                <td className="text-sm font-bold text-navy-700 dark:text-white text-center">
                  {row.internship?.name}
                </td>
                <td className="pt-[15px] pb-[16px] sm:text-[14px] text-center">
                  {row.internship?.position}
                </td>
                <td className="pt-[15px] pb-[16px] sm:text-[14px] text-center">
                  {row.internship?.type}
                </td>
                <td className="pt-[15px] pb-[16px] sm:text-[14px] text-center">
                  {row.status}
                </td>
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
