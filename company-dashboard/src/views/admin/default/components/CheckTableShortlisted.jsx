import React, { useEffect, useMemo, useState } from "react";
// import CardMenu from "../../../../components/card/CardMenu";
// import Checkbox from "../../../../components/checkbox/index";
import Card from "../../../../components/card/index";
import axios from "axios";
import { FcApproval } from "react-icons/fc";
import Popup from "../../../../components/popup/Popup";
import {useNavigate} from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { approveUserByIntershipId, completeUserByIntershipId } from "../../../../api/intership";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const CheckTable = ({ intershipId,name, tableData, action, status }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const navigate = useNavigate()
  const queryClient = useQueryClient();

  const handleUserClick = (id) => { 
    // console.log('userId', id);

    navigate(`/admin/student details/${id}`)
   }


   const updateApprovedStatusMutation = useMutation({
    mutationFn: approveUserByIntershipId,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['intershipUsers']});
      // console.log("success bro!")
    }
  });

  const updateCompletedStatusMutation = useMutation({
    mutationFn: completeUserByIntershipId,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['intershipUsers']});
      // console.log("success bro!")
    }
  });


   const handleButtonSubmit = async (action, userId) => { 
        if (action === 'Approve') {
          // console.log('approved');

          // console.log(userId);
          // updateApprovedStatusMutation.mutate(intershipId, userId)
          const response = await axios.post(`/api/internship/updatetoapprove/${intershipId}`, {
              id: userId
          });

          if (response) {
            queryClient.invalidateQueries({ queryKey: ['intershipUsers']});
          }

          const data = response.data;
          // console.log("data>>>>", data);
      
        
          return data;
        } else {
          // console.log('completed');
          // updateCompletedStatusMutation.mutate(userId)
          const response = await axios.post(`/api/internship/updatetocomplete/${intershipId}`, {
            id: userId
        });

        if (response) {
          queryClient.invalidateQueries({ queryKey: ['intershipUsers']});
        }

        const data = response.data;
        // console.log("data>>>>", data);
    
      
        return data;
        }
    }




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
              <th className="border-b border-gray-200 pr-16 pb-[10px] text-center dark:!border-navy-700">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                  Name
                </div>
              </th>
              <th className="border-b border-gray-200 pr-16 pb-[10px] text-center dark:!border-navy-700">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                  Phone
                </div>
              </th>
              <th className="border-b border-gray-200 pr-16 pb-[10px] text-center dark:!border-navy-700">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                  Email
                </div>
              </th>
              <th className="border-b border-gray-200 pr-16 pb-[10px] text-center dark:!border-navy-700">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                  Specialization
                </div>
              </th>
              <th className="border-b border-gray-200 pr-16 pb-[10px] text-center dark:!border-navy-700">
                <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                  Status
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((row, _id) => (
              <tr key={row.userId}>
                <td className="text-sm font-bold text-navy-700 dark:text-white" onClick={() => handleUserClick(row.userId)}>
                  {row.uname}
                </td>
                <td className="pt-[15px] pb-[16px] sm:text-[14px]" onClick={() => handleUserClick(row.userId)}>
                  {row?.phoneNumber || 'not given'}
                </td>
                <td className="pt-[15px] pb-[16px] sm:text-[14px]" onClick={() =>handleUserClick(row.userId)}>
                  {row?.email}
                </td>
                <td className="pt-[15px] pb-[16px] sm:text-[14px]" onClick={() =>handleUserClick(row.userId)}>
                  {row?.specialization || 'not given'}
                </td>
                <td className="pt-[15px] pb-[16px] sm:text-[14px]">
                  {action}
                </td>
                {/* <td className="pt-[15px] pb-[16px] sm:text-[14px]">
                  <button
                    className="bg-[#4318ff] text-white px-2 py-1 rounded"
                    onClick={(e) => pickup(row)}
                  >
                    {action}
                  </button>
                  <FcApproval className="text-[2rem]"/>
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
