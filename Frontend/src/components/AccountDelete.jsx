import React from "react";

const AccountDelete = () => {
  return (
    <>
      <h1 className=" text-lg">Disclaimer: Account Deletion</h1>
      
      <br />
      <p className=" text-sm">
        Before you delete your account, please note the following:
        <ol type="a">
          <li>
            Permanent Action: Account deletion is irreversible. You cannot
            recover your account once it’s deleted.
          </li>
          <li>
            Data Loss: All your data, including profile information and
            settings, will be permanently deleted.
          </li>
          <li>
            Content Removal: All your posts, comments, and other content will be
            permanently removed and cannot be recovered.
          </li>
          <li>
            Service Access: You will lose access to any services or content
            associated with your account, including purchases or subscriptions.
          </li>
        </ol>
        By proceeding, you acknowledge and accept these terms. If you have
        questions, please contact support before deleting your account.
        **[Proceed with Account Deletion]**
      </p>
    </>
  );
};

export default AccountDelete;
