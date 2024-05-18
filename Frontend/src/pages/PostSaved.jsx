import React from "react";
import { PostSaved as PostSavedComponent, Navbar } from "../components/index";

const PostSaved = () => {
  return (
    <div className=" sm:flex bg-black">
      <div className="sm:w-full sm:overflow-y-auto">
        <div className=" sm:w-[72vw] lg:w-[48vw] sm:mx-auto">
          <PostSavedComponent />
        </div>
      </div>
    </div>
  );
};

export default PostSaved;
