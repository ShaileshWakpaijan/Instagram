import React from "react";
import {
  Navbar,
  FollowList as FollowListComponent,
} from "../components/index";

const FollowList = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full sm:h-screen sm:overflow-y-auto">
        <div className=" sm:w-[72vw] lg:w-[40vw] sm:mx-auto">
          <FollowListComponent />
        </div>
      </div>
    </div>
  );
};

export default FollowList;
