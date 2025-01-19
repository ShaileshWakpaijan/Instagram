import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useFollow from "../../hooks/useFollow";
import LoadingSpinner from "../LoadingSpinner";
import Modal from "../Modal";
import { FlashMsgContext } from "../../context/FlashContext";

const ProfileFollowSection = ({ user, isItMe }) => {
  const [loading, setLoading] = useState(false);
  const { isFollowing, username } = user;
  const [checkIsFollowing, setCheckIsFollowing] = useState(isFollowing);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedOn, setClickedOn] = useState("");
  const { showFlashMsg } = useContext(FlashMsgContext);

  const handleFollowBtn = async () => {
    setLoading(true);
    setClickedOn("");
    await useFollow(
      username,
      checkIsFollowing,
      setCheckIsFollowing
    );
    showFlashMsg(
      `You ${checkIsFollowing ? "unfolow" : "following"} @${user.username}`
    );
    setLoading(false);
  };

  if (clickedOn === "Unfollow") handleFollowBtn();

  return (
    user && (
      <div
        id="follow-section"
        className="flex flex-col gap-3 sm:flex-row sm:justify-start sm:gap-3 sm:items-center"
      >
        <div id="prof-username" className=" text-[1.1rem] font-bold">
          {user.username}
        </div>

        <div className=" flex gap-3">
          {isItMe ? (
            <Link to={"/profile/settings/edit"}>
              <button className=" bg-[#1A1A1A] py-[.3rem] w-[6.6rem] text-sm  font-bold rounded-md">
                Edit Profile
              </button>
            </Link>
          ) : (
            <button
              onClick={() => {
                !checkIsFollowing ? handleFollowBtn() : setIsOpen(true);
              }}
              className={` bg-${
                checkIsFollowing ? "stone-800" : "root"
              } py-[.3rem] text-sm w-[6.6rem] font-bold rounded-md relative`}
            >
              {loading && <LoadingSpinner />}
              {!loading && (checkIsFollowing ? "Following" : "Follow")}
            </button>
          )}
          {!isItMe && <button className=" bg-root py-[.3rem]  w-[5.8rem] sm:w-24 text-sm  font-bold rounded-md">
            Message
          </button>}
        </div>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          options={[{ content: "Unfollow", style: "text-red-500" }]}
          setClickedOn={setClickedOn}
          user={user}
        />
      </div>
    )
  );
};

export default ProfileFollowSection;
