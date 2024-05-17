import React, { useEffect, useState } from "react";
import PostLayout from "../Posts/PostLayout";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import PageHeading from "../PageHeading";

const PostIndividual = () => {
  const { postid } = useParams();
  const [postDetails, setPostDetails] = useState(null);

  const getPostDets = async () => {
    const { data } = await axios.get(`/post/${postid}`);
    setPostDetails(data.data);
  };

  useEffect(() => {
    getPostDets();
  }, []);

  return (
    <div className=" min-h-screen bg-black">
      <PageHeading heading={"Post"} />
      <PostLayout postDetails={postDetails} />
    </div>
  );
};

export default PostIndividual;
