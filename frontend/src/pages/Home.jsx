import React from "react";
import { useEffect, useState, useContext } from "react";
import PostContext from "../context/PostContext";
import PostItem from "../components/PostItem";
import Navbar from "../components/Navbar";
import SortDropdown from "../components/SortDropdown";
import DayDropdown from "../components/DayDropdown";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";

function Home() {
  //Post state
  const { date, sortBy, getPosts, posts, setPosts } = useContext(PostContext);

  //Component State
  const [isLoading, setIsLoading] = useState(true);

  async function getTodaysPosts() {
    setIsLoading(true);
    const posts = await getPosts(date, undefined, undefined, sortBy);
    setPosts(posts);
    setIsLoading(false);
  }

  useEffect(() => {
    //fetch posts for today

    getTodaysPosts();
    //will automatically rerun if the date or sortby options are changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, sortBy]);

  return (
    <>
      <Navbar />
      <main>
        <div className="homepage-ui">
          <SearchBar setPosts={setPosts} />
          <SortDropdown />
          <DayDropdown />
        </div>
        <div className="post-list">
          {isLoading ? (
            <div className="no-posts">
              <Loader />
            </div>
          ) : posts.error ? (
            <div className="no-posts">
              <h2>{posts.error}</h2>
              <p>Why not get the ball rolling? Be the first!</p>
            </div>
          ) : (
            posts.map((post, index) => (
              <PostItem post={post} key={index} setPosts={setPosts} />
            ))
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
