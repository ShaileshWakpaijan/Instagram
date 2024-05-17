import { RiArrowLeftSLine } from "@remixicon/react";
// import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { userUpdt } from "../store/actions/userAction";
// import Loading from "./Loading";
import PageHeading from "../PageHeading";

const EditPage = () => {
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState()
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  // const { userDetails } = useSelector((state) => state.user);
  // const handleFormSubmit = async (data) => {
  //   let formData = new FormData();
  //   setLoading(true)
  //   formData.append("profile", data.profile[0]);
  //   formData.append("username", data.username);
  //   formData.append("name", data.name);
  //   formData.append("bio", data.bio);
  //   try {
  //     let response = await axios.patch(
  //       `/user/${userDetails.username}/update`,
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );
  //     response = response.data.data;
  //     dispatch(userUpdt(response));
  //     navigate(`/profile/${data.username}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setLoading(false)
  // };

  // useEffect(() => {
  //   setPreview(userDetails.profilePicture)
  // }, [])

  return (
    <div className=" min-h-screen bg-black">
      <PageHeading heading={"Edit Profile"} />
      <div className="px-7">
        <h2 className=" text-2xl py-5">Edit profile</h2>
        <form
          action=""
          className="flex flex-col"
          // onSubmit={handleSubmit((data) => handleFormSubmit(data))}
        >
          <label htmlFor="profile">
            <div
              id="profileimg"
              className=" w-24 h-24 mb-2 bg-zinc-800 rounded-full overflow-hidden mx-auto"
            >
              <img
              id="profileImagePreview"
                src={preview}
                alt="profile-image"
                className=" object-cover object-center"
              />
            </div>
            <p className=" color-root text-xs text-center">
              Choose pofile image
            </p>
          </label>
          <input
            {...register("profile")}
            name="profile"
            type="file"
            id="profile"
            className=" invisible"
            // onChange={(event) => {
            //   const file = event.target.files[0];
            //   const reader = new FileReader();
            //   reader.onload = function (e) {
            //     setPreview(e.target.result);
            //   };
            //   reader.readAsDataURL(file);
            // }}
          />
          <label
            htmlFor="name"
            className=" font-semibold text-neutral-100 mb-1"
          >
            Name
          </label>
          <input
            {...register("name")}
            // defaultValue={userDetails.name}
            type="text"
            id="name"
            className=" py-1 px-3 rounded-md bg-transparent mb-3  border-[1px] border-neutral-600"
          />
          <label
            htmlFor="username"
            className=" font-semibold text-neutral-100 mb-1"
          >
            Username
          </label>
          <input
            {...register("username")}
            // defaultValue={userDetails.username}
            type="text"
            id="username"
            className=" py-1 px-3 rounded-md bg-transparent mb-3  border-[1px] border-neutral-600"
          />
          <label htmlFor="bio" className=" font-semibold text-neutral-100 mb-1">
            Bio
          </label>
          <textarea
            {...register("bio")}
            // defaultValue={userDetails.bio}
            type="text"
            id="bio"
            className=" py-1 px-3 rounded-md bg-transparent mb-3  border-[1px] border-neutral-600 resize-none"
          />

          <button
            type="submit"
            className=" w-fit bg-root px-4 py-2 mt-3 rounded-md text-sm relative"
          >
            <span className={`${loading && "invisible"}`}>Submit</span>
            {/* {loading && <Loading />} */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;