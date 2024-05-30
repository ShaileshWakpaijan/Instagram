import React from "react";
import { EditPage as EditPageComponent, Navbar } from "../components/index";

const EditPage = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full">
        <div className=" sm:w-[72vw] lg:w-[40vw] sm:ml-[20%] lg:ml-[35%]">
          <EditPageComponent />
        </div>
      </div>
    </div>
  );
};

export default EditPage;
