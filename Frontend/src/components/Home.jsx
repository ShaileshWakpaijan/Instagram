import { RiHeartLine } from "@remixicon/react";
import React, { useEffect, useState } from "react";
import PostLayout from "./Posts/PostLayout";
import axios from "../utils/axios";
import LoadingSpinner from "./LoadingSpinner";
const Home = () => {
  const [posts, setPosts] = useState(null);
  const getHomePosts = async () => {
    try {
      let { data } = await axios.get("/post/home?limit=5");
      setPosts(data.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHomePosts();
  }, []);

  return (
    <div id="home" className=" bg-black pb-12 min-h-screen">
      <div className=" bg-black flex items-center justify-between px-3 py-2 border-b-[1px] border-neutral-600">
        <img className=" h-9" src="/images/insta-name-logo-black.png" alt="" />
        <RiHeartLine size={30} />
      </div>

      <div
        id="home-story"
        className=" whitespace-nowrap overflow-x-auto bg-stone-900 py-1 px-5"
      >
        <div className=" inline-block mr-3">
          <img
            className=" w-12 h-12 bg-blue-900 rounded-full overflow-hidden mx-auto"
            src="/images/david.png"
            alt=""
          />
          <p className=" mt-1 text-xs font-semibold w-full text-center">
            Your story
          </p>
        </div>
      </div>

        <div id="home-page">
          {posts ? (
            posts.map((post, index) => {
              return <PostLayout postDetails={post} key={index} />;
            })
          ) : (
            <LoadingSpinner />
          )}
        </div>
    </div>
  );
};

export default Home;
