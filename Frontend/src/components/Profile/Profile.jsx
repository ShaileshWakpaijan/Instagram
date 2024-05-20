import {
  RiArrowLeftSLine,
  RiLayoutGrid2Line,
  RiScrollToBottomLine,
  RiSettingsLine,
} from "@remixicon/react";
import React, { useEffect } from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileFollowInfo from "./ProfileFollowInfo";
import PostGrid from "../Posts/PostGrid";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, fetchUserPosts } from "../../store/actions/userAction";
import { removeUser } from "../../store/reducers/userSlice";

const Profile = () => {
  let { pathname } = useLocation();
  pathname = pathname.split("/");
  pathname = pathname[pathname.length - 1];
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { user, userDetails, userPosts } = useSelector((state) => state.user);

  const isItMe = params.username === userDetails.username ? true : false;

  useEffect(() => {
    dispatch(fetchUser(params.username));
    dispatch(fetchUserPosts(params.username));

    return () => dispatch(removeUser());
  }, [isItMe]);

  return user ? (
    <div
      id="profile-page"
      className=" min-h-screen bg-black pb-12 text-white
      sm:w-full sm:h-screen sm:overflow-y-auto
      "
    >
      <div className=" sm:w-[72vw] lg:w-[48vw] sm:mx-auto">
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
            className=" w-1/3 flex justify-center items-center"
          >
            <RiLayoutGrid2Line size={27} />
          </Link>

          <Link
            to={`/profile/${user.username}/feed`}
            className=" w-1/3 flex justify-center items-center"
          >
            <RiScrollToBottomLine size={27} />
          </Link>

          {isItMe && <Link
            to={`/profile/${user.username}/saved`}
            className=" w-1/3 flex justify-center items-center"
          >
            <img className=" w-5 h-5" src="/Icons/saved.png" alt="" />
          </Link>}
        </div>
        <div className="">
          {pathname !== "feed" && pathname !== "saved" && (
            <PostGrid userPosts={userPosts} />
          )}
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Profile;
