import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../index";
import { useForm } from "react-hook-form";
import axios from "../../utils/axios";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const handleRegister = async (data) => {
    setError("")
    try {
      let response = await axios.post("/user/verify-register", data);
      if (response.data.verified) {
        navigate("/profile/setup", { state: { fromCurrentApp: true, data } });
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className=" w-full h-[100vh] flex items-center justify-center">
      <div
        className=" max-w-[500px] sm:max-w-[100vw] mx-auto"
        id="signup-wrapper"
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
            onSubmit={handleSubmit((data) => handleRegister(data))}
          >
            <Input
              placeholder="Email"
              {...register("email")}
              className=" rounded-md bg-neutral-100 text-black border-[1px] border-gray-400 py-2 px-5"
            />
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className=" rounded-md bg-neutral-100 text-black border-[1px] border-gray-400 py-2 px-5"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className=" rounded-md bg-neutral-100 text-black border-[1px] border-gray-400 py-2 px-5"
            />
            {error && <p className=" text-red-500 self-end">{error}</p>}
            <Input
              type="submit"
              placeholder="Confirm Password"
              className="bg-root py-1 rounded-md mt-4 text-white"
              value="Sign Up"
            />

            <p className="mt-4 text-gray-600 text-[.8rem] mx-auto whitespace-nowrap">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-decoration-none color-root font-bold"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
