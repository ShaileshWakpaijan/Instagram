import React from "react";
import {
  Navbar,
  PostIndividual as PostIndividualComponent,
} from "../components/index";

const PostIndividual = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full">
        <div className=" sm:w-[72vw] lg:w-[40vw] sm:ml-[20%] lg:ml-[35%]">
          <PostIndividualComponent />
        </div>
      </div>
    </div>
  );
};

export default PostIndividual;
