

import { useSelector } from 'react-redux'
import Axios from "axios";
import { useState, useEffect } from "react";



import CheckTable from "../../default/components/CheckTable";


const Dashboard = () => {
  const url = useSelector((state) => state.shop.value2)
  const Date = useSelector((state) => state.date.value)
  const Date2 = useSelector((state) => state.date.value2)
const [ReceivedData, setReceivedData] = useState([]);


 

  


  return (
    <div>
      

      {/* table */}

      <div className="mt-5 grid grid-cols-1 gap-5 xll:grid-cols-2">

      <div>
          <CheckTable
            name="Ongoing Works"
            tableData={ReceivedData}
            action= "Delivery"
            status= "update/received/todelivery"
          />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
