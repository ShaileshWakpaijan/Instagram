import React, { useEffect, useState } from "react";
import PostLayout from "../Posts/PostLayout";
import axios from "../../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "../LoadingSpinner";
import { useParams } from "react-router-dom";

const ProfileFeed = () => {
  const params = useParams();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const fetchUserPosts = async () => {
    try {
      let { data } = await axios.get(
        `/user/${params.username}/posts?limit=4&page=${page}`
      );
      setUserPosts((prevData) => [...prevData, ...data.data.userPosts]);
      setPage((prev) => data.data.isNext && prev + 1);
      setHasMore(data.data.isNext);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  return (
    userPosts && (
      <InfiniteScroll
        dataLength={userPosts.length}
        next={fetchUserPosts}
        hasMore={hasMore}
        loader={
          <div className=" relative py-8 sm:py-4">
            <LoadingSpinner />
          </div>
        }
      >
        <div className=" bg-black text-white">
          {userPosts.map((post, index) => {
            return <PostLayout key={index} postDetails={post} />;
          })}
        </div>
      </InfiniteScroll>
    )
  );
};

export default ProfileFeed;
