import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFollow from "../../hooks/useFollow";
import LoadingSpinner from "../LoadingSpinner";
import Modal from "../Modal";

const ProfileFollowSection = ({ user, isItMe }) => {
  const [loading, setLoading] = useState(false);
  const { isFollowing, username } = user;
  const [checkIsFollowing, setCheckIsFollowing] = useState(isFollowing);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedOn, setClickedOn] = useState("");

  const handleFollowBtn = async () => {
    setLoading(true);
    setClickedOn("");
    const follow = await useFollow(
      username,
      checkIsFollowing,
      setCheckIsFollowing
    );
    console.log(follow);
    setLoading(false);
  };

  if (clickedOn === "Unfollow") handleFollowBtn();

  return (
    user && (
      <div
        id="follow-section"
        className="flex flex-col justify-between sm:flex-row sm:justify-start sm:gap-3 sm:items-center"
      >
        <div id="prof-username" className=" text-[1.1rem] font-bold">
          {user.username}
        </div>

        <div className=" flex gap-3">
          {isItMe ? (
            <Link to={"/profile/settings/edit"}>
              <button className=" bg-[#1A1A1A] py-[.3rem] w-28 text-sm  font-bold rounded-md">
                Edit Profile
              </button>
            </Link>
          ) : (
            <button
              onClick={() => {
                !checkIsFollowing ? handleFollowBtn() : setIsOpen(true);
              }}
              className={` bg-${
                checkIsFollowing ? "zinc-600" : "root"
              } py-[.3rem] text-sm w-28 font-bold rounded-md relative`}
            >
              {loading && <LoadingSpinner />}
              {!loading && (checkIsFollowing ? "Following" : "Follow")}
            </button>
          )}
          <button className=" bg-root py-[.3rem]  w-24 sm:w-24 text-sm  font-bold rounded-md">
            Message
          </button>
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
