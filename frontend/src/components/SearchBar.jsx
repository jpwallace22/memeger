import React, { useContext, useState } from "react";
import "../styles/searchBar.css";
import PostContext from "../context/PostContext";
import { FaSearch } from "react-icons/fa";
import Button from "./Button";

function SearchBar({ setPosts }) {
  const { getSearchResults } = useContext(PostContext);

  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const asyncSearch = async () => {
      const posts = await getSearchResults(search);
      setPosts(posts);
      !posts.error && setSearch("");
    };
    asyncSearch();
  };

  return (
    <div className="search-bar-wrapper">
      <form className="search-bar" onSubmit={(e) => handleSubmit(e)}>
        <FaSearch className="search-icon" />
        <input
          type="text"
          name="search-bar"
          id="search-bar"
          className="search-input"
          onChange={({ target }) => setSearch(target.value)}
          value={search}
          placeholder="Title, Description, or Username"
        />
        <Button secondary className="search-button">
          Search
        </Button>
      </form>
    </div>
  );
}

export default SearchBar;
