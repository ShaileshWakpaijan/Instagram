import React, { useEffect, useState } from "react";
import PageHeading from "../PageHeading";
import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
import OneComment from "./OneComment";
import { useSelector } from "react-redux";

const Comment = () => {
  const { userDetails } = useSelector((state) => state.user);
  const { postid } = useParams();
  const [newComment, setNewComment] = useState([]);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/comment/${postid}`, { comment });
      setNewComment((prev) => [
        ...prev,
        {
          comment,
          owner: {
            _id: userDetails._id,
            username: userDetails.username,
            profilePicture: userDetails.profilePicture,
          },
        },
      ]);
      setComment("");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getPostComment = async () => {
    try {
      let { data } = await axios.get(`/comment/${postid}`);
      setAllComments(data.data.allComments);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getPostComment();
  }, []);

  return (
    allComments && (
      <div className=" w-[vw]">
        <div className=" min-h-screen bg-black text-white pb-12 sm:pb-0">
          <PageHeading heading={"Comments"} />

          <div className=" px-2 py-5 flex flex-col gap-5 pb-28">
            {newComment.map((c, index) => (
              <OneComment key={index} comment={c} />
            ))}
            {allComments.map((c, index) => (
              <OneComment key={index} comment={c} />
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className=" bg-black border-t-[1px] border-neutral-600 py-6 w-full flex items-center gap-3 px-5 fixed bottom-12 sm:bottom-0 sm:w-[72vw] lg:w-[40vw] sm:justify-between
          
          "
        >
          <div className=" bg-blue-600 h-9 w-9 rounded-full overflow-hidden">
            <img src={userDetails.profilePicture} className=" w-full" alt="" />
          </div>
          <textarea
            value={comment}
            className=" bg-transparent w-60 py-1 border-none text-sm resize-none sm:w-80"
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button type="submit" className=" color-root">
            Post
          </button>
        </form>
      </div>
    )
  );
};

export default Comment;
