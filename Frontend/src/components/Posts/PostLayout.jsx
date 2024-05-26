import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "../../utils/axios";
import { RiMore2Fill, RiUser3Fill } from "@remixicon/react";
import Modal from "../Modal";
import { useSelector } from "react-redux";
import useFollow from "../../hooks/useFollow";
import { FlashMsgContext } from "../../context/FlashContext";
import moment from "moment";

const Post = ({ postDetails }) => {
  const [profilePicture, setProfilePicture] = useState("");
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(null);
  const [isSaved, setIsSaved] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedOn, setClickedOn] = useState("");
  const [checkIsFollowing, setCheckIsFollowing] = useState(false);
  const navigate = useNavigate();
  const { showFlashMsg } = useContext(FlashMsgContext);

  const useCheckFollowing = async () => {
    try {
      const { data } = await axios.get(
        `/follow/${postDetails?.owner.username}/isfollowing`
      );
      setCheckIsFollowing(data.data.isFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  const postDate = moment(postDetails?.createdAt);
  const timeAgo = postDate.fromNow();

  const { userDetails } = useSelector((state) => state.user);

  const amIOwner =
    postDetails?.owner.username === userDetails.username ? true : false;

  const handleLike = async () => {
    try {
      if (!isLiked) {
        setLikesCount((prev) => prev + 1);
        setIsLiked((prev) => !prev);
        showFlashMsg("Liked Successfully.");
        await axios.post(`/like/${postDetails._id}/like`);
      } else {
        setLikesCount((prev) => prev - 1);
        setIsLiked((prev) => !prev);
        showFlashMsg("Unliked Successfully.");
        await axios.delete(`/like/${postDetails._id}/like`);
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (!isSaved) {
        setIsSaved((prev) => !prev);
        await axios.post(`/save/${postDetails._id}/save`);
        showFlashMsg("Post saved Successfully.");
      } else {
        setIsSaved((prev) => !prev);
        await axios.delete(`/save/${postDetails._id}/save`);
        showFlashMsg("Post remove from Saved Successfully.");
      }
    } catch (error) {
      console.log("Error saving/unsaving post:", error);
    }
  };

  const handleUnfollow = async () => {
    setClickedOn("");
    await useFollow(
      postDetails.owner.username,
      checkIsFollowing,
      setCheckIsFollowing
    );
    showFlashMsg(
      `You ${checkIsFollowing ? "unfolow" : "following"} @${
        postDetails.owner.username
      }`
    );
  };

  const handleDeletePost = async () => {
    setClickedOn("");
    try {
      await axios.delete(`/post/${postDetails?._id}`);
      showFlashMsg("Post deleted Successfully.");
    } catch (error) {
      console.log(error);
    }
    navigate(-1);
  };

  if (clickedOn === "Unfollow" || clickedOn === "Follow") handleUnfollow();
  if (clickedOn === "Delete") handleDeletePost();

  useEffect(() => {
    if (postDetails) {
      setProfilePicture(
        postDetails.owner?.profilePicture?.split("/upload").join("/upload/w_50")
      );
      setLikesCount(postDetails.likesCount);
      setIsLiked(postDetails.isLiked);
      setIsSaved(postDetails.isSaved);
      useCheckFollowing();
    }
  }, [postDetails]);

  return (
    postDetails && (
      <div className="post-wrapper pb-4 sm:w-4/5 mx-auto">
        <div className="post-top py-3 px-3 flex items-center justify-between">
          <Link
            to={`/profile/${postDetails.owner.username}`}
            className=" flex items-center gap-4 w-fit"
          >
            <div
              className={` w-10 h-10 rounded-full overflow-hidden bg-[#D4D4D4] ${
                !profilePicture && "flex"
              } items-end justify-center`}
            >
              {profilePicture ? (
                <img
                  src={`${profilePicture}`}
                  className=" w-full object-cover object-center "
                  alt=""
                />
              ) : (
                <RiUser3Fill color="white" size={30} />
              )}
            </div>
            <div className=" font-extrabold text-sm">
              {postDetails.owner.username}
            </div>
          </Link>
          <div
            className=" hover:bg-stone-900 rounded-full p-2 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <RiMore2Fill className=" rotate-90" />
          </div>
        </div>
        <div className="home-post min-h-60 bg-zinc-800 flex flex-col justify-center">
          <img src={postDetails.image} className="h-full" />
        </div>
        <div className=" flex justify-between px-4 py-4">
          <div className="flex gap-3">
            <img
              className=" w-7 h-7"
              src={`/Icons/${isLiked ? "heart-red" : "heart"}.png`}
              alt=""
              onClick={handleLike}
            />
            <Link to={`/post/${postDetails._id}/comment`}>
              <img className=" w-6 h-6" src=" /Icons/chat (1).png" alt="" />
            </Link>
            <img className=" w-6 h-6" src="/Icons/send.png" alt="" />
          </div>
          <div className="right">
            <img
              className=" w-6 h-6"
              src={`/Icons/${isSaved ? "saved" : "save"}.png`}
              alt=""
              onClick={handleSave}
            />
          </div>
        </div>
        <div className="post-info px-3">
          <div className=" text-xs font-bold mb-4">{likesCount} likes</div>
          <div className="post-caption text-xs line-clamp-2 mb-1">
            <span className="post-username font-bold text-sm mr-2">
              {postDetails.owner.username}
            </span>
            {postDetails.caption}
          </div>
          <div className=" text-xs text-neutral-400">
            <Link to={`/post/${postDetails._id}/comment`}>
              {postDetails.commentCount
                ? postDetails.commentCount === 1
                  ? "View 1 comment"
                  : `View all ${postDetails.commentCount} comments`
                : "No comments"}
            </Link>
          </div>
          <span className=" text-xs text-neutral-400">{timeAgo}</span>
        </div>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          options={[
            {
              content: amIOwner
                ? "Delete"
                : checkIsFollowing
                ? "Unfollow"
                : "Follow",
              style: `${(checkIsFollowing || amIOwner) && "text-red-500"} ${
                amIOwner && "border-none"
              }`,
            },
          ]}
          setClickedOn={setClickedOn}
          user={
            !amIOwner && {
              username: postDetails.owner.username,
              profilePicture: postDetails.owner.profilePicture,
            }
          }
        />
      </div>
    )
  );
};

export default Post;
