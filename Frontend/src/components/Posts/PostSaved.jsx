import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";
import PostGrid from "./PostGrid";
import { RiAccountBoxLine } from "@remixicon/react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "../LoadingSpinner";
import { useLocation, useNavigate } from "react-router-dom";

const PostSaved = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const { userDetails } = useSelector((state) => state.user);
  const [savedPosts, setSavedPosts] = useState([]);
  const navigate = useNavigate();

  let { pathname } = useLocation();
  pathname = pathname.split("/");
  let currentUsername = pathname[pathname.length - 2];

  const getSavedPosts = async () => {
    if (currentUsername !== userDetails.username) {
      navigate(`/profile/${currentUsername}`);
      return;
    }
    try {
      const { data } = await axios.get(
        `user/${userDetails.username}/saved?limit=12&page=${page}`
      );
      let savedPostsArray = data.data.savedPosts;
      if (savedPostsArray) {
        savedPostsArray = savedPostsArray.map((post) => post.post);
        setSavedPosts((prevData) => [...prevData, ...savedPostsArray]);
        setPage((prev) => data.data.isNext && prev + 1);
        setHasMore(data.data.isNext);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSavedPosts();
  }, []);

  return savedPosts.length ? (
    <div className=" bg-black text-white">
      <InfiniteScroll
        dataLength={savedPosts.length}
        next={getSavedPosts}
        hasMore={hasMore}
        loader={
          <div className=" relative py-8 sm:py-4">
            <LoadingSpinner />
          </div>
        }
      >
        <PostGrid saved={true} userPosts={savedPosts} />
      </InfiniteScroll>
    </div>
  ) : (
    <div className=" w-full flex justify-center flex-col-reverse items-center h-60 bg-vilet-300">
      No Posts Saved.
      <div className="hidden sm:block">
        <RiAccountBoxLine size={150} />
      </div>
      <div className="sm:hidden">
        <RiAccountBoxLine size={100} />
      </div>
    </div>
  );
};

export default PostSaved;
