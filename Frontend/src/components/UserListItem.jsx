import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useSelector } from "react-redux";
import useFollow from "../hooks/useFollow";
import axios from "../utils/axios";
import Modal from "./Modal";
import { FlashMsgContext } from "../context/FlashContext";
import { RiUser3Fill } from "@remixicon/react";

const SearchResult = ({ user, fromSearch }) => {
  const [loading, setLoading] = useState(false);
  const [checkIsFollowing, setCheckIsFollowing] = useState(false);
  const { userDetails } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedOn, setClickedOn] = useState("");
  const { showFlashMsg } = useContext(FlashMsgContext);

  const handleFollowBtn = async () => {
    setLoading(true);
    setClickedOn("");
    await useFollow(user.username, checkIsFollowing, setCheckIsFollowing);
    showFlashMsg(
      `You ${checkIsFollowing ? "unfolow" : "following"} @${user.username}`
    );
    setLoading(false);
  };

  if (clickedOn === "Unfollow") handleFollowBtn();

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
        <div
          className={`h-12 w-12 bg-[#D4D4D4] rounded-full overflow-hidden ${
            !user.profilePicture && "flex pt-2"
          } justify-center`}
        >
          {user.profilePicture ? (
            <img
              src={`${user.profilePicture}`}
              className=" w-full object-cover object-center "
              alt=""
            />
          ) : (
            <RiUser3Fill color="white" size={45} />
          )}
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
            onClick={() => {
              !checkIsFollowing ? handleFollowBtn() : setIsOpen(true);
            }}
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
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        options={[{ content: "Unfollow", style: "text-red-500" }]}
        setClickedOn={setClickedOn}
        user={user}
      />
    </div>
  );
};

export default SearchResult;
