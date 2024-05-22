import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiMore2Fill } from "@remixicon/react";
import Modal from "../Modal";
import axios from "../../utils/axios";

const OneComment = ({ comment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [clickedOn, setClickedOn] = useState("");

  const { userDetails } = useSelector((state) => state.user);
  const isItMe = comment.owner.username === userDetails.username ? true : false;

  const handleDeleteComment = async () => {
    try {
      let response = await axios.delete(`/comment/${comment._id}`);
      console.log(response.data);
      setClickedOn("")
      setIsDeleted(true);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  if (clickedOn === "Delete") handleDeleteComment();
  return (
    <div
      className={` ${
        isDeleted && "hidden"
      } flex items-start  gap-3 ${isItMe && "justify-between"}`}
    >
      <Link
        to={`/profile/${comment.owner.username}`}
        className=" h-9 w-9 bg-blue-500 rounded-full overflow-hidden"
      >
        <img src={comment.owner.profilePicture} className=" w-full" alt="" />
      </Link>
      <p className="  text-sm w-72 sm:w-[80%] overflow-hidden  text-wrap">
        <span className=" font-bold">{comment.owner.username} </span>
        {comment.comment}
      </p>
      {isItMe && (
        <div
          className=" my-auto hover:bg-stone-900 rounded-full p-2 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <RiMore2Fill className=" rotate-90" />
        </div>
      )}

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        options={[{ content: "Delete", style: "text-red-500 border-none" }]}
        setClickedOn={setClickedOn}
      />
    </div>
  );
};

export default OneComment;
