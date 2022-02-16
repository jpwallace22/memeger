import React, { useState } from "react";
import "./sortDropdown.css";

function SortDropdown({ handleSort }) {
  const [voteActive, setVoteActive] = useState(false);
  const [newestActive, setNewestActive] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * Fetches and sorts data based on target
   * [also closes the dropdown menu and sets the title based on click]
   * @param {node} target current element being clicked
   */
  const handleClick = (target) => {
    const data = target.dataset.value;
    if (data === "vote") {
      setNewestActive(false);
      setVoteActive(true);
    }
    if (data === "date") {
      setNewestActive(true);
      setVoteActive(false);
    }
    setMenuOpen(false);
    handleSort(`p.${data}`);
  };

  // toggles the dropdown menu open or closed
  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-title" onClick={handleMenu}>
        <span>
          {/* makes the title whatever element is currently selected */}
          {document.querySelector(".dropdown-option.is-active") &&
            document.querySelector(".dropdown-option.is-active").innerHTML}
        </span>
      </div>
      <div className={menuOpen ? "dropdown-menu menu-open" : "dropdown-menu"}>
        {/* <svg> is the little triangle on top of box */}
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
          <div
            className={
              voteActive ? "dropdown-option is-active" : "dropdown-option"
            }
            data-value="votes"
            onClick={({ target }) => handleClick(target)}
          >
            Most Votes
          </div>
          <div
            className={
              newestActive ? "dropdown-option is-active" : "dropdown-option"
            }
            data-value="date"
            onClick={({ target }) => handleClick(target)}
          >
            Newest Posts
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortDropdown;
