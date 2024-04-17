

import { useSelector } from 'react-redux'
import Axios from "axios";
import { useState, useEffect } from "react";



import CheckTable from "../../default/components/CheckTable";


const Dashboard = () => {

const [ReceivedData, setReceivedData] = useState([]);

  
  const ReceivedOrders = async () => {
    try {
      const response = await Axios.get(
        `/api/received/orders`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        const filteredData = response.data.filter(order => order.servicelocation === url);
        if (Date2 === "today") {
          const dataWithDate = filteredData.filter(order => order.createdat.split("T")[0] === Date);
          setReceivedData(dataWithDate);

        }if (Date2 === "thismonth") {
          const dataWithDate = filteredData.filter(order => order.createdat.split("T")[0].slice(0, 7) === Date);
          setReceivedData(dataWithDate);

        }if (Date2 === "thisyear") {
          const dataWithDate = filteredData.filter(order => order.createdat.split("T")[0].slice(0, 4) === Date);
          setReceivedData(dataWithDate);

        }if (Date === "total") {
          setReceivedData(filteredData);

        }
        
      }else{
        // console.log('ooooopppppsssss')
      }

    } catch (error) {
      // console.error("Error fetching data:", error);
    }

  };


  useEffect(() => {
    ReceivedOrders();
  }, [url, Date]);


 

  


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
