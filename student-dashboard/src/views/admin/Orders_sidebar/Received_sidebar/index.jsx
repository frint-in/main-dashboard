

import { useSelector } from 'react-redux'
import Axios from "axios";
import { useState, useEffect } from "react";



import CheckTable from "../../default/components/CheckTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudentByToken, getUserApprovedApplications, getUserCompletedApplications, getUserPendingApplications } from "../../../../api/student";
import axios from 'axios';


const Dashboard = () => {

const [approved, setApproved] = useState([]);

const myinternships = async()=>{
  try {
    const internships = await axios.get(`${import.meta.env.VITE_REACT_API_URL}api/user/finduserbytoken`,
  { withCredentials: true }
    )
    const data = internships.data


    const approvedApplications = data.applications.filter(
      (application) => application.status === 'approved'
    );

    setApproved(approvedApplications)

    
  } catch (error) {
    console.log(error)
  }
  

}
useEffect(()=>{
  myinternships()
})

  


  return (
    <div>
      

      {/* table */}

      <div className="mt-5 grid grid-cols-1 gap-5 xll:grid-cols-2">

      <div>
          <CheckTable
            name="Ongoing Works"
            tableData={approved}
            action= "Delivery"
            status= "update/received/todelivery"
          />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
