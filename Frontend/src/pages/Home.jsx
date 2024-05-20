import React from "react";
import {
  Navbar,
  Home as HomeComponent,
} from "../components/index";

const Home = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full sm:h-screen sm:overflow-y-auto">
        <div className=" sm:w-[72vw] lg:w-[40vw] sm:mx-auto">
          <HomeComponent />
        </div>
      </div>
    </div>
  );
};

export default Home;
