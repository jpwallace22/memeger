import React, { useState } from "react";
import "./dropdown.css";
import { BsCaretRightFill } from "react-icons/bs";

function SortDropdown({ handleSort }) {
  const [todayActive, setTodayActive] = useState(true);
  const [weekActive, setWeekActive] = useState(false);
  const [monthActive, setMonthActive] = useState(false);
  const [allTimeActive, setAllTimeActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  //sets all states to false
  const allStateFalse = () => {
    setTodayActive(false);
    setWeekActive(false);
    setMonthActive(false);
    setAllTimeActive(false);
  };

  //gets the date in ISO and offsets for past days
  const getDate = (offset = 0) => {
    return new Date(new Date().setDate(new Date().getDate() - offset))
      .toISOString()
      .split("T")[0];
  };
  /**
   * Fetches and sorts data based on target
   * [also closes the dropdown menu and sets the title based on target]
   * @param {node} target current element being clicked
   */
  const handleClick = (target) => {
    let data = target.dataset.value;
    switch (data) {
      case "today":
        allStateFalse();
        setTodayActive(true);
        data = getDate();
        break;
      case "week":
        allStateFalse();
        setWeekActive(true);
        data = getDate(7);
        break;
      case "month":
        allStateFalse();
        setMonthActive(true);
        data = getDate(30);
        break;
      case "allTime":
        allStateFalse();
        setAllTimeActive(true);
        data = "0000-00-00 00:00:00";
        break;
      default:
        break;
    }
    setMenuOpen(false);
    handleSort(data, undefined);
  };

  // toggles the dropdown menu open or closed
  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className={
        menuOpen ? "dropdown day-dropdown active" : "dropdown day-dropdown"
      }
    >
      <div className="dropdown-title" onClick={handleMenu}>
        <span>
          {/* makes the title whatever element is currently selected */}
          {document.querySelector(".dropdown-option.active") &&
            document.querySelector(".dropdown-option.active").innerHTML}
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
            className={
              todayActive ? "dropdown-option active" : "dropdown-option"
            }
            data-value="today"
            onClick={({ target }) => handleClick(target)}
          >
            Today
          </li>
          <li
            className={
              weekActive ? "dropdown-option active" : "dropdown-option"
            }
            data-value="week"
            onClick={({ target }) => handleClick(target)}
          >
            Last Week
          </li>
          <li
            className={
              monthActive ? "dropdown-option active" : "dropdown-option"
            }
            data-value="month"
            onClick={({ target }) => handleClick(target)}
          >
            Last Month
          </li>
          <li
            className={
              allTimeActive ? "dropdown-option active" : "dropdown-option"
            }
            data-value="allTime"
            onClick={({ target }) => handleClick(target)}
          >
            All Time
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SortDropdown;
