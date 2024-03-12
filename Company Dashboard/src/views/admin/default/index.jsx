import MiniCalendar from "../../../components/calendar/MiniCalendar";
import PieChartCard from "./components/PieChartCard";
import { useSelector } from "react-redux";
import { MdOutlinePendingActions, MdOutlineTask } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import { MdBarChart } from "react-icons/md";
import { PiPackageLight } from "react-icons/pi";
import { BiCheckDouble } from "react-icons/bi";
import { GrDeliver } from "react-icons/gr";
import Axios from "axios";
import { useState, useEffect } from "react";

import { columnsDataCheck } from "./variables/columnsData";

import Widget from "../../../components/widget/Widget";
import CheckTableShortlisted from "../default/components/CheckTableShortlisted";
import CheckTablePostedWorks from "../default/components/CheckTablePostedWorks";
import tableDataCheck from "./variables/tableDataCheck.json";
import Banner1 from "../marketplace/components/Banner";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllInterships } from "../../../api/company";
import { getAllApprovedApplicants, getAllPendingApplicants } from "../../../api/intership";

const Dashboard = () => {
  const url = useSelector((state) => state.shop.value2);
  const Date = useSelector((state) => state.date.value);
  const Date2 = useSelector((state) => state.date.value2);
  const [PendingData, setPendingData] = useState([]);
  const [PickupData, setPickupData] = useState([]);
  const [ReceivedData, setReceivedData] = useState([]);
  const [DeliveredData, setDeliveredData] = useState([]);
  const [TotalData, setTotalData] = useState([]);
  const [Earning, setEarning] = useState([]);

  const {
    isLoading,
    isError,
    data: internships,
    error,
  } = useQuery({
    queryKey: ["interships"],
    queryFn: () => getAllInterships(), 
  });


  const {
    data: approved_applicants,
  } = useQuery({
    queryKey: ["approvedApplicants"], 
    queryFn: () => getAllApprovedApplicants(), 
  });


  const {
    data: pending_applicants,
  } = useQuery({
    queryKey: ["pendingApplicants"], 
    queryFn: () => getAllPendingApplicants(), 
  });

  const {
    data: completed_applicants,
  } = useQuery({
    queryKey: ["completedApplicants"], 
    queryFn: () => getAllPendingApplicants(), 
  });



  const pieChartData = [
    pending_applicants?.length,
    completed_applicants?.length,
    approved_applicants?.length,
  ];

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
        <Widget
          icon={<GrSchedules className="h-7 w-7" />}
          title={"Registered Applicants"}
          subtitle={pending_applicants?.length}
        />
        <Widget
          icon={<MdOutlineTask className="h-6 w-6" />}
          title={"Posted Works"}
          subtitle={internships?.length}
        />
        <Widget
          icon={<MdOutlinePendingActions className="h-7 w-7" />}
          title={"Shortlisted"}
          subtitle={approved_applicants?.length}
        />
      </div>

      {/* table */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* <div>
          <CheckTable name="Total Works" tableData={TotalData} action={null} />
        </div> */}
        <Banner1 />
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
          {/* <TaskCard /> */}
          <PieChartCard pieChartData={pieChartData} />
        </div>
        {/* <div>
          <CheckTable
            name="Application"
            tableData={PendingData}
            action="Pick up"
            status="update/pending/topickup"
          />
        </div> */}
        <div>
          <CheckTablePostedWorks/>
          
        </div>
        <div>
          <CheckTableShortlisted
            name="Shortlisted"
            tableData={approved_applicants}
            action="Approved"
            status="update/received/todelivery"
          />
        </div>
        {/* <div>
          <CheckTable
            name="Rejected Works"
            tableData={DeliveredData}
            action={null}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
