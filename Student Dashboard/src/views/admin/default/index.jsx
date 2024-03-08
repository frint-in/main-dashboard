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
import CheckTable from "../default/components/CheckTable";
import tableDataCheck from "./variables/tableDataCheck.json";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudentByToken, getUserApprovedApplications, getUserCompletedApplications, getUserPendingApplications } from "../../../api/student";


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

  const PickupOrders = async () => {
    try {
      // const response = await Axios.get(`/api/pickup/orders`, {
      //   withCredentials: true,
      // });
      if (response.status === 200) {
        const filteredData = response.data.filter(
          (order) => order.servicelocation === url
        );
        if (Date2 === "today") {
          const dataWithDate = filteredData.filter(
            (order) => order.createdat.split("T")[0] === Date
          );
          setPickupData(dataWithDate);
        }
        if (Date2 === "thismonth") {
          const dataWithDate = filteredData.filter(
            (order) => order.createdat.split("T")[0].slice(0, 7) === Date
          );
          setPickupData(dataWithDate);
        }
        if (Date2 === "thisyear") {
          const dataWithDate = filteredData.filter(
            (order) => order.createdat.split("T")[0].slice(0, 4) === Date
          );
          setPickupData(dataWithDate);
        }
        if (Date === "total") {
          setPickupData(filteredData);
        }
      } else {
        console.log("ooooopppppsssss");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const {
    data: student,
  } = useQuery({
    queryKey: ["student"], 
    queryFn: () => getStudentByToken(), 
  });


  const {
    data: pending_applications,
  } = useQuery({
    queryKey: ["pending"], 
    queryFn: () => getUserPendingApplications(), 
  });

  const {
    data: approved_applications,
  } = useQuery({
    queryKey: ["approved"], 
    queryFn: () => getUserApprovedApplications(), 
  });

  const {
    data: completed_applications,
  } = useQuery({
    queryKey: ["completed"], 
    queryFn: () => getUserCompletedApplications(), 
  });

  console.log('the logged in user',student );



  const pieChartData = [
    pending_applications?.length,
    approved_applications?.length,
    completed_applications?.length,
  ];

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
        <Widget
          icon={<GrSchedules className="h-7 w-7" />}
          title={"Applied"}
          subtitle={pending_applications?.length}
        />
        <Widget
          icon={<MdOutlineTask className="h-6 w-6" />}
          title={"Completed"}
          subtitle={completed_applications?.length}
        />
        <Widget
          icon={<MdOutlinePendingActions className="h-7 w-7" />}
          title={"Ongoing"}
          subtitle={approved_applications?.length}
        />
      </div>

      {/* table */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* <div>
          <CheckTable name="Total Works" tableData={TotalData} action={null} />
        </div> */}
        <div>
          <CheckTable
            name="Applied Works"
            tableData={pending_applications}
            action="Pick up"
            status="update/pending/topickup"
          />
        </div>
        <div>
          <CheckTable
            name="Completed Works"
            tableData={completed_applications}
            action="Received"
            status="update/pickup/toreceived"
          />
        </div>
        <div>
          <CheckTable
            name="Ongoing Works"
            tableData={approved_applications}
            action="Delivery"
            status="update/received/todelivery"
          />
        </div>
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
          {/* <TaskCard /> */}
          <PieChartCard pieChartData={pieChartData} />
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
