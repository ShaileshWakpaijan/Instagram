import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";
import PostGrid from "./PostGrid";
import { RiAccountBoxLine } from "@remixicon/react";
import PageHeading from "../PageHeading";

const PostLiked = () => {
  const { userDetails } = useSelector((state) => state.user);
  const [likedPosts, setLikedPosts] = useState(null);
  const getLikedPosts = async () => {
    try {
      const { data } = await axios.get(`user/${userDetails.username}/liked`);
      let likedPostsArray = data.data.likedPosts;
      if (likedPostsArray) {
        setLikedPosts(likedPostsArray.map((post) => post.post));
        console.log(likedPostsArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLikedPosts();
  }, []);

  return (
    <div className=" min-h-screen">
      <PageHeading heading={"Liked Posts"} />
      {likedPosts ? (
        <div className=" bg-black text-white pt-5">
          <PostGrid saved={true} userPosts={likedPosts} />
        </div>
      ) : (
        <div className=" w-full flex justify-center flex-col-reverse items-center h-60 bg-vilet-300">
          No Posts Liked.
          <div className="hidden sm:block">
            <RiAccountBoxLine size={150} />
          </div>
          <div className="sm:hidden">
            <RiAccountBoxLine size={100} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostLiked;
