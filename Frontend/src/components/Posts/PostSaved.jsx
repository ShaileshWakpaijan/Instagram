import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";
import PostGrid from "./PostGrid";
import { RiAccountBoxLine } from "@remixicon/react";

const PostSaved = () => {
  const { userDetails } = useSelector((state) => state.user);
  const [savedPosts, setSavedPosts] = useState(null);
  const getSavedPosts = async () => {
    try {
      const { data } = await axios.get(`user/${userDetails.username}/saved`);
      let savedPostsArray = data.data.savedPosts;
      if (savedPostsArray) {
        setSavedPosts(savedPostsArray.map((post) => post.post));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSavedPosts();
  }, []);

  return savedPosts ? (
    <div className=" bg-black text-white">
      <PostGrid saved={true} userPosts={savedPosts} />
    </div>
  ) : (
    <div className=" w-full flex justify-center flex-col-reverse items-center h-60 bg-vilet-300">
      No Posts Saved.
      <div className="hidden sm:block">
        <RiAccountBoxLine size={150} />
      </div>
      <div className="sm:hidden">
        <RiAccountBoxLine size={100} />
      </div>
    </div>
  );
};

export default PostSaved;
