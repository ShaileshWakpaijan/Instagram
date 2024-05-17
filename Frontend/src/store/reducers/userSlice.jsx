import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: null,
    user: null,
    userPosts: null,
    isAuthenticated: false,
    accessToken: null,
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const {
  setUserDetails,
  setAuthentication,
  setAccessToken,
  setUser,
  setUserPosts,
  removeUser,
} = userSlice.actions;

export default userSlice.reducer;
