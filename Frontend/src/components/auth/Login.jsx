import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../index";
import { useForm } from "react-hook-form";
import useLogin from "../../hooks/useLogin";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/actions/userAction";
import { FlashMsgContext } from "../../context/FlashContext";
import LoadingSpinner from "../LoadingSpinner";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showFlashMsg } = useContext(FlashMsgContext);

  const handleLogin = async (data) => {
    setLoading(true);
    setError("");
    const userDetails = await useLogin(data);
    if (userDetails.error) {
      setError(userDetails.error);
      setLoading(false);
      return;
    }
    setLoading(false);
    showFlashMsg("Login Successfully.");
    dispatch(loginAction(userDetails));
    navigate(`/profile/${userDetails.loggedInUser.username}`);
  };

  return (
    <div className=" w-full h-[100vh] flex items-center justify-center">
      <div
        className=" max-w-[500px] sm:max-w-[100vw] mx-auto"
        id="login-wrapper"
      >
        <div
          id="main"
          className="max-w-[800px] h-[100vh] w-full flex flex-col justify-center items-center mx-auto sm:flex-row sm:justify-evenly max-h-[800px]"
        >
          <img
            className=" w-1/2 sm:w-1/3"
            src="/images/instagram-name-logo.webp"
          />

          <form
            action=""
            className=" sm:text-[.8rem] w-9/12 flex flex-col mt-12 gap-[5px] sm:w-2/5 sm:h-4/5 sm:border-2 sm:rounded-xl sm:border-black sm:px-7 sm:bg-stone-100 sm:justify-center "
            onSubmit={handleSubmit((data) => handleLogin(data))}
          >
            <Input
              placeholder="username or email"
              {...register("username")}
              className=" rounded-md bg-neutral-100 text-black border-[1px] border-gray-400 py-2 px-5"
            />
            <Input
              type="password"
              placeholder="password"
              {...register("password")}
              className=" rounded-md bg-neutral-100 text-black border-[1px] border-gray-400 py-2 px-5"
            />
            {error && <p className=" text-red-500 self-end">{error}</p>}
            <button
              disabled={loading}
              type="submit"
              className=" disabled:bg-slate-400 bg-root py-1 rounded-md mt-4 text-white relative"
            >
              <span className={`${loading && "invisible"}`}>Login</span>
              {loading && <LoadingSpinner />}
            </button>

            <p className="mt-4 text-gray-600 text-[.8rem] mx-auto whitespace-nowrap">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="text-decoration-none color-root font-bold"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
