import React, { useState, useContext, useEffect, useRef } from "react";
import PostContext from "../context/PostContext";
import "../styles/dropdown.css";
import { BsCaretRightFill } from "react-icons/bs";

function SortDropdown({ handleSort }) {
  //global state
  const { sortBy, setSortBy } = useContext(PostContext);

  //local state
  const [menuOpen, setMenuOpen] = useState(false);

  //hooks
  const ref = useRef();

  //closes menu if clicked outside of it
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  /**
   * Fetches and sorts data based on target
   * [also closes the dropdown menu and sets the title based on target]
   * @param {node} target current element being clicked
   */
  const handleClick = (target) => {
    let data = target.dataset.value;
    setMenuOpen(false);
    setSortBy(data);
  };

  useEffect(() => {
    //if the menu is open user clicks outside of it, close the menu
    if (!menuOpen) {
      return;
    }
    window.addEventListener("click", (e) => handleClickOutside(e), true);

    //cleanup
    return () =>
      window.removeEventListener("click", (e) => handleClickOutside(e), true);
  }, [menuOpen]);

  return (
    <div
      ref={ref}
      className={
        menuOpen ? "dropdown sort-dropdown active" : "dropdown sort-dropdown"
      }
    >
      <div className="dropdown-title" onClick={() => setMenuOpen(!menuOpen)}>
        <span>
          {sortBy === "votes" ? "Most Votes" : "Newest Posts"}
          <BsCaretRightFill size={15} className="dropdown-caret" />
        </span>
      </div>
      <div className={menuOpen ? "dropdown-menu menu-open" : "dropdown-menu"}>
        {/* <svg> is the little triangle on top of box */}
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
        <ul className="dropdown-list">
          <li
            className="dropdown-option"
            data-value="votes"
            onClick={({ target }) => handleClick(target)}
          >
            Most Votes
          </li>
          <li
            className="dropdown-option"
            data-value="p.date"
            onClick={({ target }) => handleClick(target)}
          >
            Newest Posts
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SortDropdown;
