import { RiSettingsLine, RiUser3Fill } from "@remixicon/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { userDetails } = useSelector((state) => state.user);
  let location = useLocation();
  let navigate = useNavigate();
  location = location.pathname;

  let profilePicture = userDetails?.profilePicture
    .split("/upload")
    .join("/upload/w_50");

  const handleInputPost = async (e) => {
    const file = e.target.files[0];
    file && navigate("/post/upload", { state: { image: file } });
  };

  return (
    location !== "/login" &&
    location !== "/profile/setup" &&
    location !== "/signup" && (
      <div
        className=" border-t-[1px] border-neutral-600 flex justify-around fixed bottom-0 w-full h-fit bg-black
      sm:flex-col sm:h-screen sm:static sm:w-fit sm:px-2 lg:w-1/5 lg:px-3 sm:border-t-0 sm:justify-between sm:border-r-[1px] sm:py-10 lg:justify-between
      "
      >
        <div className=" w-full sm:flex sm:flex-col sm:items-center sm:gap-5">
          <img
            className=" hidden w-[8rem] self-start lg:block pl-3 "
            src="/images/insta-name-logo-black.png"
          />
          <img
            className=" hidden w-6 sm:block lg:hidden self-center"
            src="/Icons/insta-icon.png"
          />
          <div className=" flex justify-around w-full sm:flex-col sm:gap-5">
            <Link
              to={"/home"}
              className=" flex gap-3 items-center p-3 sm:justify-center lg:justify-start rounded-md lg:hover:bg-[#1A1A1A] lg:transition-all lg:duration-75"
              id="f-op-1"
            >
              <img
                src={`/Icons/home${location === "/home" ? "-fill" : ""}.png`}
                className=" w-6 h-6"
                alt=""
              />
              <p className=" hidden lg:inline-block">Home</p>
            </Link>
            <Link
              to={"/explore"}
              className=" flex gap-3 items-center p-3 sm:justify-center lg:justify-start rounded-md lg:hover:bg-[#1A1A1A] lg:transition-all lg:duration-75"
              id="f-op-2"
            >
              <img src="/Icons/search.png" className=" w-6 h-6" alt="" />
              <p className=" hidden lg:block">Search</p>
            </Link>
            <div className="" id="f-op-3">
              <label
                htmlFor="postImage"
                className=" cursor-pointer flex gap-3 items-center p-3 sm:justify-center lg:justify-start rounded-md lg:hover:bg-[#1A1A1A] lg:transition-all lg:duration-75"
              >
                <img src="/Icons/more.png" className="h-6 w-6" alt="" />
                <p className=" hidden lg:block">Create</p>
              </label>
              <input
                type="file"
                id="postImage"
                name="postImage"
                className=" hidden"
                onInput={handleInputPost}
              />
            </div>
            <div
              className=" cursor-pointer flex gap-3 items-center p-3 sm:justify-center lg:justify-start rounded-md lg:hover:bg-[#1A1A1A] lg:transition-all lg:duration-75"
              id="f-op-4"
            >
              <img src="/Icons/send.png" className="h-6 w-6" alt="" />
              <p className=" hidden lg:block">Message</p>
            </div>
            <Link
              to={`/profile/${userDetails.username}`}
              className=" cursor-pointer flex gap-3 items-center p-3 sm:justify-center lg:justify-start rounded-md lg:hover:bg-[#1A1A1A] lg:transition-all lg:duration-75"
            >
              <div
                className={` w-7 h-7 rounded-full overflow-hidden bg-[#D4D4D4] ${
                  !profilePicture && "flex"
                } items-end justify-center`}
                id="f-op-5"
              >
                {profilePicture ? (
                  <img
                    src={`${profilePicture}`}
                    className=" w-full object-cover object-center "
                    alt=""
                  />
                ) : (
                  <RiUser3Fill color="white" />
                )}
              </div>
              <p className=" hidden lg:block">Profile</p>
            </Link>
          </div>
        </div>
        <Link
          to={"/profile/settings"}
          className=" hidden sm:block lg:flex gap-3 items-center p-3 sm:justify-center lg:justify-start rounded-md lg:hover:bg-[#1A1A1A] lg:transition-all lg:duration-75"
        >
          <RiSettingsLine size={29} />
          <p className=" hidden lg:block">Settings</p>
        </Link>
      </div>
    )
  );
};

export default Navbar;
