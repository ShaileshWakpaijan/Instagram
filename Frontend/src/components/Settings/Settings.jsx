import { RiArrowRightSLine } from "@remixicon/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccessToken,
  setAuthentication,
  setUserDetails,
} from "../../store/reducers/userSlice";
import PageHeading from "../PageHeading";
import useLogout from "../../hooks/usLogout";

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = async () => {
    useLogout();
    dispatch(setUserDetails(null));
    dispatch(setAuthentication(false));
    dispatch(setAccessToken(null));
    // navigate("/login");
  };

  const { userDetails } = useSelector((state) => state.user);

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
        <Link
          to={"/profile/settings/liked"}
          className=" p-3 border-b-[1px] border-neutral-600 flex items-center justify-between"
        >
          Liked Posts <RiArrowRightSLine className=" text-neutral-500" />
        </Link>
        <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`} className=" p-3 border-b-[1px] border-neutral-600 flex items-center justify-between">
          Contact Us <RiArrowRightSLine className=" text-neutral-500" />
        </a>
        <Link
          to={`/profile/${userDetails.username}/delete`}
          className=" p-3 border-b-[1px] text-red-500 border-neutral-600 flex items-center justify-between"
        >
          Delete Account <RiArrowRightSLine className=" text-neutral-500" />
        </Link>
        <a
          href="/login"
          onClick={handleClick}
          className=" cursor-pointer p-3 border-b-[1px] border-neutral-600 flex items-center justify-between text-red-500"
        >
          Log Out <RiArrowRightSLine className=" text-neutral-500" />
        </a>
      </ul>
    </div>
  );
};

export default Settings;
