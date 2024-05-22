import React, { createContext, useState } from "react";

export const FlashMsgContext = createContext();

const FlashContext = ({ children }) => {
  const [FlashMsg, setFlashMsg] = useState("");

  const showFlashMsg = (msg) => {
    setFlashMsg(msg);

    setTimeout(() => {
      setFlashMsg("");
    }, 1500);
  };

  return (
    <FlashMsgContext.Provider value={{ FlashMsg, showFlashMsg }}>
      {children}
    </FlashMsgContext.Provider>
  );
};

export default FlashContext;
