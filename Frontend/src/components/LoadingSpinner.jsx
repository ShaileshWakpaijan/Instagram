import React from "react";
import instaSpinner from "/gif/instaSpinner.gif";

const Loading = () => {
  return (
    <div className="">
      <img
        src={instaSpinner}
        alt=""
        className={` w-[30px] z-30 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]`}
      />
    </div>
  );
};

export default Loading;
