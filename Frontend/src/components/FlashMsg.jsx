import React, { useContext } from "react";
import { FlashMsgContext } from "../context/FlashContext";

const FlashMsg = () => {
  const { FlashMsg } = useContext(FlashMsgContext);
  return (
    FlashMsg && (
      <div className=" text-center rounded-lg fixed px-7 py-2 text-sm bg-stone-800/70  text-white bottom-16 left-[50%] -translate-x-[50%]">
        {FlashMsg}
      </div>
    )
  );
};

export default FlashMsg;
