import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostItem from "../components/PostItem";
import { getSinglePost } from "../assets/functions/postFunctions";
import Navbar from "../components/Navbar";

function SinglePost() {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    //fetch posts for today
    async function getPost() {
      const post = await getSinglePost(id);
      setPost(post);
      setIsLoading(false);
    }
    getPost();
  }, [id]);

  //todo add loading widget
  return (
    <>
      <Navbar />
      {isLoading ? (
        "loading..."
      ) : post.error ? (
        <h2>{post.error}</h2>
      ) : (
        <PostItem post={post} />
      )}
    </>
  );
}

export default SinglePost;
