import { useSelector } from "react-redux";
import Axios from "axios";
import { useState, useEffect } from "react";

import CheckTable from "../../default/components/CheckTable";

const Dashboard = () => {

  const [DeliveredData, setDeliveredData] = useState([]);

  const DeliveredOrders = async () => {
    try {
      const response = await Axios.get(`${import.meta.env.VITE_REACT_API_URL}api/delivered/orders`, {
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
        // console.log("ooopppssss");
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    DeliveredOrders();
  }, [url, Date]);

  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5 xll:grid-cols-2">
        <div>
          <CheckTable
            name="Applied Works"
            tableData={DeliveredData}
            action={null}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
