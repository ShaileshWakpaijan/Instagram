import React from "react";
import { Explore as ExploreComponent, Navbar } from "../components/index";

const Explore = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full sm:h-screen sm:overflow-y-auto">
        <div className=" sm:w-[72vw] lg:w-[48vw] sm:mx-auto">
          <ExploreComponent />
        </div>
      </div>
    </div>
  );
};

export default Explore;
