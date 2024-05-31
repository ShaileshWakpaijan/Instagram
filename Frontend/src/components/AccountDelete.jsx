import React, { useContext, useState } from "react";
import PageHeading from "./PageHeading";
import axios from "../utils/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FlashMsgContext } from "../context/FlashContext";

const AccountDelete = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { userDetails } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { showFlashMsg } = useContext(FlashMsgContext);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `/user/${userDetails.username}/delete`,
        {
          data: { password },
        }
      );
      console.log(data.message);
      showFlashMsg(data.message);
      navigate("/login");
    } catch ({ response }) {
      setError(response.data.message);
      console.log(response.data.message);
    }
  };

  return (
    <div className=" min-h-screen">
      <PageHeading heading={"Account Delete"} />
      <div className=" py-5 px-4 text ">
        <h1 className=" text-lg text-red-500">Disclaimer: Account Deletion</h1>
        <br />
        <p className=" text-sm mb-3">
          Before you delete your account, please note the following:
        </p>
        <ol className="px-4 list-decimal">
          <li className=" mb-3">
            <b>Permanent Action:</b> Account deletion is irreversible. You
            cannot recover your account once it’s deleted.
          </li>
          <li className=" mb-3">
            <b>Data Loss:</b> All your data, including profile information and
            settings, will be permanently deleted.
          </li>
          <li className=" mb-3">
            <b>Content Removal:</b> All your posts, comments, and other content
            will be permanently removed and cannot be recovered.
          </li>
        </ol>
        <p className=" mb-2">
          By proceeding, you acknowledge and accept these terms. If you have
          questions, please contact support before deleting your account.
        </p>
        <p className=" my-4">
          Email:{" "}
          <a
            href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
            className=" text-sky-500"
          >
            {import.meta.env.VITE_CONTACT_EMAIL}
          </a>
        </p>

        <div className=" flex flex-col gap-3">
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            type="password"
            id="name"
            name="password"
            className=" w-fit py-1 px-3 rounded-md bg-transparent border-[1px] border-neutral-600"
          />
          <p className=" text-sm text-red-500">{error}</p>
          <button
            disabled={!password.length}
            onClick={handleDelete}
            className=" disabled:bg-stone-500 w-fit bg-rose-600 py-1 px-3 rounded-md mt-4 text-white text-sm"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDelete;
