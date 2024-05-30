import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import UserListItem from "../UserListItem";
import PageHeading from "../PageHeading";
import LoadingSpinner from "../LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";

const FollowList = () => {
  const { state } = useLocation();
  const params = useParams();

  const pageName = state.from.toLowerCase();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [followList, setFollowList] = useState([]);

  const fetchFollow = async () => {
    try {
      let { data } = await axios.get(
        `/follow/${params.username}/${pageName}?limit=20&page=${page}`
      );
      setFollowList((prevData) => [...prevData, ...data.data.user]);
      setPage((prev) => data.data.isNext && prev + 1);
      setHasMore(data.data.isNext);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFollow();
  }, []);

  return followList ? (
    <div className=" bg-black min-h-screen">
      <PageHeading heading={`${state.from}`} />
      <InfiniteScroll
        dataLength={followList.length}
        next={fetchFollow}
        hasMore={hasMore}
        loader={
          <div className=" relative py-8 sm:py-4">
            <LoadingSpinner />
          </div>
        }
      >
        {followList.length ? (
          <div className="p-4 flex flex-col gap-4">
            {followList.map((user, index) => {
              return (
                <UserListItem
                  user={
                    pageName === "following" ? user.following : user.followers
                  }
                  fromSearch={false}
                  key={index}
                />
              );
            })}
          </div>
        ) : (
          <div className=" text-center py-10 text-sm text-neutral-400">
            {" "}
            No one in {pageName}
          </div>
        )}
      </InfiniteScroll>
    </div>
  ) : (
    <div className=" bg-black relative w-full h-screen">
      <LoadingSpinner />
    </div>
  );
};

export default FollowList;
