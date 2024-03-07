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
import CheckTablePostedWorks from "../default/components/CheckTablePostedWorks";
import tableDataCheck from "./variables/tableDataCheck.json";
import Banner1 from "../marketplace/components/Banner";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllInterships } from "../../../api/company";
import { getAllApprovedApplicants } from "../../../api/intership";

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
    queryKey: ["interships"], // Include user.uid in the query key
    queryFn: () => getAllInterships(), // Call fetchEventsById with user.uid
  });


  const {
    data: applicants,
  } = useQuery({
    queryKey: ["approvedApplicants"], // Include user.uid in the query key
    queryFn: () => getAllApprovedApplicants(), // Call fetchEventsById with user.uid
  });
  
  const PendingOrders = async () => {
    try {
      // const response = await Axios.get(`/api/pending/orders`, {
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
          setPendingData(dataWithDate);
        }
        if (Date2 === "thismonth") {
          const dataWithDate = filteredData.filter(
            (order) => order.createdat.split("T")[0].slice(0, 7) === Date
          );
          setPendingData(dataWithDate);
        }
        if (Date2 === "thisyear") {
          const dataWithDate = filteredData.filter(
            (order) => order.createdat.split("T")[0].slice(0, 4) === Date
          );
          setPendingData(dataWithDate);
        }
        if (Date === "total") {
          setPendingData(filteredData);
        }
      } else {
        console.log("ooooopppppsssss");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    PendingOrders();
  }, [url, Date]);

  // const PickupOrders = async () => {
  //   try {
  //     const response = await Axios.get(`/api/pickup/orders`, {
  //       withCredentials: true,
  //     });
  //     if (response.status === 200) {
  //       const filteredData = response.data.filter(
  //         (order) => order.servicelocation === url
  //       );
  //       if (Date2 === "today") {
  //         const dataWithDate = filteredData.filter(
  //           (order) => order.createdat.split("T")[0] === Date
  //         );
  //         setPickupData(dataWithDate);
  //       }
  //       if (Date2 === "thismonth") {
  //         const dataWithDate = filteredData.filter(
  //           (order) => order.createdat.split("T")[0].slice(0, 7) === Date
  //         );
  //         setPickupData(dataWithDate);
  //       }
  //       if (Date2 === "thisyear") {
  //         const dataWithDate = filteredData.filter(
  //           (order) => order.createdat.split("T")[0].slice(0, 4) === Date
  //         );
  //         setPickupData(dataWithDate);
  //       }
  //       if (Date === "total") {
  //         setPickupData(filteredData);
  //       }
  //     } else {
  //       console.log("ooooopppppsssss");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   PickupOrders();
  // }, [url, Date]);

  const ReceivedOrders = async () => {
    try {
      const response = await Axios.get(`/api/received/orders`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const filteredData = response.data.filter(
          (order) => order.servicelocation === url
        );
        if (Date2 === "today") {
          const dataWithDate = filteredData.filter(
            (order) => order.createdat.split("T")[0] === Date
          );
          setReceivedData(dataWithDate);
        }
        if (Date2 === "thismonth") {
          const dataWithDate = filteredData.filter(
            (order) => order.createdat.split("T")[0].slice(0, 7) === Date
          );
          setReceivedData(dataWithDate);
        }
        if (Date2 === "thisyear") {
          const dataWithDate = filteredData.filter(
            (order) => order.createdat.split("T")[0].slice(0, 4) === Date
          );
          setReceivedData(dataWithDate);
        }
        if (Date === "total") {
          setReceivedData(filteredData);
        }
      } else {
        console.log("ooooopppppsssss");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    ReceivedOrders();
  }, [url, Date]);

  const DeliveredOrders = async () => {
    try {
      // const response = await Axios.get(`/api/delivered/orders`, {
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
          setDeliveredData(dataWithDate);
        }
        if (Date2 === "thismonth") {
          const dataWithDate = filteredData.filter(
            (order) => order.createdat.split("T")[0].slice(0, 7) === Date
          );
          setDeliveredData(dataWithDate);
        }
        if (Date2 === "thisyear") {
          const dataWithDate = filteredData.filter(
            (order) => order.createdat.split("T")[0].slice(0, 4) === Date
          );
          setDeliveredData(dataWithDate);
        }
        if (Date === "total") {
          setDeliveredData(filteredData);
        }
      } else {
        console.log("ooopppssss");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    DeliveredOrders();
  }, [url, Date]);

  const TotalOrders = async () => {
    try {
      const response = await Axios.get(`/api/total/orders`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const filteredData = response.data.filter(
          (order) => order.servicelocation === url
        );
        if (Date2 === "today") {
          const dataWithDate = filteredData.filter(
            (order) => order.createdat.split("T")[0] === Date
          );
          setTotalData(dataWithDate);
          const todayEarnings = dataWithDate.reduce(
            (accumulator, order) => accumulator + order.price,
            0
          );
          setEarning(todayEarnings);
        }
        if (Date2 === "thismonth") {
          const dataWithDate = filteredData.filter(
            (order) => order.createdat.split("T")[0].slice(0, 7) === Date
          );
          setTotalData(dataWithDate);
          const monthlyEarnings = dataWithDate.reduce(
            (accumulator, order) => accumulator + order.price,
            0
          );
          setEarning(monthlyEarnings);
        }
        if (Date2 === "thisyear") {
          const dataWithDate = filteredData.filter(
            (order) => order.createdat.split("T")[0].slice(0, 4) === Date
          );
          setTotalData(dataWithDate);
          const yearlyEarnings = dataWithDate.reduce(
            (accumulator, order) => accumulator + order.price,
            0
          );
          setEarning(yearlyEarnings);
        }
        if (Date === "total") {
          setTotalData(filteredData);
          const totalEarnings = filteredData.reduce(
            (accumulator, order) => accumulator + order.price,
            0
          );
          setEarning(totalEarnings);
        }
      } else {
        console.log("ooopppppssss.......error");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    TotalOrders();
  }, [url, Date]);

  const pieChartData = [
    PendingData.length,
    PickupData.length,
    ReceivedData.length,
    DeliveredData.length,
  ];

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
        <Widget
          icon={<GrSchedules className="h-7 w-7" />}
          title={"Registered Applicants"}
          subtitle={ReceivedData.length}
        />
        <Widget
          icon={<MdOutlineTask className="h-6 w-6" />}
          title={"Posted Works"}
          subtitle={internships?.length}
        />
        <Widget
          icon={<MdOutlinePendingActions className="h-7 w-7" />}
          title={"Shortlisted"}
          subtitle={applicants?.length}
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
          <CheckTable
            name="Shortlisted"
            tableData={ReceivedData}
            action="Delivery"
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
