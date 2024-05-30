import React from "react";
import { PostLiked as PostLikedComponent, Navbar } from "../components/index";

const PostLiked = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full">
        <div className=" sm:w-[72vw] lg:w-[48vw] sm:ml-[20%] lg:ml-[35%]">
          <PostLikedComponent />
        </div>
      </div>
    </div>
  );
};

export default PostLiked;
