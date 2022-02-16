import React from "react";
import "./dropdown.css";

function Dropdown({ handleSort }) {
  const voteClick = () => {
    handleSort("p.votes");
  };
  return (
    <div className="dropdown">
      <div className="dropdown-title">
        <span>
          {document.querySelector(".dropdown-option.is-active") &&
            document.querySelector(".dropdown-option.is-active").innerHTML}
        </span>
      </div>
      <div className="dropdown-menu">
        <svg
          width="24"
          height="8"
          viewBox="0 0 24 8"
          className="Dropdown-triangle"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>icon</title>
          <path
            fill="var(--darkest-grey)"
            d="M10.3359 1.1094C11.3436 0.437601 12.6564 0.437601 13.6641 1.1094L24 8L3.05823e-09 8L10.3359 1.1094Z"
          ></path>
        </svg>
        <div className="dropdown-list">
          <div className="dropdown-option" onClick={voteClick}>
            Most Votes
          </div>
          <div className="dropdown-option is-active">Newest Posts</div>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
