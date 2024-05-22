import { RiArrowLeftSLine } from "@remixicon/react";
import axios from "../../utils/axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSignup from "../../hooks/useSignup";
import { loginAction } from "../../store/actions/userAction";
import Input from "../Input";
import { FlashMsgContext } from "../../context/FlashContext";
// import Loading from "./Loading";

const AddDetails = () => {
  const { accessToken } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { state } = useLocation();

  if (!state) {
    return <h2 className=" text-black">Page Not Found</h2>;
  }
  const { email, password, confirmPassword } = state.data;
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = async (data) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("profile", data.profile[0]);
    formData.append("name", data.name);
    formData.append("bio", data.bio);
    formData.append("username", data.username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    const { showFlashMsg } = useContext(FlashMsgContext);

    let response = await useSignup(formData);
    if (response.error) {
      showFlashMsg(response.error);
      return;
    }

    dispatch(loginAction(response));
    nevigate(`/profile/${data.username}`);
    showFlashMsg("Account created successfully.");
    setLoading(false);
  };

  return state || isAuthenticated ? (
    <div className=" min-h-screen bg-black">
      <div
        id="setting-top"
        className=" relative text-center py-2 border-b-[1px] border-neutral-600"
      >
        <div
          onClick={() => nevigate(-1)}
          className=" top-[50%] -translate-y-[50%] left-3 absolute"
        >
          <RiArrowLeftSLine size={30} />
        </div>
        <span className="">Profile Setup</span>
      </div>
      <div className="px-7">
        <h2 className=" text-xl py-7">Setup your profile</h2>
        <form
          onSubmit={handleSubmit((data) => handleFormSubmit(data))}
          className="flex flex-col"
        >
          <label htmlFor="profile">
            <div
              id="profileimg"
              className=" w-24 h-24 mb-2 bg-zinc-800 rounded-full overflow-hidden mx-auto"
            >
              <img
                src="/images/david.png"
                alt="profile-image"
                className=" object-cover object-center"
              />
            </div>
            <p className=" color-root text-xs text-center">
              Choose pofile image
            </p>
          </label>
          <Input
            {...register("profile")}
            type="file"
            id="profile"
            className=" invisible"
          />
          <label
            htmlFor="username"
            className=" font-semibold text-neutral-100 mb-1"
          >
            Username
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            className=" py-1 px-3 rounded-md bg-transparent mb-3  border-[1px] border-neutral-600"
            onChange={handleCheckUsername}
          />
          <label
            htmlFor="name"
            className=" font-semibold text-neutral-100 mb-1"
          >
            Name
          </label>
          <Input
            {...register("name")}
            type="text"
            id="name"
            className=" py-1 px-3 rounded-md bg-transparent mb-3  border-[1px] border-neutral-600"
          />
          <label htmlFor="bio" className=" font-semibold text-neutral-100 mb-1">
            Bio
          </label>
          <textarea
            {...register("bio")}
            type="text"
            id="bio"
            className=" py-1 px-3 rounded-md bg-transparent mb-3  border-[1px] border-neutral-600 resize-none"
          />

          <button
            type="submit"
            className=" w-fit bg-root px-4 py-2 mt-3 rounded-md text-sm relative"
          >
            Submit
            {/* <span className={`${loading && "invisible"}`}>Submit</span> */}
            {/* {loading && <Loading />} */}
          </button>
        </form>
      </div>
    </div>
  ) : (
    <h2 className=" text-black">Page Not Found</h2>
  );
};

export default AddDetails;

// import React from 'react'

// const ProfileSetup = () => {
//   return (
//     <div className=' text-black'>ProfileSetup</div>
//   )
// }

// export default ProfileSetup
