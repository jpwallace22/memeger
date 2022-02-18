import React from "react";
import "../styles/navbar.css";
import { GoDiffAdded } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import Button from "./Button";
import { Link } from "react-router-dom";

function Navbar() {
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
            <FaUser size={24} />
          </div>
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
