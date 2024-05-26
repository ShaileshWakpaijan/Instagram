import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import UserListItem from "../UserListItem";
import PageHeading from "../PageHeading";
import LoadingSpinner from '../LoadingSpinner'

const FollowList = () => {
  const { state } = useLocation();
  const params = useParams();

  const page = state.from.toLowerCase();

  const [followList, setFollowList] = useState(null);

  const fetchFollow = async () => {
    let { data } = await axios.get(`/follow/${params.username}/${page}?`);
    setFollowList(data.data.user);
  };

  useEffect(() => {
    fetchFollow();
  }, []);

  return followList ? (
    <div className=" bg-black min-h-screen">
      <PageHeading heading={`${state.from}`} />
      <div className="p-4 flex flex-col gap-4">
        {followList.map((user, index) => {
          return (
            <UserListItem
              user={page === "following" ? user.following : user.followers}
              fromSearch={false}
              key={index}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <div className=" bg-black relative w-full h-screen">
      <LoadingSpinner />
    </div>
  );
};

export default FollowList;
