import React, { useEffect, useState, useContext } from "react";
import PostContext from "../context/PostContext";
import { useParams } from "react-router-dom";
import PostItem from "../components/PostItem";
import Navbar from "../components/Navbar";
import Comment from "../components/Comment";

function SinglePost() {
  const { getSinglePost } = useContext(PostContext);

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    //fetch posts for today
    async function getPost() {
      const data = await getSinglePost(id);
      setPost(data.post);
      setComments(data.comments);
      setIsLoading(false);
    }
    getPost();
  }, [id, getSinglePost]);

  //todo add loading widget
  return (
    <>
      <Navbar />
      <main>
        <div className="single-post">
          {isLoading ? (
            "loading..."
          ) : post.error ? (
            <h2>{post.error}</h2>
          ) : (
            <PostItem post={post} />
          )}
          <div className="card">
            <h2>{post.comments_count} Comments</h2>
            {comments.error
              ? comments.error
              : comments.map((comment, index) => (
                  <Comment comment={comment} key={index} />
                ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default SinglePost;
