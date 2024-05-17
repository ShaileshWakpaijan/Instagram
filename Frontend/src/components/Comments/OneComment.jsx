import React from "react";

const OneComment = ({comment}) => {
  return (
    <div className=" flex items-start gap-3">
      <div className=" h-9 w-9 bg-blue-500 rounded-full overflow-hidden">
        <img src={comment.owner.profilePicture} className=" w-full" alt="" />
      </div>
      <p className="  text-sm w-72 overflow-hidden">
        <span className=" font-bold">{comment.owner.username} </span>
        {comment.comment}
      </p>
    </div>
  );
};

export default OneComment;
