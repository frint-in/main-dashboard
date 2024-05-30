import Banner from "./components/Banner";
import NFt2 from "../../../assets/img/nfts/Nft2.png";
import NFt4 from "../../../assets/img/nfts/Nft4.png";
import NFt3 from "../../../assets/img/nfts/Nft3.png";
import NFt5 from "../../../assets/img/nfts/Nft5.png";
import NFt6 from "../../../assets/img/nfts/Nft6.png";
import avatar1 from "../../../assets/img/avatars/avatar1.png";
import avatar2 from "../../../assets/img/avatars/avatar2.png";
import avatar3 from "../../../assets/img/avatars/avatar3.png";

import tableDataTopCreators from "./variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "./variables/tableColumnsTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "../../../components/card/NftCard";
import IntCard from "./components/IntCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllInterships } from "../../../api/company";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";
const Marketplace = () => {
  const [internships, setInternships] = useState([]);
  const colors = [
    "#FFDBB0",
    "#B6FFB0",
    "#EAB0FF",
    "#B0D9FF",
    "#FFB0B5",
    "#FFF7B0",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}api/company/mycompany`,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setInternships(res.data.internships);
    };
    fetchData();
  }, []);
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* NFt Banner */}
        <Banner />

        {/* NFt Header */}
        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            Posted Internships
          </h4>
          {/* <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                IT
              </a>
            </li>
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                Marketing
              </a>
            </li>
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                Sales
              </a>
            </li>
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                <a href=" ">Design</a>
              </a>
            </li>
          </ul> */}
        </div>

        {/* NFTs trending card */}
        <div className="z-20 grid grid-cols-1 gap-5 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
          {internships?.map((intership, index) => (
            <NftCard
              key={index}
              id={intership._id}
              companyName={intership.companyName}
              mode={intership.mode}
              experience={intership.experience}
              title={intership.name}
              logo={intership.imgurl}
              duration={intership.duration}
              stipend={intership.stipend || "not disclosed"}
              image={NFt3}
              // date={dayjs(intership.createdAt).format("DD-MM-YYYY")}
              date={intership?.deadline}
              company={intership.company.name}
              // tag={["Part-time", "Full-time", "internship"]}
              type={intership.type}
              link1={`/admin/edit internship/${intership._id}`}
              link2={`/admin/applied shorted/${intership._id}`}
              location={intership.location}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
