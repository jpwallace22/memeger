import React from "react";
import "./navbar.css";
import { GoDiffAdded } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { ReactComponent as Logo } from "../assets/images/logo.svg";

function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <div className="add-post">
          <GoDiffAdded />
        </div>
        <Logo className="header-logo" />
        <div className="user-button">
          <FaUser />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
