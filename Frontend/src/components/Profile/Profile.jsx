import {
  RiAccountBoxLine,
  RiArrowLeftSLine,
  RiLayoutGrid2Line,
  RiScrollToBottomLine,
  RiSettingsLine,
} from "@remixicon/react";
import React, { useEffect, useState } from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileFollowInfo from "./ProfileFollowInfo";
import PostLayout from "../Posts/PostLayout";
import PostGrid from "../Posts/PostGrid";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/actions/userAction";
import { removeUser } from "../../store/reducers/userSlice";
import axios from "../../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "../LoadingSpinner";

const Profile = () => {
  let { pathname } = useLocation();
  pathname = pathname.split("/");
  pathname = pathname[pathname.length - 1];
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [isFeed, setIsFeed] = useState(false);

  const { user, userDetails } = useSelector((state) => state.user);

  const isItMe = params.username === userDetails.username ? true : false;

  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get(
        `/user/${params.username}/posts?limit=15&page=${page}`
      );
      setUserPosts((prevData) => [...prevData, ...data.data.userPosts]);
      setHasMore(data.data.isNext);
      if (data.data.isNext) setPage((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setUserPosts([]);
    setPage(1);
    setHasMore(false);

    dispatch(fetchUser(params.username));
    fetchUserPosts();

    const timeout = setTimeout(() => {}, 0);

    return () => {
      dispatch(removeUser());
      clearTimeout(timeout);
    };
  }, [params.username]);

  return user ? (
    <div className="pb-16 sm:pb-5">
      <div className=" sticky z-30 top-0 w-full bg-black py-2 text-center border-b-[1px] border-neutral-600 sm:hidden">
        <div className=" top-[50%] -translate-y-[50%] left-3 absolute">
          {isItMe ? (
            <Link to={"/profile/settings"}>
              <RiSettingsLine />
            </Link>
          ) : (
            <RiArrowLeftSLine onClick={() => navigate(-1)} />
          )}
        </div>
        <span className="">{user.username}</span>
      </div>

      <ProfileInfo user={user} isItMe={isItMe} />
      <div className=" sm:hidden">
        <ProfileFollowInfo user={user} />
      </div>

      <div
        id="prof-ops"
        className="flex justify-around py-3 bg-black border-t-[1px] border-neutral-600"
      >
        <Link
          to={`/profile/${user.username}`}
          onClick={() => setIsFeed(false)}
          className=" w-1/3 flex justify-center items-center"
        >
          <RiLayoutGrid2Line size={27} />
        </Link>

        <Link
          to={`/profile/${user.username}`}
          onClick={() => setIsFeed(true)}
          className=" w-1/3 flex justify-center items-center"
        >
          <RiScrollToBottomLine size={27} />
        </Link>

        {isItMe && (
          <Link
            onClick={() => setIsFeed(false)}
            to={`/profile/${user.username}/saved`}
            className=" w-1/3 flex justify-center items-center"
          >
            <img className=" w-5 h-5" src="/Icons/saved.png" alt="" />
          </Link>
        )}
      </div>
      <div className="">
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
          {!isFeed && pathname !== "saved" && (
            <PostGrid userPosts={userPosts} />
          )}
          {isFeed && (
            <div className=" bg-black text-white">
              {userPosts.length ? (
                userPosts.map((post, index) => {
                  return <PostLayout key={index} postDetails={post} />;
                })
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
              )}
            </div>
          )}
        </InfiniteScroll>
        {pathname === "saved" && <Outlet />}
      </div>
    </div>
  ) : (
    <div className=" bg-black relative w-full h-screen">
      <LoadingSpinner />
    </div>
  );
};

export default Profile;
