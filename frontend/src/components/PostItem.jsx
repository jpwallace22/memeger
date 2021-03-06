/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "../styles/postItem.css";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { ImArrowUp } from "react-icons/im";
// eslint-disable-next-line no-unused-vars
import { FaCommentAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";

function PostItem({ post }) {
  const { user } = useContext(UserContext);

  const [voted, setVoted] = useState(false);

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
    data ? setVoted(true) : setVoted(false);
  };

  const handleUpVote = async () => {
    if (user.user_id) {
      const res = await fetch("/api/posts/vote.php", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      checkVote();
      post = {
        ...post,
        votes: post.votes++,
      };
    } else {
      navigate("/login");
    }
  };

  const handleDownVote = async () => {
    if (user.user_id) {
      const res = await fetch("/api/posts/vote.php", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      checkVote();
      post = {
        ...post,
        votes: post.votes--,
      };
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkVote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {voted ? (
            <ImArrowUp
              className="vote-arrow"
              onClick={handleDownVote}
              color="var(--gold)"
            />
          ) : (
            <ImArrowUp className="vote-arrow" onClick={handleUpVote} />
          )}
          <span className="votes"> {post.votes} </span>{" "}
          <Link to={`/post/${post.post_id}`}>
            <span className="comments">
              {" "}
              <FaCommentAlt /> {post.comments_count}{" "}
            </span>
          </Link>
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
