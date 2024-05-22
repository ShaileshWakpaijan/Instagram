import React from "react";
import Router from "./utils/Router";
import FlashMsg from "./components/FlashMsg";

const App = () => {
  return (
    <div className="w-full font-[poppins] min-h-screen text-white ">
      <FlashMsg />
      <Router />
    </div>
  );
};

export default App;
