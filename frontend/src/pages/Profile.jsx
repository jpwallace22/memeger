import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import Navbar from "../components/Navbar";
import "../styles/profile.css";
import Button from "../components/Button";
import { FaEdit } from "react-icons/fa";
import PostItem from "../components/PostItem";

function Profile() {
  //global state
  const {
    user: loggedUser,
    getProfileInfo,
    setUser: setLoggedUser,
  } = useContext(UserContext);

  //local state
  const [user, setUser] = useState({});
  const [formUsername, setFormUsername] = useState(`${loggedUser.username}`);
  const [bio, setBio] = useState(`${loggedUser.bio}`);
  const [editName, setEditName] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [src, setSrc] = useState(`${loggedUser.profile_pic}`);
  const [error, setError] = useState("");

  //hooks
  const { username } = useParams();
  const upload = useRef();
  const navigate = useNavigate();

  //close all edit fields
  const handleCancel = (e) => {
    e.preventDefault();
    setEditBio(false);
    setEditName(false);
    setEditImage(false);
    setSrc(`${loggedUser.profile_pic}`);
  };

  const handleImageUpload = async ({ target }) => {
    const data = new FormData();
    data.append("uploadedfile", target.files[0]);
    data.append("user_id", user.user_id);
    const res = await fetch("/api/users/upload-image.php", {
      method: "POST",
      body: data,
    });
    const src = await res.json();
    if (!src.error) {
      setSrc(src);
      setEditImage(true);
    } else {
      setError(src.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user_id: loggedUser.user_id,
      username: formUsername,
      bio: bio,
      profile_pic: src,
    };
    const res = await fetch("/api/users/update.php", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data === "success") {
      const newLoggedUser = {
        ...loggedUser,
        ...payload,
      };
      setLoggedUser(newLoggedUser);
      localStorage.setItem("loggedUser", JSON.stringify(newLoggedUser));
      navigate(`/profile/${payload.username}`);
      setEditBio(false);
      setEditName(false);
      setEditImage(false);
      setSrc(`${payload.profile_pic}`);
    }
    //TODO SET ERRORS TO DISPLAY FOR BIO AND USERNAME
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getProfileInfo({ username });
      setUser(data);
    }
    fetchData();
  }, [getProfileInfo, username]);

  //returns bool to check if current page belongs to logged user
  const isOwnPage = loggedUser.username === username;

  return (
    <>
      <Navbar />
      <main className="profile">
        <div className="p-info">
          <div className="error">{error && error}</div>
          <div className="img">
            <img
              className={isOwnPage ? "is-own" : ""}
              src={isOwnPage && src ? src : user.profile_pic}
              alt={isOwnPage ? loggedUser.username : user.username}
              onClick={isOwnPage ? () => upload.current.click() : null}
            />
            <span>
              <FaEdit />
            </span>
          </div>

          <form onSubmit={(e) => handleSubmit(e)}>
            {editName ? (
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="edit-username cap"
                  value={formUsername}
                  onChange={({ target }) => setFormUsername(target.value)}
                  autoFocus
                />
              </div>
            ) : (
              <div>
                <h2 className="profile-username cap">{user.username} </h2>
                {isOwnPage && (
                  <span className="edit" onClick={() => setEditName(true)}>
                    <FaEdit />
                  </span>
                )}
              </div>
            )}

            {editBio ? (
              <div>
                <label htmlFor="bio" className="sr-only">
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  cols="30"
                  rows="10"
                  className="edit-bio"
                  value={bio}
                  onChange={({ target }) => setBio(target.value)}
                  autoFocus
                ></textarea>
              </div>
            ) : (
              <div>
                <p className="bio">
                  {!user.bio && isOwnPage
                    ? "Write a little bio. Tell the world about yourself and why you're rad."
                    : user.bio}{" "}
                </p>
                {isOwnPage && (
                  <span className="edit" onClick={() => setEditBio(true)}>
                    <FaEdit />
                  </span>
                )}
              </div>
            )}

            <div className="stats">
              <span>Wins: {user.win_count}</span>
              <span>Posts: {user.posts && user.posts.length}</span>
              <span>Favorites: {user.fav_count}</span>
            </div>

            {(editName || editBio || editImage) && (
              <div className="profile-buttons">
                <Button primary className="save">
                  Save Changes
                </Button>
                <h3 className="cancel" onClick={(e) => handleCancel(e)}>
                  Cancel
                </h3>
              </div>
            )}
          </form>
        </div>

        <div className="user-posts">
          <h2 className="cap">
            {isOwnPage ? "Your Posts" : `${user.username}'s Posts`}
          </h2>
          {user.posts ? (
            user.posts.map((post, index) => (
              <PostItem post={post} key={index} />
            ))
          ) : (
            <h2>You haven't made any posts yet</h2>
          )}
        </div>
        <input
          ref={upload}
          type="file"
          name="user-image"
          id="user-image"
          className="image"
          onChange={(e) => handleImageUpload(e)}
          accept="image/png, image/jpeg"
          encType="multipart/form-data"
        />
      </main>
    </>
  );
}

export default Profile;
