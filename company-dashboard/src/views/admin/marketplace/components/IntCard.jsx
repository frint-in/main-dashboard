import React from "react";
import { Link } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa";

const IntCard = (props) => {
  return (
    <div className="block h-64 border border-black w-80 rounded-lg p-2 m-4 md:m-2 md:flex">
      <Link to={props.link} className="flex-shrink-0 w-full">
        <div
          className="w-76 h-80 rounded-lg p-4"
          style={{ backgroundColor: props.color }}
        >
          <div className="flex justify-between items-center">
            <div className="bg-white p-2 rounded-full">{props.date}</div>
            <div className="bg-white flex items-center justify-center w-8 h-8 rounded-full">
              <FaRegBookmark />
            </div>
          </div>
          <div className="font-bold text-2xl pt-4">{props.company}</div>
          <div className="text-3xl">{`${props.level} ${props.title}`}</div>
          <div className="flex flex-wrap justify-between">
            {props.tag &&
              props.tag.map((tagItem, index) => (
                <div
                  key={index}
                  className="border border-black bg-transparent rounded-lg text-sm m-2 p-2"
                >
                  {tagItem}
                </div>
              ))}
          </div>
        </div>
        <div className="flex justify-between items-center p-4">
          <div className="text-sm">
            <b>Stipend: ₹ {props.stipend} </b>
            <br />
            <p className="text-gray-700">{props.location}</p>
          </div>
          <Link
            className="bg-black text-white px-4 py-2 rounded-lg"
            to={props.link}
          >
            Details
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default IntCard;
