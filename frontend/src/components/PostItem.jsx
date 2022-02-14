import React from "react";
import "./postItem.css";
import { ImArrowUp } from "react-icons/im";
// eslint-disable-next-line no-unused-vars
import { FaCommentAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";

function PostItem({ post }) {
  return (
    <div className="post">
      <h3 className="post-title">{post.title}</h3>
      <div className="post-user-info">
        <img
          src={post.profile_pic}
          alt={post.username}
          width={30}
          height={30}
        />
        <span>{post.username}</span>
      </div>
      <img src={post.image} alt={post.title} className="post-image" />
      <div className="post-ui">
        <div className="post-ui-left">
          <ImArrowUp /> <span className="votes">{post.votes} </span>
          <FaCommentAlt />{" "}
          <span className="comments">{post.comments_count}</span>
        </div>
        <div className="post-ui-right">
          <FaRegHeart /> {/* //todo if user has favorite, fill heart pink */}
          <IoShareOutline />
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
