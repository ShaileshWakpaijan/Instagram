import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { RiMore2Fill } from "@remixicon/react";

const Post = ({ postDetails }) => {
  const [profilePicture, setProfilePicture] = useState("");
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(null);
  const [isSaved, setIsSaved] = useState(null);

  const handleLike = async () => {
    try {
      if (!isLiked) {
        setLikesCount((prev) => prev + 1);
        setIsLiked((prev) => !prev);
        await axios.post(`/like/${postDetails._id}/like`);
      } else {
        setLikesCount((prev) => prev - 1);
        setIsLiked((prev) => !prev);
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
        console.log("saved");
      } else {
        setIsSaved((prev) => !prev);
        await axios.delete(`/save/${postDetails._id}/save`);
        console.log("unsaved");
      }
    } catch (error) {
      console.log("Error saving/unsaving post:", error);
    }
  };

  useEffect(() => {
    if (postDetails) {
      setProfilePicture(
        postDetails.owner.profilePicture.split("/upload").join("/upload/w_50")
      );
      setLikesCount(postDetails.likesCount);
      setIsLiked(postDetails.isLiked);
      setIsSaved(postDetails.isSaved);
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
            <img
              className=" w-10 h-10 rounded-full object-cover object-center
            "
              src={profilePicture}
            />
            <div className=" font-extrabold text-sm">
              {postDetails.owner.username}
            </div>
          </Link>
          <RiMore2Fill />
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
          <span className=" text-xs text-neutral-400">
            {postDetails.createdAt}
          </span>
        </div>
      </div>
    )
  );
};

export default Post;
