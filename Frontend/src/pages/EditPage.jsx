import React from "react";
import { EditPage as EditPageComponent, Navbar } from "../components/index";

const EditPage = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full sm:h-screen sm:overflow-y-auto">
        <div className=" sm:w-[72vw] lg:w-[40vw] sm:mx-auto">
          <EditPageComponent />
        </div>
      </div>
    </div>
  );
};

export default EditPage;
