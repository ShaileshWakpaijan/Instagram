import { RiAccountBoxLine } from "@remixicon/react";
import React from "react";
import { Link } from "react-router-dom";

const PostGrid = ({ userPosts }) => {

  return userPosts && userPosts.length ? (
    <div id="all-posts" className=" grid grid-cols-3 gap-1 ">
      {userPosts &&
        userPosts.map((post, index) => {
          return (
            <Link
              to={`/post/${post._id}`}
              key={index}
              className=" bg-stone-800 h-[33vw] sm:h-[23vw] lg:h-[16vw] border-[1px] border-neutral-600"
            >
              <img
                src={post.image}
                alt=""
                className=" w-full h-full object-cover objecce"
              />
            </Link>
          );
        })}
    </div>
  ) : (
    <div className=" w-full flex justify-center flex-col-reverse items-center h-60 bg-vilet-300">
      No Posts Yet
      <div className="hidden sm:block">
        <RiAccountBoxLine size={150} />
      </div>
      <div className="sm:hidden">
        <RiAccountBoxLine size={100} />
      </div>
    </div>
  );
};

export default PostGrid;
