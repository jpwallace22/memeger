import React from "react";
import { useEffect, useState, useContext } from "react";
import PostContext from "../context/PostContext";
import PostItem from "../components/PostItem";
import Navbar from "../components/Navbar";
import SortDropdown from "../components/SortDropdown";
import DayDropdown from "../components/DayDropdown";

function Home() {
  //Post state
  const { date, sortBy, getPosts } = useContext(PostContext);

  //Component State
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //fetch posts for today
    async function getTodaysPosts() {
      setIsLoading(true);
      const posts = await getPosts(date, undefined, undefined, sortBy);
      setPosts(posts);
      setIsLoading(false);
    }
    getTodaysPosts();
    //will automatically rerun if the date or sortby options are changed
  }, [date, sortBy, getPosts]);

  /**
   * Takes the data from the dropdown and updates the sorting states
   * @param {string} sortDate - 0000-00-00 00:00:00 - default is current date state
   * @param {string} order - either 'votes' or 'p.date' - default is current sortBy state
   */
  const handleSort = async (sortDate = date, order = sortBy) => {
    // setDate(sortDate);
  };

  //todo add loading widget
  return (
    <>
      <Navbar />
      <main>
        <div className="homepage-ui">
          <SortDropdown />
          <DayDropdown handleSort={handleSort} />
        </div>
        <div className="post-list">
          {isLoading ? (
            "loading..."
          ) : posts.error ? (
            <div className="no-posts">
              <h2>{posts.error}</h2>
              <p>Why not get the ball rolling? Be the first!</p>
            </div>
          ) : (
            posts.map((post, index) => <PostItem post={post} key={index} />)
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
