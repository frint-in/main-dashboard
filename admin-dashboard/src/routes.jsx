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
import { MdScheduleSend } from "react-icons/md";


// Auth Imports
// import SignIn from "./views/auth/SignIn";

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
  MdOutlineTask,
} from "react-icons/md";
import { RiFolderReceivedFill } from "react-icons/ri";
import { IoStorefront } from "react-icons/io5";
import { GrSchedules } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { BiSolidShoppingBags } from "react-icons/bi";
import EditProfile from "./views/admin/editProfile";
import PostInternship from "./views/admin/postInternship";
import StudentProfile from "./views/admin/studentProfile";
import EditInternship from "./views/admin/editInternship";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  // {
  //   name: "Posted Works",
  //   layout: "/admin",
  //   icon: <MdOutlineTask className="h-6 w-6" />,
  //   path: "pickup-list",
  //   component: <PickupDashboard />,
  // },
  // {
  //   name: "Shortlisted",
  //   layout: "/admin",
  //   icon: <MdPendingActions className="h-6 w-6" />,
  //   path: "received-list",
  //   component: <ReceivedDashboard />,
  // },
  {
    name: "Internships",
    layout: "/admin",
    path: "internships",
    icon: <BiSolidShoppingBags className="h-6 w-6" />,
    component: <NFTMarketplace />,
  },

  {
    name: "Post Internship",
    layout: "/admin",
    path: "postinternship",
    icon: <MdScheduleSend className="h-6 w-6" />,
    component: <PostInternship />,
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
    // name: "Applicants",
    layout: "/admin",
    // icon: <GrSchedules className="h-6 w-6" />,
    path: "applied shorted/:id",
    component: <PendingDashboard />,
  },
  {
    // name: "Profile",
    layout: "/admin",
    path: "edit internship/:id",
    // icon: <CgProfile className="h-6 w-6" />,
    component: <EditInternship />,
  },
  {
    // name: "Profile",
    layout: "/admin",
    path: "student details/:id",
    // icon: <CgProfile className="h-6 w-6" />,
    component: <StudentProfile />,
  },
  {
    name: "Edit Profile",
    layout: "/admin",
    path: "editProfile",
    icon: <FaUserEdit className="h-6 w-6" />,
    component: <EditProfile />,
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
  //   path: "sign-in",
  //   icon: <MdLock className="h-6 w-6" />,
  //   component: <SignIn />,
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
