import { RiCloseCircleFill, RiSearch2Line } from "@remixicon/react";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostGrid from "./Posts/PostGrid";
import LoadingSpinner from "./LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";

const Explore = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      let { data } = await axios.get(`/post?limit=24&page=${page}`);
      setAllPosts((prevData) => [...prevData, ...data.data.posts]);
      setPage((prev) => data.data.isNext && prev + 1);
      setHasMore(data.data.isNext);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className=" bg-black min-h-screen pb-12 pt-[1px] sm:w-full sm:pb-5 ">
      <Link to={"/search"} className=" w-full">
        <div
          className=" my-2 gap-2 border-2 border-neutral-600 rounded-md pl-2 py-[2px] flex w-[90%] mx-auto items-center justify-center 
        sm:w-full sm:my-5 sm:justify-around
        "
        >
          <RiSearch2Line size={15} className=" text-neutral-400" />
          <div className="  text-xs py-1 text-neutral-300 text focus:outline-none w-[80%] bg-transparent">
            Search
          </div>
          <div className=" relative w-5 ">
            <RiCloseCircleFill className=" text-neutral-400" size={15} />
          </div>
        </div>
      </Link>

      <InfiniteScroll
        dataLength={allPosts.length}
        next={getAllPosts}
        hasMore={hasMore}
        loader={
          <div className=" relative py-8 sm:py-4">
            <LoadingSpinner />
          </div>
        }
      >
        {allPosts ? <PostGrid userPosts={allPosts} /> : <LoadingSpinner />}
      </InfiniteScroll>
    </div>
  );
};

export default Explore;
