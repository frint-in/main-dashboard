

import { useSelector } from 'react-redux'
import Axios from "axios";
import { useState, useEffect } from "react";



import CheckTable from "../../default/components/CheckTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudentByToken, getUserApprovedApplications, getUserCompletedApplications, getUserPendingApplications } from "../../../../api/student";


const Dashboard = () => {

const [ReceivedData, setReceivedData] = useState([]);

const {
  data: approved_applications,
} = useQuery({
  queryKey: ["approved"], 
  queryFn: () => getUserApprovedApplications(), 
});
 

  


  return (
    <div>
      

      {/* table */}

      <div className="mt-5 grid grid-cols-1 gap-5 xll:grid-cols-2">

      <div>
          <CheckTable
            name="Ongoing Works"
            tableData={approved_applications}
            action= "Delivery"
            status= "update/received/todelivery"
          />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
