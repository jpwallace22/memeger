import React, { useState, useContext, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import Navbar from "../components/Navbar";
import "../styles/profile.css";
import Button from "../components/Button";
import { FaEdit } from "react-icons/fa";

function Profile() {
  //global state
  const { user } = useContext(UserContext);

  //local state
  const [formUsername, setFormUsername] = useState(`${user.username}`);
  const [bio, setBio] = useState(`${user.bio}`);
  const [editName, setEditName] = useState(false);
  const [editBio, setEditBio] = useState(false);

  //hooks
  const { username } = useParams();

  //close all edit fields
  const handleCancel = (e) => {
    e.preventDefault();
    setEditBio(false);
    setEditName(false);
  };

  //returns bool to check if current page belongs to logged user
  const isOwnPage = user.username === username;

  return (
    <>
      <Navbar />
      <main className="profile">
        <div className="p-info">
          <img src={user.profile_pic} alt={user.username} />
          <form>
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
                <p className="bio">{user.bio} </p>
                {isOwnPage && (
                  <span className="edit" onClick={() => setEditBio(true)}>
                    <FaEdit />
                  </span>
                )}
              </div>
            )}

            <div className="stats">
              <span>Wins: 0</span>
              <span>Posts: 0</span>
              <span>Favorites: 0</span>
            </div>

            {(editName || editBio) && (
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
      </main>
    </>
  );
}

export default Profile;
