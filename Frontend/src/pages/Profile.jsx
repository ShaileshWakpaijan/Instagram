import React from "react";
import { Navbar, Profile as ProfileComponent } from "../components/index";

const Profile = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className=" min-h-screen sm:w-full ">
        <div className=" sm:w-[72vw] lg:w-[48vw] sm:ml-[20%] lg:ml-[35%]">
        <ProfileComponent />
      </div>
      </div>
    </div>
  );
};

export default Profile;
