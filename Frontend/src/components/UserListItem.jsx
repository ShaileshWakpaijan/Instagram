import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useSelector } from "react-redux";
import useFollow from "../hooks/useFollow";
import axios from "../utils/axios";

const SearchResult = ({ user, fromSearch }) => {
  const [loading, setLoading] = useState(false);
  const [checkIsFollowing, setCheckIsFollowing] = useState(false);
  const { userDetails } = useSelector((state) => state.user);

  const handleFollowBtn = async () => {
    setLoading(true);
    const follow = await useFollow(
      user.username,
      checkIsFollowing,
      setCheckIsFollowing
    );
    console.log(follow);
    setLoading(false);
  };

  const useCheckFollowing = async () => {
    try {
      const { data } = await axios.get(`/follow/${user.username}/isfollowing`);
      setCheckIsFollowing(data.data.isFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    useCheckFollowing();
  }, [checkIsFollowing]);

  return (
    <div className=" flex justify-between items-center">
      <Link to={`/profile/${user.username}`} className=" flex gap-3">
        <div className=" w-12 h-12 rounded-full bg-white overflow-hidden">
          <img src={user.profilePicture} alt="" />
        </div>
        <div>
          <p>{user.username}</p>
          <div className=" text-sm font-semibold text-neutral-500">
            <span>{user.name}</span>
            {fromSearch && <span> • {user.followersCount} followers</span>}
          </div>
        </div>
      </Link>

      {!fromSearch && (
        <>
          <button
            onClick={handleFollowBtn}
            className={` bg-${
              checkIsFollowing ? "zinc-600" : "root"
            } py-[.3rem] text-sm h-8 w-24 font-bold rounded-md relative ${
              user.username === userDetails.username && "hidden"
            }`}
          >
            {loading && <LoadingSpinner />}
            {!loading && (checkIsFollowing ? "Following" : "Follow")}
          </button>
        </>
      )}
    </div>
  );
};

export default SearchResult;