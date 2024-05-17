import { RiCloseCircleFill, RiSearch2Line } from "@remixicon/react";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostGrid from "./Posts/PostGrid";
import LoadingSpinner from "./LoadingSpinner";

const Explore = () => {
  const [allPosts, setAllPosts] = useState(null);

  const getAllPosts = async () => {
    let { data } = await axios.get("/post?limit=20");
    setAllPosts(data.data.posts);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className=" bg-black min-h-screen pb-12 pt-[1px] sm:w-full sm:pb-5 ">
      <Link to={"/search"} className=" w-full">
        <div className=" my-2 gap-2 border-2 border-neutral-600 rounded-md pl-2 py-[2px] flex w-[90%] mx-auto items-center justify-center 
        sm:w-full sm:my-5 sm:justify-around
        ">
          <RiSearch2Line size={15} className=" text-neutral-400" />
          <div className="  text-xs py-1 text-neutral-300 text focus:outline-none w-[80%] bg-transparent">
            Search
          </div>
          <div className=" relative w-5 ">
            <RiCloseCircleFill className=" text-neutral-400" size={15} />
          </div>
        </div>
      </Link>

      {allPosts ? (
        <PostGrid userPosts={allPosts} />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default Explore;
