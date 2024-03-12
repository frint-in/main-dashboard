import MiniCalendar from "../../../../components/calendar/MiniCalendar";

import { useSelector } from 'react-redux'
import Axios from "axios";
import { useState, useEffect } from "react";

// import { columnsDataCheck } from "../../tables/variables/columnsData";


import CheckTable from "../../default/components/CheckTable";


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserCompletedApplications} from "../../../../api/student";

const Dashboard = () => {

const [PickupData, setPickupData] = useState([]);

const {
  data: completed_applications,
} = useQuery({
  queryKey: ["completed"], 
  queryFn: () => getUserCompletedApplications(), 
});


  


  return (
    <div>
      

      {/* table */}

      <div className="mt-5 grid grid-cols-1 gap-5 xll:grid-cols-2">

      <div>
          <CheckTable
            name="Completed Works"
            tableData={completed_applications}
            action= "Received"
            status = "update/pickup/toreceived"
          />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
