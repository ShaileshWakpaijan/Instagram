import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  EditPage,
  Explore,
  Login,
  Profile,
  Search,
  Settings,
  Signup,
  PostIndividual,
  FollowList,
  Comment,
  PostUpload,
  PostSaved,
  Home,
  PostLiked,
  AccountDelete,
} from "../pages/index";
import ProfileSetup from "../pages/ProfileSetup";
import ProtectedRoutes from "./ProtectedRoutes";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />}>
            <Route path="/profile/:username/saved" element={<PostSaved />} />
          </Route>
          <Route path="/profile/:username/followers" element={<FollowList />} />
          <Route path="/profile/:username/following" element={<FollowList />} />
          <Route path="/profile/:username/delete" element={<AccountDelete />} />
          <Route path="/profile/settings" element={<Settings />} />
          <Route path="/profile/settings/edit" element={<EditPage />} />
          <Route path="/profile/settings/liked" element={<PostLiked />} />
          <Route path="/post/upload" element={<PostUpload />} />
          <Route path="/post/:postid" element={<PostIndividual />} />
          <Route path="/post/:postid/comment" element={<Comment />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore" element={<Explore />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/setup" element={<ProfileSetup />} />
      </Routes>
    </div>
  );
};

export default Router;
