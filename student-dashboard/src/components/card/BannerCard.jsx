import React from 'react'
import Card from '../card'
import NFt3 from "../../assets/img/nfts/Nft3.png";
import { GiStopwatch } from 'react-icons/gi';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';


function BannerCard({date, company, type, heart}) {
  return (
    <Card
    // extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    className={`!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white`}
  > 
          <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src={NFt3}
            className="mb-3 h-72 w-full rounded-xl 3xl: 3xl:w-full"
            alt=""
          />
          <div className="absolute top-3 left-3 bg-white dark:bg-navy-700 p-2 rounded-full flex items-center gap-2">
            <GiStopwatch color="red" /> {date}
          </div>
          <div className="absolute top-11 left-3 font-bold text-2xl pt-4 text-white">
            {company}
          </div>
          {/* <div className="flex items-center justify-center">
            <img
              src={logo}
              alt=""
              className="absolute top-20 right-2 w-3/6 h-auto p-2"
            />
          </div> */}
            <div className="absolute top-32 left-3 flex flex-wrap justify-between">
              <div className="border border-black bg-transparent rounded-lg text-lg m-2 pl-2 pr-2 pt-1 pb-1 text-white">
                {type}
              </div>
            </div>
          {/* <button
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
          </button> */}
        </div>
        </div>

    </Card>
  )
}

export default BannerCard