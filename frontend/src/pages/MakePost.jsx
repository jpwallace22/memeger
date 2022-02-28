import React, { useState, useContext, useEffect } from "react";
import "../styles/loginPage.css";
import "../styles/makePost.css";
import PostContext from "../context/PostContext";
import UserContext from "../context/UserContext";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

function MakePost() {
  //global state
  const { registerNewUser } = useContext(PostContext);
  const { user } = useContext(UserContext);

  //form state
  const [invalid, setInvalid] = useState("");
  const [errors, setErrors] = useState({});
  const [src, setSrc] = useState();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [allow_comments, setAllow_comments] = useState(1);

  //hooks
  const navigate = useNavigate();

  //on form submit, send data to register user API, redirect if success.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      src,
      body,
      allow_comments,
      user_id: user.user_id,
    };
    const res = await fetch("/api/posts/post.php", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    data === "success" && navigate("/");
    data === "error" && setInvalid("There was an error with the post.");
    data.errors && setErrors(data.errors);
    console.log(data);
  };

  const handleImageUpload = async ({ target }) => {
    const data = new FormData();
    data.append("uploadedfile", target.files[0]);
    data.append("user_id", user.user_id);
    const res = await fetch("/api/posts/upload-image.php", {
      method: "POST",
      body: data,
    });
    const src = await res.json();
    setSrc(src);
  };

  return (
    <main className="new-post">
      <div className="back">
        <HiOutlineArrowNarrowLeft onClick={() => navigate(-1)} />
        {/* Goes back to last page */}
      </div>
      <div className="logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      {!user.user_id ? (
        <div className="card not-logged">
          <h2>You must be logged in to make a post.</h2>
          <Link to="/login">
            <Button primary>Log In</Button>
          </Link>
        </div>
      ) : (
        <form className="card" onSubmit={(e) => handleSubmit(e)}>
          {errors.title && <span className="error">{errors.title}</span>}
          <input
            type="text"
            name="user-title"
            id="user-title"
            className="title"
            placeholder="Add Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          {!src ? (
            <>
              {errors.src && <span className="error">{errors.src}</span>}
              <input
                type="file"
                name="user-image"
                id="user-image"
                className="image"
                onChange={(e) => handleImageUpload(e)}
                accept="image/png, image/jpeg"
                encType="multipart/form-data"
              />
            </>
          ) : (
            <img src="/frontend/src/assets/images/posts/test.jpg" alt="" />
          )}
          {src && <img src={src} alt="" />}
          {errors.body && <span className="error">{errors.body}</span>}
          <textarea
            name="body"
            id="user-body"
            cols="30"
            rows="5"
            className="body"
            value={body}
            placeholder="Add a description. It doesn't have to be long... but it IS required."
            onChange={({ target }) => setBody(target.value)}
          ></textarea>
          <div className="allow-comments">
            <div className="slideThree">
              <input
                type="checkbox"
                id="allow_comments"
                name="allow_comments"
                defaultChecked
                onChange={({ target }) =>
                  target.checked ? setAllow_comments(1) : setAllow_comments(0)
                }
              />
              <label htmlFor="allow_comments"></label>
              <span className="label">Allow Comments</span>
            </div>
          </div>
          {invalid && invalid}
          <Button primary>POST</Button>
        </form>
      )}
    </main>
  );
}

export default MakePost;
