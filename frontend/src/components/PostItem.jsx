import React from "react";
import { Link } from "react-router-dom";
import "../styles/postItem.css";
import { ImArrowUp } from "react-icons/im";
// eslint-disable-next-line no-unused-vars
import { FaCommentAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";

function PostItem({ post }) {
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
          <ImArrowUp /> <span className="votes"> {post.votes} </span>
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
