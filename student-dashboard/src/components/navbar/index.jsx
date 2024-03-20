import React, { useState } from "react";
import Dropdown from "../dropdown/index";
import { Link, useNavigate } from "react-router-dom";
// import navbarimage from "assets/img/layout/Navbar.png";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FiAlignJustify } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux'
import { changezooroad, changehengrabari } from "../../feature/Shop/ShopSlice";
import axios from "axios";


import { useMutation, useQuery, useQueryClient   } from "@tanstack/react-query";
import { getStudentByToken } from "../../api/student";



import avatar from "../../assets/img/avatars/avatar4.png";
import { changethismonth, changethisyear, changetoday, changetotal } from "../../feature/Date/DateSlice";
import { deleteAuthChecked, setAuthChecked } from "../../state/authSlice";

const Navbar = (props) => {
  const {
    isLoading,
    isError,
    data: student,
    error,
  } = useQuery({
    queryKey: ["student"], 
    queryFn: () => getStudentByToken(), 
  });

  // console.log('the logged in user',student );

  const navigate = useNavigate()
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = React.useState(false);
  // const Shop = useSelector((state) => state.shop.value);
  // const Date = useSelector((state) => state.date.value);
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const logout = async() => {
    try {
      await axios.post(`/api/auth/logout`, {}, { withCredentials: true });
      // setIsAdminAuthenticated(false);
      setEmail('');
      setPassword('');
      // dispatch(setAuthChecked())
      // localStorage.removeItem("auth");
      dispatch(deleteAuthChecked())

      alert('Logged Out')

      // window.location.reload();
      navigate('/')
      
    } catch (error) {
      // console.error('Error logging out:', error);
    }

  }
  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <Link
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            to=" "
          >
            Welcome 
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
            </span>
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {student?.uname}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[200px] xl:gap-2">

      <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
 
        {/* start Notification */}
        {/* <Dropdown
          button={
            <p className="cursor-pointer">
              <FaLocationDot className="h-4 w-4 text-gray-700 dark:text-white" />
            </p>
          }
          children={
            <div className="flex w-[350px] flex-col gap-2 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <button
                className="px-full linear flex cursor-pointer items-center justify-center rounded-xl border py-[11px] font-bold text-navy-700 transition duration-200 hover:bg-gray-200 hover:text-navy-700 dark:!border-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:active:bg-white/10"
                onClick={() => dispatch(changehengrabari())}
              >
                Hengerabari
              </button>
              <button
                className="px-full linear flex cursor-pointer items-center justify-center rounded-xl border py-[11px] font-bold text-navy-700 transition duration-200 hover:bg-gray-200 hover:text-navy-700 dark:!border-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:active:bg-white/10"
                onClick={() => dispatch(changezooroad())}
              >
                Zoo Road
              </button>
            </div>
          }
          classNames={"py-2 top-6 -left-[250px] md:-left-[330px] w-max"}
          animation="origin-[75%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
        /> */}
        

        <Dropdown
          button={
            <p className="cursor-pointer">
              <IoSettingsSharp className="h-4 w-4 text-gray-700 dark:text-white" />
            </p>
          }
          children={
            <div className="flex w-[350px] flex-col gap-2 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              
              
              <button
                className="px-full linear flex cursor-pointer items-center justify-center rounded-xl border py-[11px] font-bold text-navy-700 transition duration-200 hover:bg-gray-200 hover:text-navy-700 dark:!border-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:active:bg-white/10"
                onClick={() => dispatch(changetoday())}
              >
                Today
              </button>
              <button
                className="px-full linear flex cursor-pointer items-center justify-center rounded-xl border py-[11px] font-bold text-navy-700 transition duration-200 hover:bg-gray-200 hover:text-navy-700 dark:!border-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:active:bg-white/10"
                onClick={() => dispatch(changethismonth())}
              >
                This month
              </button>
              <button
                className="px-full linear flex cursor-pointer items-center justify-center rounded-xl border py-[11px] font-bold text-navy-700 transition duration-200 hover:bg-gray-200 hover:text-navy-700 dark:!border-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:active:bg-white/10"
                onClick={() => dispatch(changethisyear())}
              >
                This year
              </button>
              <button
                className="px-full linear flex cursor-pointer items-center justify-center rounded-xl border py-[11px] font-bold text-navy-700 transition duration-200 hover:bg-gray-200 hover:text-navy-700 dark:!border-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:active:bg-white/10"
                onClick={() => dispatch(changetotal())}
              >
                Total
              </button>
              
              
            </div>
          }
          classNames={"py-2 top-6 -left-[250px] md:-left-[330px] w-max"}
          animation="origin-[75%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
        />
        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-700 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-700 dark:text-white" />
          )}
        </div>
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full"
              src={avatar}
              alt="Elon Musk"
            />
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    👋 Hey, Admin
                  </p>{" "}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="flex flex-col p-4">
                {/* <a
                  href=" "
                  className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Profile Settings
                </a>
                <a
                  href=" "
                  className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Newsletter Settings
                </a> */}
                <button
                  href=" "
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                  onClick={logout}
                >
                  Log Out
                </button>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export default Navbar;