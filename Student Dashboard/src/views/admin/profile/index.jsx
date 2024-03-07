import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";
import TaskCard from "./components/TaskCard";

import { useMutation, useQuery, useQueryClient   } from "@tanstack/react-query";
import { getStudentByToken } from "../../../api/student";



const ProfileOverview = () => {


  const {
    isLoading,
    isError,
    data: student,
    error,
  } = useQuery({
    queryKey: ["student"], 
    queryFn: () => getStudentByToken(), 
  });

  console.log('the logged in user',student );


  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-4 lg:!mb-0">
          <Banner />
        </div>

        <div className="z-0 col-span-3 lg:!mb-0">
          <Upload />
        </div>
        <div className="col-span-5 lg:!mb-0">
          {/* <Storage /> */}
          <TaskCard />
        </div>
      </div>
      {/* all project & ... */}

      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <Project />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-7">
          <General />
        </div>

        {/* <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
          <Notification />
        </div> */}
      </div>
    </div>
  );
};

export default ProfileOverview;
