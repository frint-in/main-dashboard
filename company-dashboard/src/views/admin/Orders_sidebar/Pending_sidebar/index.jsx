import MiniCalendar from "../../../../components/calendar/MiniCalendar";

import { useSelector } from "react-redux";
import Axios from "axios";
import { useState, useEffect } from "react";

// import { columnsDataCheck } from "../../tables/variables/columnsData";

import CheckTable from "../../default/components/CheckTable";
import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getUsersWithIntershipId } from "../../../../api/intership";

import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const Dashboard = () => {
  const { id } = useParams();

  const [PendingData, setPendingData] = useState([]);
  const [ReceivedData, setReceivedData] = useState([]);

  const {
    isLoading,
    isError,
    data: intership_users,
    error,
  } = useQuery({
    queryKey: ["intershipUsers", id],
    queryFn: () => getUsersWithIntershipId(id),
  });

  // console.log("intership_users>>>>>>>>", intership_users);

  const filteredApplications = (status) => {
    return intership_users
      ? intership_users.filter((app) => app.applicationsStatus === status)
      : [];
  };

  const pendingApplications = filteredApplications("pending");
  const approvedApplications = filteredApplications("approved");
  const completedApplications = filteredApplications("completed");

  // console.log("pendingApplications>>>>>>", pendingApplications);
  // console.log("approvedApplications>>>>>>", approvedApplications);

  return (
    <div className="mt-2">
      {/* table */}
      <div>
        {/* Display companyName only if it's available */}
        {isLoading ? (
          <CircularProgress isIndeterminate color="green.300" />
        ) : (
          <>
            {intership_users.length > 0 && (
              <div>
                {intership_users[0]?.companyName.toUpperCase() ||
                  "Company Name"}
              </div>
            )}
            <div className="mt-5 grid grid-cols-1 gap-5">
              {pendingApplications && (
                <CheckTable
                  intershipId={id}
                  name="Applied Works"
                  tableData={pendingApplications}
                  action="Approve"
                  status="update/pending/topickup"
                />
              )}
            </div>
            <div className="mt-5 grid grid-cols-1 gap-5">
              {approvedApplications && (
                <CheckTable
                  intershipId={id}
                  name="Shortlisted"
                  tableData={approvedApplications}
                  action="Hire"
                  status="update/received/todelivery"
                />
              )}
            </div>
            <div className="mt-5 grid grid-cols-1 gap-5">
              {completedApplications && (
                <CheckTable
                  intershipId={id}
                  name="Hired"
                  tableData={completedApplications}
                  action="Complete"
                  // status="update/received/todelivery"
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
