import React from "react";
import { AccountDelete as AccountDeleteComponent, Navbar } from "../components/index";

const AccountDelete = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full">
        <div className=" sm:w-[72vw] lg:w-[40vw] sm:ml-[20%] lg:ml-[35%]">
          <AccountDeleteComponent />
        </div>
      </div>
    </div>
  );
};

export default AccountDelete;
