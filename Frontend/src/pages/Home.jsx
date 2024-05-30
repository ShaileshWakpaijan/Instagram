import React from "react";
import {
  Navbar,
  Home as HomeComponent,
} from "../components/index";

const Home = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full">
        <div className=" sm:w-[72vw] lg:w-[40vw] sm:ml-[20%] lg:ml-[35%]">
          <HomeComponent />
        </div>
      </div>
    </div>
  );
};

export default Home;
