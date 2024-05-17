import React from "react";
import PostLayout from "../Posts/PostLayout";
import { useSelector } from "react-redux";

const ProfileFeed = () => {
  const { userPosts } = useSelector((state) => state.user);
  return (
    userPosts && (
      <div className=" bg-black text-white">
        {userPosts.map((post, index) => {
          return <PostLayout key={index} postDetails={post} />;
        })}
      </div>
    )
  );
};

export default ProfileFeed;
