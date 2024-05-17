import React from "react";
import { Navbar, Profile as ProfileComponent } from "../components/index";

const Profile = () => {
  return (
    <div className=" sm:flex">
      <Navbar />
      <ProfileComponent />
    </div>
  );
};

export default Profile;
