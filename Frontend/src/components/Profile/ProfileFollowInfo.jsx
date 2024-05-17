import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileFollowInfo = ({ user }) => {
  const navigate = useNavigate();
  const { postsCount, username, followersCount, followingsCount } = user;
  return (
    user && (
      <>
        <div
          id="follow-info"
          className=" bg-black sm:border-0 border-t-[1px] border-b-[1px] border-neutral-600 flex w-full justify-around items-center text-center py-3 text-sm font-bold 
          sm:font-semibold sm:justify-start sm:gap-5
        "
        >
          <div className=" sm:font-semibold">
            {postsCount}
            <br className=" sm:hidden" />
            <span className=" text-neutral-400 sm:text-white ml-1"> posts</span>
          </div>

          <div
            onClick={() =>
              navigate(`/profile/${username}/followers`, {
                state: { from: "Followers" },
              })
            }
            className=" cursor-pointer"
          >
            {followersCount}
            <br className=" sm:hidden" />
            <span className=" text-neutral-400 sm:text-white ml-1">
              {" "}
              followers
            </span>
          </div>

          <div
            onClick={() =>
              navigate(`/profile/${username}/following`, {
                state: { from: "Following" },
              })
            }
            className=" cursor-pointer"
          >
            {followingsCount}
            <br className=" sm:hidden" />
            <span className=" text-neutral-400 sm:text-white ml-1">
              {" "}
              following
            </span>
          </div>
        </div>
      </>
    )
  );
};

export default ProfileFollowInfo;
