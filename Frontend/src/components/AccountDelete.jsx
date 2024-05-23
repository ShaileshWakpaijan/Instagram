import React from "react";
import PageHeading from "./PageHeading";

const AccountDelete = () => {
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
            // target="_blank"
            className=" text-sky-500"
          >
            {import.meta.env.VITE_CONTACT_EMAIL}
          </a>
        </p>

        <button className=" bg-rose-600 py-1 px-3 rounded-md mt-4 text-white text-sm">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default AccountDelete;
