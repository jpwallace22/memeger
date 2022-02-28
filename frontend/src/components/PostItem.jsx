import React, { useContext, useEffect } from "react";
import "../styles/postItem.css";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { ImArrowUp } from "react-icons/im";
// eslint-disable-next-line no-unused-vars
import { FaCommentAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";

function PostItem({ post }) {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const payload = {
    post_id: post.post_id,
    user_id: user.user_id,
  };

  const checkVote = async () => {
    const res = await fetch("/api/posts/vote.php", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await res.text();
  };

  const handleVote = async () => {
    if (user.user_id) {
      const res = await fetch("/api/posts/vote.php", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="post card">
      <h3 className="post-title">{post.title}</h3>
      <div className="post-user-info">
        <Link to={`/profile/${post.username}`}>
          <img src={post.profile_pic} alt={post.username} />{" "}
        </Link>
        <Link to={`/profile/${post.username}`}>
          <span className="cap">{post.username}</span>
        </Link>
      </div>
      <Link to={`/post/${post.post_id}`}>
        <img src={post.image} alt={post.title} className="post-image" />
      </Link>
      <div className="post-ui">
        <div className="post-ui-left">
          {checkVote() ? (
            <ImArrowUp onClick={handleVote} color="var(--gold)" />
          ) : (
            <ImArrowUp onClick={handleVote} />
          )}
          <span className="votes"> {post.votes} </span>
          <FaCommentAlt />{" "}
          <span className="comments"> {post.comments_count} </span>
        </div>
        <div className="post-ui-right">
          <span className="fav">
            {" "}
            <FaRegHeart />{" "}
          </span>
          {/* //todo if user has favorite, fill heart pink */}
          <span className="share">
            <IoShareOutline />
          </span>
        </div>
      </div>
      <p className="post-body">{post.body}</p>
    </div>
  );
}

PostItem.defaultProps = {
  post: {},
};

export default PostItem;
