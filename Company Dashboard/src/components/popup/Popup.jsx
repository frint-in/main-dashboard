import React, { useState, useEffect } from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import { AutoComplete } from "primereact/autocomplete";


export default function Popup({ setShowModal, order }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [option, setOption] = useState([]);
  const [value, setValue] = useState("");
  const [suggestionsList, setSuggestions] = useState([]);

  const popup = () => {
    setShowModal(false);
  };

  const fetchOptions = async () => {
    try {
      const response = await axios.get(`/api/finditems`, {
      withCredentials: true,
      });
      if (response.status===200) {
        const names = response.data.map((item) => item.item);
        setOption(names);
        // console.log(names)
        // console.log(option)
      } else {
        console.log("error")
      }
      
      
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);


  const search = (event) => {
    const inputValue = event.query.toLowerCase();
    const filteredOptions = option.filter(
      (item) => item.toLowerCase().includes(inputValue)
    );
    setSuggestions(filteredOptions);
  };
  

  const handleDeleteItem = (index) => {
    const updatedItems = [...addedItems];
    updatedItems.splice(index, 1);
    setAddedItems(updatedItems);
  };


  const handleAddItem = () => {
    if (selectedOption && itemQuantity) {
      const newItem = {
        name: selectedOption,
        quantity: parseInt(itemQuantity),
      };
      console.log(newItem)
      setAddedItems((prevItems) => [...prevItems, newItem]);
      setSelectedOption("");
      setItemQuantity("");
    }
  };


  const handleFinalSubmit = async () => {
    const orderItems = addedItems.map((item, _id) => ({
      item: item.name,
      quantity: item.quantity,
    }));


    setAddedItems([]);

    if (orderItems) {
      try {
        
        await axios.post(
          `/api/calculateprice/${order}`,
          { items: orderItems },
          { withCredentials: true }
        );

       
        const response = await axios.put(
          `/api/update/pickup/toreceived/${order}`,
          {},
          { withCredentials: true }
        );

        alert("Order Received");
        setShowModal(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("data not submitted");
      }
    }

    
    setAddedItems(null);
    setShowModal(false);
  };


  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm">
        <div className="relative w-auto my-6 mx-auto max-w-3xl ">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:!bg-navy-800 dark:text-white">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Add Items</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={popup}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <div className="flex items-center justify-center flex-wrap gap-5">
                <div>


                  <AutoComplete panelClassName="backdrop-blur" required placeholder="Item" value={selectedOption} suggestions={suggestionsList} completeMethod={search} onChange={(e) => setSelectedOption(e.value)} itemTemplate={(item) => <div>{item}</div>} field="item" delay={0}
                   className="input mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                   inputClassName="border-none outline-none"
                   scrollHeight="8rem"
                   />

                </div>
                <div> 
                  <input
                    placeholder="quantity"
                    className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                    type="number"
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleAddItem}>Add Item</button>

            <div className="mt-4 p-4 border rounded">
              <h4 className="text-lg font-semibold mb-2">Added Items</h4>

              <ul className="flex flex-col items-start">
                {addedItems.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item.name} - Quantity: {item.quantity}
                    <button
                      className="ml-2 text-red-500"
                      onClick={() => handleDeleteItem(index)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={popup}
              >
                Close
              </button>
              <button
                className="bg-[#4318ff] text-white px-2 py-2 rounded"
                type="button"
                onClick={handleFinalSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
