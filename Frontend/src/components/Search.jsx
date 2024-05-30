import { RiCloseCircleFill, RiSearch2Line } from "@remixicon/react";
import React, { useState } from "react";
import UserListItem from "./UserListItem";
import axios from "../utils/axios";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const handleChange = async (e) => {
    setLoading(true);
    setQuery(e.target.value);
    let { data } = await axios.get(`/user/search?username=${e.target.value}`);
    setUsers(data.data.users);
    setLoading(false);
  };
  return (
    <div className=" min-h-screen bg-black ">
      <div
        className="flex items-center justify-center gap-1 py-2 border-b-[1px] border-neutral-600 
      sm:justify-between
      "
      >
        <div
          className=" gap-2 border-2 border-neutral-600 rounded-md pl-2 py-[2px] flex w-[76%] items-center justify-between
        sm:w-[90%] sm:my-5
        "
        >
          <RiSearch2Line size={15} className=" text-neutral-400" />
          <input
            value={query}
            onChange={handleChange}
            placeholder="Search"
            className=" text-xs py-1 text-neutral-300 text focus:outline-none w-[80%] bg-transparent"
            type="text"
            name="serach"
            id=""
          />

          <div className=" relative w-5">
            {!loading ? (
              query && (
                <RiCloseCircleFill
                  onClick={() => {
                    setQuery("");
                    setUsers([]);
                  }}
                  className=" text-neutral-400"
                  size={15}
                />
              )
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className=" text-xs font-bold px-2"
        >
          Cancle
        </button>
      </div>
      <div className="p-4 flex flex-col gap-4 sm:h-[85vh] overflow-auto scrollbar">
        {users.map((user, index) => {
          return <UserListItem user={user} fromSearch={true} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Search;
