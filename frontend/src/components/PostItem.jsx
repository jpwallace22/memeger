import React from "react";

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
    </div>
  );
}

PostItem.defaultProps = {
  post: {},
};

export default PostItem;
