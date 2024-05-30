import React from "react";
import ProfileFollowSection from "./ProfileFollowSection";
import ProfileFollowInfo from "./ProfileFollowInfo";
import PageHeading from "../PageHeading";
import { RiUser3Fill } from "@remixicon/react";

const ProfileInfo = ({ user, isItMe }) => {
  const { username, profilePicture, name, bio } = user;
  return (
    user && (
      <>
        <div className=" sm:hidden">
          <div className=" bg-black flex pl-3 py-5 gap-3">
            <div
              id="prof-img"
              className={`bg-[#D4D4D4] shrink-0 rounded-full overflow-hidden ${
                !profilePicture && "flex pt-4 w-20 h-20"
              } items-center justify-center`}
            >
              {profilePicture ? (
                <img
                  src={`${profilePicture}`}
                  className=" w-20 h-20 rounded-full object-cover object-center "
                  alt=""
                />
              ) : (
                <RiUser3Fill color="white" size={80} />
              )}
            </div>

            <ProfileFollowSection user={user} isItMe={isItMe} />
          </div>
          <div id="prof-bio" className=" bg-black w-full px-5 pb-4">
            <p className=" font-bold text-[1.05rem]">{name}</p>
            <p className=" text-sm">{bio}</p>
          </div>
        </div>

        {/* Responsive */}

        {!isItMe && (
          <div className=" hidden sm:block">
            <PageHeading heading={username} />
          </div>
        )}
        <div className=" hidden sm:flex items-center bg-black justify-center">
          <div className=" flex px-4 py-16 ">
            <div
              id="prof-img"
              className={`bg-[#D4D4D4] rounded-full w-40 h-40 overflow-hidden ${
                !profilePicture && "flex"
              } items- justify-center`}
            >
              {profilePicture ? (
                <img
                  src={`${profilePicture}`}
                  className=" rounded-full w-40 h-40 object-cover object-center "
                  alt=""
                />
              ) : (
                <RiUser3Fill color="white" size={185} />
              )}
            </div>
          </div>
          <div
            id="prof-bio"
            className=" bg-black w-full px-5 pb-4 flex flex-col gap-1"
          >
            <ProfileFollowSection user={user} isItMe={isItMe} />
            <ProfileFollowInfo user={user} />
            <p className=" font-bold text-[1.05rem]">{name}</p>
            <p className=" text-sm">{bio}</p>
          </div>
        </div>
      </>
    )
  );
};

export default ProfileInfo;
