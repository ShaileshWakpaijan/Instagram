import React from "react";
import { PostUpload as PostUploadComponent, Navbar } from "../components/index";

const PostUpload = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full sm:h-screen sm:overflow-y-auto">
        <div className=" sm:w-[72vw] lg:w-[48vw] sm:mx-auto">
          <PostUploadComponent />
        </div>
      </div>
    </div>
  );
};

export default PostUpload;
