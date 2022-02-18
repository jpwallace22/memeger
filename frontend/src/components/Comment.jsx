import React from "react";
import "../styles/comment.css";
import { timeAgo } from "../assets/functions";

function Comment({ comment }) {
  return (
    <>
      <hr />
      <div className="comment">
        <div className="commenter-info">
          <div className="commenter">
            <img
              className="commenter-pic"
              src={comment.profile_pic}
              alt={comment.username}
            />
            <span className="commenter-name">{comment.username}</span>•
          </div>
          <span className="comment-time"> {timeAgo(comment.date)}</span>
        </div>
        <p className="body-info">{comment.body}</p>
      </div>
    </>
  );
}

export default Comment;
