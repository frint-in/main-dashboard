import MiniCalendar from "../../../../components/calendar/MiniCalendar";

import { useSelector } from "react-redux";
import Axios from "axios";
import { useState, useEffect } from "react";

// import { columnsDataCheck } from "../../tables/variables/columnsData";

import CheckTable from "../../default/components/CheckTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserPendingApplications } from "../../../../api/student";
const Dashboard = () => {
  // const url = useSelector((state) => state.shop.value2);
  // const Date = useSelector((state) => state.date.value);
  // const Date2 = useSelector((state) => state.date.value2);
  const [PendingData, setPendingData] = useState([]);

  const {
    data: pending_applications,
  } = useQuery({
    queryKey: ["pending"], 
    queryFn: () => getUserPendingApplications(), 
  });


  return (
    <div>
      {/* table */}

      <div className="mt-5 grid grid-cols-1 gap-5 xll:grid-cols-2">
        <div>
          <CheckTable
            name="Applied Works"
            tableData={pending_applications}
            action="Pick up"
            status="update/pending/topickup"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
