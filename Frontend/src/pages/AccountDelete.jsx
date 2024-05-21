import React from "react";
import { AccountDelete as AccountDeleteComponent, Navbar } from "../components/index";

const AccountDelete = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full sm:h-screen sm:overflow-y-auto">
        <div className=" sm:w-[72vw] lg:w-[40vw] sm:mx-auto">
          <AccountDeleteComponent />
        </div>
      </div>
    </div>
  );
};

export default AccountDelete;
