import { useSelector } from "react-redux";
import Axios from "axios";
import { useState, useEffect } from "react";

import CheckTable from "../../default/components/CheckTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserPendingApplications } from "../../../../api/student";

const Dashboard = () => {
  const [DeliveredData, setDeliveredData] = useState([]);


  const {
    data: pending_applications,
  } = useQuery({
    queryKey: ["pending"], 
    queryFn: () => getUserPendingApplications(), 
  });


  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5 xll:grid-cols-2">
        <div>
          <CheckTable
            name="Applied Works"
            tableData={pending_applications}
            action={null}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
