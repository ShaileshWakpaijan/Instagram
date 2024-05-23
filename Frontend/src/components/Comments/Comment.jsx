import React, { useEffect, useState } from "react";
import PageHeading from "../PageHeading";
import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
import OneComment from "./OneComment";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "../LoadingSpinner";

const Comment = () => {
  const { userDetails } = useSelector((state) => state.user);
  const { postid } = useParams();
  const [comment, setComment] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [allComments, setAllComments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setComment("");
      let { data } = await axios.post(`/comment/${postid}`, { comment });
      let newComment = {
        ...data.data,
        owner: {
          _id: userDetails._id,
          profilePicture: userDetails.profilePicture,
          username: userDetails.username,
        },
      };
      setAllComments((prevData) => [newComment, ...prevData]);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostComment = async () => {
    try {
      let { data } = await axios.get(
        `/comment/${postid}?limit=15&page=${page}`
      );
      setAllComments((prevData) => [...prevData, ...data.data.allComments]);
      setPage((prev) => data.data.isNext && prev + 1);
      setHasMore(data.data.isNext);
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

          {!allComments.length && (
            <p className=" text-center py-5 text-neutral-400">
              No comments yet.
            </p>
          )}

          <div className=" pb-28">
            <InfiniteScroll
              dataLength={allComments.length}
              next={getPostComment}
              hasMore={hasMore}
              loader={
                <div className=" relative py-4">
                  <LoadingSpinner />
                </div>
              }
            >
              <div className=" px-2 py-5 flex flex-col gap-5">
                {allComments.map((c, index) => (
                  <OneComment key={index} comment={c} />
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className=" bg-black border-t-[1px] border-neutral-600 py-6 w-full flex items-center gap-3 px-5 fixed z-40 bottom-12 sm:bottom-0 sm:w-[72vw] lg:w-[40vw] sm:justify-between

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
