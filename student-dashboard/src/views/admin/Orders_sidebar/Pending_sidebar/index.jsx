import MiniCalendar from "../../../../components/calendar/MiniCalendar";

import { useSelector } from "react-redux";
import Axios from "axios";
import { useState, useEffect } from "react";

// import { columnsDataCheck } from "../../tables/variables/columnsData";

import CheckTable from "../../default/components/CheckTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserPendingApplications } from "../../../../api/student";
import axios from "axios";
const Dashboard = () => {
  // const url = useSelector((state) => state.shop.value2);
  // const Date = useSelector((state) => state.date.value);
  // const Date2 = useSelector((state) => state.date.value2);
  const [PendingData, setPendingData] = useState([]);

  const myinternships = async()=>{
    try {
      const internships = await axios.get(`${import.meta.env.VITE_REACT_API_URL}api/user/finduserbytoken`,
    { withCredentials: true }
      )
      const data = internships.data

      const pendingApplications = data.applications.filter(
        (application) => application.status === 'pending'
      );

      setPendingData(pendingApplications)

      

      
    } catch (error) {
      console.log(error)
    }
    
  
  }

  useEffect(()=>{
    myinternships()
  },[])

  return (
    <div>
      {/* table */}

      <div className="mt-5 grid grid-cols-1 gap-5 xll:grid-cols-2">
        <div>
          <CheckTable
            name="Applied Works"
            tableData={PendingData}
            action="Pick up"
            status="update/pending/topickup"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
