import React from "react";
import { Navbar, Settings as SettingsComponent } from "../components/index";

const Settings = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full sm:h-screen sm:overflow-y-auto">
        <div className=" sm:w-[72vw] lg:w-[40vw] sm:mx-auto">
          <SettingsComponent />
        </div>
      </div>
    </div>
  );
};

export default Settings;
