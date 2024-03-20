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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllInterships } from "../../../api/student";
import dayjs from "dayjs";

const Marketplace = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: internships,
    error,
  } = useQuery({
    queryKey: ["interships"], // Include user.uid in the query key
    queryFn: () => getAllInterships(), // Call fetchEventsById with user.uid
  });
  // console.log("hi2");
  // console.log("data in frontend", internships);

  return (
    <div className="mt-3 grid h-full grid-cols-1">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* NFt Banner */}
        {/* <Banner /> */}

        {/* NFt Header */}
        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            Internships
          </h4>
          <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
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
          </ul>
        </div>

        {/* NFTs trending card */}
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {internships?.map((intership, index) => (
            <NftCard
              key={index}
              id={intership._id}
              title={intership.name}
              logo={intership.imgurl}
              stipend={intership.stipend || "not given"}
              image={NFt3}
              date={dayjs(intership.createdAt).format("DD-MM-YYYY")}
              company={intership.companyName}
              // tag={["Part-time", "Full-time", "internship"]}
              type={intership.type}
              link={`/admin/single internship/${intership._id}`}
              location={intership.location}
            />
          ))}
        </div>

        {/* Recenlty Added setion */}
        {/* <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Freelancing Works
          </h4>
        </div>

        Recently Add NFTs
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          <NftCard
            title="Abstract Colors"
            stipend="3000 per month"
            image={NFt3}
            date="20 July 2024"
            company="Amazon"
            tag={["Part-time", "Full-time", "internship"]}
            link="/"
            location="Guwahati"
          />
        </div> */}
      </div>

      {/* right side section */}

      {/* <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <TopCreatorTable
          extra="mb-5"
          tableData={tableDataTopCreators}
          columnsData={tableColumnsTopCreators}
        />
        <HistoryCard />
      </div> */}
    </div>
  );
};

export default Marketplace;
