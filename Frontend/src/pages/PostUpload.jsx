import React from "react";
import { PostUpload as PostUploadComponent, Navbar } from "../components/index";

const PostUpload = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full">
        <div className=" sm:w-[72vw] lg:w-[48vw] sm:ml-[20%] lg:ml-[35%]">
          <PostUploadComponent />
        </div>
      </div>
    </div>
  );
};

export default PostUpload;
