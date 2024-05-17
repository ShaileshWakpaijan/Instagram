import React from "react";
import { Navbar, Search as SearchComponent } from "../components/index";

const Search = () => {
  return (
    <div className=" sm:flex bg-black">
      <Navbar />
      <div className="sm:w-full sm:h-screen sm:overflow-y-auto">
        <div className=" sm:w-[72vw] lg:w-[48vw] sm:mx-auto">
          <SearchComponent />
        </div>
      </div>
    </div>
  );
};

export default Search;
