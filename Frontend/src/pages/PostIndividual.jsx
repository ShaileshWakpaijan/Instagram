import React from "react";
import {
  Navbar,
  PostIndividual as PostIndividualComponent,
} from "../components/index";

const PostIndividual = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full sm:h-screen sm:overflow-y-auto">
        <div className=" sm:w-[72vw] lg:w-[40vw] sm:mx-auto">
          <PostIndividualComponent />
        </div>
      </div>
    </div>
  );
};

export default PostIndividual;
