import React from "react";
import { Comment as CommentComponent, Navbar } from "../components/index";

const Comment = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full">
        <div className=" sm:w-[72vw] lg:w-[40vw] sm:ml-[20%] lg:ml-[35%]">
          <CommentComponent />
        </div>
      </div>
    </div>
  );
};

export default Comment;
