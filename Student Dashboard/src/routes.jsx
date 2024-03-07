import React from "react";

// Admin Imports
import MainDashboard from "./views/admin/default/index";
import PendingDashboard from "./views/admin/Orders_sidebar/Pending_sidebar/index";
import PickupDashboard from "./views/admin/Orders_sidebar/Pickup_sidebar/index";
import ReceivedDashboard from "./views/admin/Orders_sidebar/Received_sidebar/index";
import DeliveredDashboard from "./views/admin/Orders_sidebar/Delivered_sidebar/index";
import NFTMarketplace from "./views/admin/marketplace";
import Profile from "./views/admin/profile/index";
import DataTables from "./views/admin/tables/index";


// Auth Imports
import SignIn from "./views/auth/SignIn";
import Auth from "./views/auth/Auth";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdPendingActions,
  MdLocalShipping,
  MdDoneOutline,
  MdOutlineTask
} from "react-icons/md";
import { RiFolderReceivedFill } from "react-icons/ri";
import { IoStorefront } from "react-icons/io5";
import { GrSchedules } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { BiSolidShoppingBags } from "react-icons/bi";
import EditProfile from "./views/admin/editProfile";
import SingleInternship from "./views/admin/singleInternship";


const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
 
  {
    name: "Applied Works",
    layout: "/admin",
    icon: <GrSchedules className="h-6 w-6" />,
    path: "applied-works",
    component: <PendingDashboard />,
  },
  {
    name: "Completed Works",
    layout: "/admin",
    icon: <MdOutlineTask className="h-6 w-6" />,
    path: "completed-works",
    component: <PickupDashboard />,
  },
  {
    name: "Ongoing Works",
    layout: "/admin",
    icon: <MdPendingActions className="h-6 w-6" />,
    path: "ongoing-works",
    component: <ReceivedDashboard />,
  },
  {
    name: "Internships",
    layout: "/admin",
    path: "internships",
    icon: <BiSolidShoppingBags className="h-6 w-6" />,
    component: <NFTMarketplace />,
  },
  
  // {
  //   name: "All Delivered",
  //   layout: "/admin",
  //   icon: <MdDoneOutline className="h-6 w-6" />,
  //   path: "delivered-list",
  //   component: <DeliveredDashboard />,
  // },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <CgProfile className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Edit Profile",
    layout: "/admin",
    path: "editProfile",
    icon: <FaUserEdit className="h-6 w-6" />,
    component: <EditProfile />,
  },
  {
    // name: "Edit Profile",
    layout: "/admin",
    path: "single internship",
    // icon: <FaUserEdit className="h-6 w-6" />,
    component: <SingleInternship />,
  },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "data-tables",
  //   component: <DataTables />,
  // },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "",
  //   icon: <MdLock className="h-6 w-6" />,
  //   component: <Auth />,
  // },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "sign-in",
  //   icon: <MdLock className="h-6 w-6" />,
  //   component: <SignIn />,
  // },
 
  
];
export default routes;
