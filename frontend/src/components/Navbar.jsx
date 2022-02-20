import React, { useContext, useEffect } from "react";
import "../styles/navbar.css";
import UserContext from "../context/UserContext";
import { GoDiffAdded } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import Button from "./Button";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user.user_id && sessionStorage.getItem("loggedUser") != null) {
      setUser(JSON.parse(sessionStorage.getItem("loggedUser")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header>
      <nav className="navbar">
        <Button primary>
          <GoDiffAdded size={24} />
          <span className="no-mobile">Post</span>
        </Button>
        <Link to="/" className="header-logo">
          <Logo />
        </Link>
        <Link to="/login">
          <div className="user-button">
            {user.profile_pic ? (
              <img src={user.profile_pic} alt={user.username} />
            ) : (
              <FaUser size={24} />
            )}
          </div>
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
