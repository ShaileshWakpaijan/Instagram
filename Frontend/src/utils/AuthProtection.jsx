import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { setAuthentication } from "../store/reducers/userSlice";
import axios from "./axios";
import { loginAction } from "../store/actions/userAction";

const AuthProtection = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const verified = await axios.get("user/validate-user");
        if (verified?.data?.success) {
          dispatch(loginAction(verified?.data?.data));
        } else {
          dispatch(setAuthentication(false));
        }
      } catch (error) {
        console.error("Error fetching details:", error);
        dispatch(setAuthentication(false));
      }
      setLoading(false);
    };

    if (!isAuthenticated) {
      fetchDetails();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className=" flex justify-center items-center fixed top-0 left-0 h-full w-full bg-black">
        <img className=" h-20" src="/images/insta-name-logo-black.png" alt="" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default AuthProtection;
