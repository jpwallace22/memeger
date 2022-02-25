import React, { useContext } from "react";
import "../styles/searchBar.css";
import PostContext from "../context/PostContext";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  const { search, setSearch } = useContext(PostContext);

  const handleChange = (value) => {
    setSearch(value);
  };

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          name="search-bar"
          id="search-bar"
          className="search-input"
          onChange={({ target }) => handleChange(target.value)}
          value={search}
          placeholder="Title, Description, or Username"
        />
      </div>
    </div>
  );
}

export default SearchBar;
