import React, { useEffect, useState, useContext } from "react";
import PostContext from "../context/PostContext";
import UserContext from "../context/UserContext";
import { useParams } from "react-router-dom";
import PostItem from "../components/PostItem";
import Navbar from "../components/Navbar";
import Comment from "../components/Comment";
import Loader from "../components/Loader";
import CommentBox from "../components/CommentBox";

function SinglePost() {
  const { getSinglePost, posts } = useContext(PostContext);
  const { user } = useContext(UserContext);

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);
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
  }, [id, trigger]);

  return (
    <>
      <Navbar />
      <main>
        <div className="single-post">
          {isLoading ? (
            <div className="loading-cont">
              <Loader />
            </div>
          ) : post.error ? (
            <h2>{post.error}</h2>
          ) : (
            <>
              <PostItem post={post} posts={posts} />
              <div className="card">
                <h2>{post.comments_count} Comments</h2>
                {comments.error
                  ? comments.error
                  : comments.map((comment, index) => (
                      <Comment comment={comment} key={index} />
                    ))}
              </div>
              {post.allow_comments !== "0" &&
                (user.user_id ? (
                  <CommentBox
                    post={post.post_id}
                    setComments={setComments}
                    comments={comments}
                    setTrigger={setTrigger}
                    trigger={trigger}
                  />
                ) : (
                  <div className="card not-logged">
                    <h3>Log in to leave a comment</h3>
                  </div>
                ))}
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default SinglePost;
