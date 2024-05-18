import axios from "../../utils/axios";
import {
  setAccessToken,
  setAuthentication,
  setUser,
  setUserDetails,
  setUserPosts,
} from "../reducers/userSlice";

export const loginAction = (data) => async (dispatch) => {
  try {
    dispatch(setUserDetails(data.loggedInUser));
    dispatch(setAccessToken(data.accessToken));
    dispatch(setAuthentication(true));
  } catch (err) {
    console.log(err);
  }
};

export const fetchUser = (username) => async (dispatch) => {
  try {
    let { data } = await axios.get(`/user/${username}`);
    dispatch(setUser(data.data.user));
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserPosts = (username) => async (dispatch) => {
  try {
    let { data } = await axios.get(`/user/${username}/posts`);
    dispatch(setUserPosts(data.data.userPosts));
  } catch (err) {
    console.log(err);
  }
};

export const userUpdate = (username) => async (dispatch) => {
  let { data } = await axios.get(`/user/${username}`);
  try {
    dispatch(setUserDetails(data.data.user));
  } catch (err) {
    console.log(err);
  }
};
