import MiniCalendar from "../../../../components/calendar/MiniCalendar";

import { useSelector } from "react-redux";
import Axios from "axios";
import { useState, useEffect } from "react";

// import { columnsDataCheck } from "../../tables/variables/columnsData";

import CheckTable from "../../default/components/CheckTable";

const Dashboard = () => {
  const url = useSelector((state) => state.shop.value2);
  const Date = useSelector((state) => state.date.value);
  const Date2 = useSelector((state) => state.date.value2);
  const [PendingData, setPendingData] = useState([]);

  const PendingOrders = async () => {
    try {
      const response = await Axios.get(`/api/pending/orders`, {
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
