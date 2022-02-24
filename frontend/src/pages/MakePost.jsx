import React, { useState, useContext } from "react";
import "../styles/loginPage.css";
import "../styles/makePost.css";
import PostContext from "../context/PostContext";
import UserContext from "../context/UserContext";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { ImEye, ImEyeBlocked, ImGift } from "react-icons/im";
import FileInput, { UploadArea } from "@idui/react-file-input";

function MakePost() {
  //global state
  const { registerNewUser } = useContext(PostContext);
  const { user } = useContext(UserContext);

  //form state
  const [errors, setErrors] = useState({});
  const [src, setSrc] = useState();

  //hooks
  const navigate = useNavigate();

  //on form submit, send data to register user API, redirect if success.
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleChange = async ({ target }) => {
    const data = new FormData();
    data.append("uploadedfile", target.files[0]);
    data.append("user_id", user.user_id);

    console.log(target.files[0]);
    const res = await fetch("/api/posts/upload-image.php", {
      method: "POST",
      body: data,
    });
    console.log(res);
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
      <form className="card" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="user-title"
          id="user-title"
          className="title"
        />
        <input
          type="file"
          name="user-image"
          id="user-image"
          className="image"
          onChange={(e) => handleChange(e)}
          accept="image/png, image/jpeg"
          enctype="multipart/form-data"
        />
        {src && <img src={src} alt="" />}
        <textarea
          name="body"
          id="user-body"
          cols="30"
          rows="5"
          className="body"
        ></textarea>
        <div className="allow-comments">
          <label htmlFor="allow-comments">Allow Comments</label>
          <input
            type="checkbox"
            name="allow-comments"
            id="allow-comments"
            className="allow-comments"
            defaultChecked
          />
        </div>
      </form>
    </main>
  );
}

export default MakePost;
