import React, { useContext, useEffect, useState, useRef } from "react";
import "../styles/navbar.css";
import UserContext from "../context/UserContext";
import { GoDiffAdded } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import Button from "./Button";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, setUser } = useContext(UserContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const userButton = useRef();

  const handleClickOutside = (e) => {
    if (userButton.current && !userButton.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    //if no user info in state and there is in session storage, load user info into state.
    if (!user.user_id && sessionStorage.getItem("loggedUser") != null) {
      setUser(JSON.parse(sessionStorage.getItem("loggedUser")));
    }

    if (!menuOpen) {
      return;
    }
    //close nav menu if clicked off of it
    window.addEventListener("click", (e) => handleClickOutside(e), true);

    return () =>
      window.removeEventListener("click", (e) => handleClickOutside(e), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen]);

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
        {/* <Link to="/login"> */}
        <div
          className="user-button"
          onClick={() => setMenuOpen(!menuOpen)}
          ref={userButton}
        >
          {user.profile_pic ? (
            <>
              <span className="no-mobile mr-1 cap username">
                {user.username}{" "}
              </span>{" "}
              <img src={user.profile_pic} alt={user.username} />
              <ul
                className={
                  menuOpen ? "dropdown-menu menu-open" : "dropdown-menu"
                }
              >
                <svg
                  width="24"
                  height="8"
                  viewBox="0 0 24 8"
                  className="dropdown-triangle"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>icon</title>
                  <path
                    fill="var(--darkest-grey)"
                    d="M10.3359 1.1094C11.3436 0.437601 12.6564 0.437601 13.6641 1.1094L24 8L3.05823e-09 8L10.3359 1.1094Z"
                  ></path>
                </svg>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <span>Logout</span>
                </li>
              </ul>
            </>
          ) : (
            <FaUser size={24} />
          )}
        </div>
        {/* </Link> */}
      </nav>
    </header>
  );
}

export default Navbar;
