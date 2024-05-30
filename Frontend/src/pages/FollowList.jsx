import React from "react";
import {
  Navbar,
  FollowList as FollowListComponent,
} from "../components/index";

const FollowList = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full">
        <div className=" sm:w-[72vw] lg:w-[40vw] sm:ml-[20%] lg:ml-[35%]">
          <FollowListComponent />
        </div>
      </div>
    </div>
  );
};

export default FollowList;
