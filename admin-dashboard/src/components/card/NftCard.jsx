import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { GiStopwatch } from "react-icons/gi";
import { useState } from "react";
import Card from "../card";
import { Link } from "react-router-dom";

const   NftCard = ({
  title,
  stipend,
  image,
  link1,
  link2,
  extra,
  date,
  company,
  type,
  mode,
  experience,
  duration,
  location,
  logo,
}) => {
  const [heart, setHeart] = useState(true);
  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src={image}
            className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
          <div className="absolute top-3 left-3 bg-white dark:bg-navy-700 p-2 rounded-full flex items-center gap-2">
            <GiStopwatch color="red" /> {date}
          </div>
          <div className="absolute top-11 left-3 font-bold text-2xl pt-4 text-white">
            {company}
          </div>
          <div className="flex items-center justify-center">
            {/* <img
              src={logo}
              alt=""
              className="absolute top-20 right-2 w-3/6 h-auto p-2"
            /> */}
            <div className="absolute top-32 left-3 flex flex-wrap justify-between">
              <div className="border border-black bg-transparent rounded-lg text-sm m-2 pl-2 pr-2 pt-1 pb-1 text-white">
                {type}
              </div>
              <div className="border border-black bg-transparent rounded-lg text-sm m-2 pl-2 pr-2 pt-1 pb-1 text-white">
                {mode}
              </div>
              <div className="border border-black bg-transparent rounded-lg text-sm m-2 pl-2 pr-2 pt-1 pb-1 text-white">
                {experience}
              </div>
              <div className="border border-black bg-transparent rounded-lg text-sm m-2 pl-2 pr-2 pt-1 pb-1 text-white">
                {duration}
              </div>
            </div>
          </div>
          <button
            onClick={() => setHeart(!heart)}
            className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50 dark:text-navy-900">
              {heart ? (
                <FaRegBookmark />
              ) : (
                <FaBookmark className="text-brand-500" />
              )}
            </div>
          </button>
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {" "}
              {title}{" "}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              Stipend: ₹ {stipend}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="flex">
            <p className="mb-2 text-sm font-bold text-brand-500 dark:text-white">
              Location: {location}
            </p>
          </div>
          <div className="flex gap-2">

          <Link
            // to={`/admin/edit internship/${id}`}
            to={link1}
            className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
          >
            Edit
          </Link>
          <Link
            // to={`/admin/student details/${student._id}`}
            to={link2}
            className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
          >
            Details
          </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NftCard;
