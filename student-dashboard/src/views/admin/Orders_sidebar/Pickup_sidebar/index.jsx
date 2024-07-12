import MiniCalendar from "../../../../components/calendar/MiniCalendar";

import { useSelector } from 'react-redux'
import Axios from "axios";
import { useState, useEffect } from "react";

// import { columnsDataCheck } from "../../tables/variables/columnsData";


import CheckTable from "../../default/components/CheckTable";


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserCompletedApplications} from "../../../../api/student";
import axios from "axios";
import axiosInstance from "../../../../utils/axiosIntance";

const Dashboard = () => {

const [completed, setCompleted] = useState([]);

const myinternships = async()=>{
  try {
    const internships = await axiosInstance.get(`${import.meta.env.VITE_REACT_API_URL}api/user/finduserbytoken`,
  { withCredentials: true }
    )
    const data = internships.data



    const completedApplications = data.applications.filter(
      (application) => application.status === 'completed'
    );

    setCompleted(completedApplications)

    
  } catch (error) {
    alert(error);
    // console.log(error)
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
            name="Completed Works"
            tableData={completed}
            action= "Received"
            status = "update/pickup/toreceived"
          />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
