import MiniCalendar from "../../../../components/calendar/MiniCalendar";

import { useSelector } from "react-redux";
import Axios from "axios";
import { useState, useEffect } from "react";

// import { columnsDataCheck } from "../../tables/variables/columnsData";

import CheckTable from "../../default/components/CheckTable";
import { useParams } from "react-router-dom";



const Dashboard = () => {
  const {id} = useParams();
  const url = useSelector((state) => state.shop.value2);
  const Date = useSelector((state) => state.date.value);
  const Date2 = useSelector((state) => state.date.value2);
  const [PendingData, setPendingData] = useState([]);
  const [ReceivedData, setReceivedData] = useState([]);


  return (
    <div className="mt-2">
      {/* table */}

        {/* {addInternship.name} {addInternship.title} */}
        ABC
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div>
          <CheckTable
            name="Applied Works"
            tableData={PendingData}
            action="Pick up"
            status="update/pending/topickup"
          />
        </div>
        <div>
          <CheckTable
            name="Shortlisted"
            tableData={ReceivedData}
            action="Delivery"
            status="update/received/todelivery"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
