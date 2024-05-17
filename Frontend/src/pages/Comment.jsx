import React from "react";
import { Comment as CommentComponent, Navbar } from "../components/index";

const Comment = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full sm:h-screen sm:overflow-y-auto">
        <div className=" sm:w-[72vw] lg:w-[40vw] sm:mx-auto bg-blue-300">
          <CommentComponent />
        </div>
      </div>
    </div>
  );
};

export default Comment;
