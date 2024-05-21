import React from "react";
import ProfileFollowSection from "./ProfileFollowSection";
import ProfileFollowInfo from "./ProfileFollowInfo";
import PageHeading from "../PageHeading";

const ProfileInfo = ({ user, isItMe }) => {
  const { username, profilePicture, name, bio } = user;
  return (
    user && (
      <>
        <div className=" sm:hidden">
          <div className=" bg-black flex px-4 py-5 gap-4">
            <div
              id="prof-img"
              className=" bg-white rounded-full w-20 h-20 overflow-hidden"
            >
              <img
                src={`${profilePicture}`}
                className=" w-full object-cover object-center "
              />
            </div>

            <ProfileFollowSection user={user} isItMe={isItMe} />
          </div>
          <div id="prof-bio" className=" bg-black w-full px-5 pb-4">
            <p className=" font-bold text-[1.05rem]">{username}</p>
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
              className=" bg-white rounded-full w-40 h-40 overflow-hidden"
            >
              <img
                src={`${profilePicture}`}
                className=" w-full object-cover object-center "
              />
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
