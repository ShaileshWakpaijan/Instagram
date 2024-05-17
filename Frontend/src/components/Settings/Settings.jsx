import { RiArrowRightSLine } from "@remixicon/react";
// import axios from "../utils/axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setAccessToken, setAuthentication, setUserDetails } from "../store/reducers/userSlice";
import PageHeading from "../PageHeading";

const Settings = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch()
//   const handleClick = async () => {
//     await axios.post("/user/logout")
//     dispatch(setUserDetails(null))
//     dispatch(setAuthentication(false))
//     dispatch(setAccessToken(null))
//     navigate('/login')
//   }

  return (
    <div className=" min-h-screen bg-black">
      <PageHeading heading={"Settings"} />
      <ul className="">
        <h1 className=" py-4 px-3 bg-stone-800 text-neutral-400">ACCOUNT</h1>
        <Link
          to={"/profile/settings/edit"}
          className=" p-3 border-b-[1px] border-neutral-600 flex items-center justify-between"
        >
          Edit profile <RiArrowRightSLine className=" text-neutral-500" />
        </Link>
        <li className=" p-3 border-b-[1px] border-neutral-600 flex items-center justify-between">
          Contact Us <RiArrowRightSLine className=" text-neutral-500" />
        </li>
        <li className=" p-3 border-b-[1px] border-neutral-600 flex items-center justify-between text-red-500">
          Log Out <RiArrowRightSLine className=" text-neutral-500" />
        </li>
      </ul>
    </div>
  );
//   return (
//     <div className=" min-h-screen bg-black">
//       <PageHeading heading={"Settings"} />
//       <ul className="">
//         <h1 className=" py-4 px-3 bg-stone-800 text-neutral-400">ACCOUNT</h1>
//         <Link
//           to={"/profile/settings/edit"}
//           className=" p-3 border-b-[1px] border-neutral-600 flex items-center justify-between"
//         >
//           Edit profile <RiArrowRightSLine className=" text-neutral-500" />
//         </Link>
//         <li className=" p-3 border-b-[1px] border-neutral-600 flex items-center justify-between">
//           Contact Us <RiArrowRightSLine className=" text-neutral-500" />
//         </li>
//         <li onClick={handleClick} className=" p-3 border-b-[1px] border-neutral-600 flex items-center justify-between text-red-500">
//           Log Out <RiArrowRightSLine className=" text-neutral-500" />
//         </li>
//       </ul>
//     </div>
//   );
};

export default Settings;
