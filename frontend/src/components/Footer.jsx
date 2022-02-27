import React from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
  FaPinterestSquare,
} from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="links">
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/about">About</Link>
        </div>
        <ul className="social">
          <li>
            <a href="/">
              <FaFacebookSquare />
            </a>
          </li>
          <li>
            <a href="/">
              <FaTwitterSquare />
            </a>
          </li>
          <li>
            <a href="/">
              <FaInstagramSquare />
            </a>
          </li>
          <li>
            <a href="/">
              <FaPinterestSquare />
            </a>
          </li>
        </ul>
        <p>
          <small>
            All rights reserved ©{new Date().toISOString().split("-")[0]}
          </small>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
