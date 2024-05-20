import React from "react";
import { PostLiked as PostLikedComponent, Navbar } from "../components/index";

const PostLiked = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full sm:h-screen sm:overflow-y-auto">
        <div className=" sm:w-[72vw] lg:w-[48vw] sm:mx-auto">
          <PostLikedComponent />
        </div>
      </div>
    </div>
  );
};

export default PostLiked;
