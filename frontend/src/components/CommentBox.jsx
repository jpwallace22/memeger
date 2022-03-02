import React, { useState, useContext } from "react";
import "../styles/commentBox.css";
import UserContext from "../context/UserContext";
import Button from "./Button";

function CommentBox({ post, setComments, comments, setTrigger, trigger }) {
  //global state
  const { user } = useContext(UserContext);

  //local state
  const [commentText, setCommentText] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e, postId, userId, comment) => {
    e.preventDefault();
    try {
      const payload = {
        postId,
        userId,
        comment,
      };
      const res = await fetch("/api/comments/add.php", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.errors) {
        if (comments.length > 0) {
          setComments([...comments, data]);
          setCommentText("");
        } else {
          setComments([data]);
          setCommentText("");
        }
      } else {
        setErrors(data.errors);
      }
      setTrigger(!trigger);
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <div className="card comment-box" id="comment-box">
      <h3 className="mb-2">Leave a comment</h3>
      {errors.invalid && <span className="error">{errors.invalid}</span>}
      <form onSubmit={(e) => handleSubmit(e, post, user.user_id, commentText)}>
        <div className="comment-user mb-2 cap">
          <img src={user.profile_pic} alt={user.username} className="mr-1" />
          <span>{user.username}</span>
        </div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="4"
          className="mb-2"
          value={commentText}
          onChange={({ target }) => setCommentText(target.value)}
        ></textarea>

        <Button primary>Send it</Button>
      </form>
    </div>
  );
}

export default CommentBox;
