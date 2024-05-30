import React from "react";
import { Navbar, Settings as SettingsComponent } from "../components/index";

const Settings = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full">
        <div className=" sm:w-[72vw] lg:w-[40vw] sm:ml-[20%] lg:ml-[35%]">
          <SettingsComponent />
        </div>
      </div>
    </div>
  );
};

export default Settings;
