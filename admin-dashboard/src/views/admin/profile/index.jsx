import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";
import TaskCard from "./components/TaskCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCompanyDetails } from "@/state/companySlice";
import axiosInstance from "@/utils/axiosIntance";

const ProfileOverview = () => {
  const [posted, setPosted] = useState([]);

  const companyDetails = useSelector(selectCompanyDetails);


  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_REACT_API_URL}api/company/getAllInternship`,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setPosted(res.data.internships);
    };
    fetchData();
  }, []);

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-4 lg:!mb-0">
          <Banner
            name={companyDetails.name}
            internship={posted?.length}
            image={companyDetails.imgurl}
          />
        </div>

        <div className="z-0 col-span-8 lg:!mb-0">
          {/* <Upload /> */}
          <General
            description={companyDetails.description}
            catagory={companyDetails.catagories}
            website={companyDetails.website}
            location={companyDetails.location}
            email={companyDetails.email}
            phono={companyDetails.phono}
          />
        </div>
        {/* <div className="col-span-5 lg:!mb-0">
          <Storage />
          <TaskCard />
        </div>
      </div>
      all project & ...

      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <Project />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-7">
          <General />
        </div>

        <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
          <Notification />
        </div> */}
      </div>
    </div>
  );
};

export default ProfileOverview;
