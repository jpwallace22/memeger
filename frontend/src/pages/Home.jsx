import React from "react";
import { useEffect, useState } from "react";
import { getPosts } from "../assets/functions/postFunctions";
import PostItem from "../components/PostItem";
import Navbar from "../components/Navbar";
import SortDropdown from "../components/SortDropdown";
import DayDropdown from "../components/DayDropdown";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("p.date");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    //fetch posts for today
    async function getTodaysPosts() {
      const posts = await getPosts(date);
      setPosts(posts);
      setIsLoading(false);
    }
    getTodaysPosts();
  }, [date]);

  /**
   * Takes the data from the dropdown, fetches new posts
   * and updates the posts state, and sorting states
   * @param {string} sortDate - 0000-00-00 00:00:00 - default is current date state
   * @param {string} order - either 'votes' or 'p.date' - default is current sortBy state
   */
  const handleSort = async (sortDate = date, order = sortBy) => {
    setIsLoading(true);
    if (order === "date") {
      order = "p.date";
    }
    console.log(order);
    const posts = await getPosts(sortDate, 20, 0, order);
    setPosts(posts);
    setSortBy(order);
    setDate(date);
    setIsLoading(false);
  };

  //todo add loading widget
  return (
    <>
      <Navbar />
      <div className="homepage-ui">
        <SortDropdown handleSort={handleSort} />
        <DayDropdown handleSort={handleSort} />
      </div>
      <div className="post-list">
        {isLoading ? (
          "loading..."
        ) : posts.error ? (
          <h2>{posts.error}</h2>
        ) : (
          posts.map((post, index) => <PostItem post={post} key={index} />)
        )}
      </div>
    </>
  );
}

export default Home;
