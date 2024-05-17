import { RiArrowLeftSLine } from "@remixicon/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const PageHeading = ({ heading }) => {
  const navigate = useNavigate();
  return (
    <div
      id="setting-top"
      className=" sm:hidde sticky top-0 z-50 bg-black text-center py-2 border-b-[1px] border-neutral-600"
    >
      <div
        onClick={() => navigate(-1)}
        className=" top-[50%] -translate-y-[50%] left-3 absolute"
      >
        <RiArrowLeftSLine size={30} />
      </div>
      <span className="">{heading}</span>
    </div>
  );
};

export default PageHeading;
