import Card from "../../../../components/card";
import React from "react";
import { Link } from "react-router-dom"

const General = ({description, catagory, website, location, email, phono}) => {
  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          General Information
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600">
          {description}
        </p>
      </div>
      {/* Cards */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 px-2 ">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Category</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {catagory}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Website</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            <Link to="/">{website}</Link>
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Location</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {location}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Email</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {email}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Phone Number</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {phono}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Date of Foundation</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            20 July 2022
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;
