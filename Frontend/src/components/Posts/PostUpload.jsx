import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import PageHeading from "../PageHeading";
import axios from "../../utils/axios";

const PostUpload = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [caption, setCaption] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const image = state.image;

  const reader = new FileReader();
  reader.onload = function (e) {
    setPreview(e.target.result);
  };
  reader.readAsDataURL(image);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (caption.trim() === "") return setError("Caption should not be empty.");

    setLoading(true);
    let formData = new FormData();
    formData.append("postImage", image);
    formData.append("caption", caption);

    try {
      let { data } = await axios.post(`/post`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(data.data);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className=" min-h-screen w-full bg-black">
      <PageHeading heading={"Add Post"} />
      <form className=" w-full flex flex-col" onSubmit={handleSubmit}>
        <div htmlFor="postImage" className=" my-5">
          <img
            src={preview}
            alt=""
            className=" w-full object-cover object-center sm:w-3/5 mx-auto"
          />
        </div>
        <textarea
          value={caption}
          type="text"
          id="bio"
          rows={2}
          placeholder="Write caption here"
          className=" w-[90%] mx-auto m-10 py-1 px-3 rounded-md bg-transparent mb-0 border-[1px] border-neutral-600 resize-none sm:w-[80%]"
          onChange={(e) => setCaption(e.target.value)}
        />
        {error && (
          <span className=" text-sm text-red-500 my-auto mt-1 ml-[5%] sm:ml-[10%] ">{error}</span>
        )}
        <button
          type="submit"
          className=" ml-[5%] sm:ml-[10%] mt-5 w-fit bg-root px-4 py-2 rounded-md relative"
        >
          <span className={`${loading && "invisible"}`}>Post</span>
          {loading && <LoadingSpinner />}
        </button>
      </form>
    </div>
  );
};

export default PostUpload;
