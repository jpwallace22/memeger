import React from "react";
import { useEffect, useState } from "react";
import { getPosts } from "../assets/functions/postFunctions";
import PostItem from "../components/PostItem";
import Navbar from "../components/Navbar";
import Dropdown from "../components/Dropdown";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //get todays date in UTC
  const date = new Date().toISOString().split("T")[0];

  useEffect(() => {
    //fetch posts for today
    async function getTodaysPosts() {
      const posts = await getPosts(date);
      setPosts(posts);
      setIsLoading(false);
      console.log("fresh posts");
    }
    getTodaysPosts();
  }, [date]);

  const handleSort = async (order) => {
    setIsLoading(true);
    const posts = await getPosts(date, 20, 0, order);
    setPosts(posts);
    setIsLoading(false);
  };

  const sortOptions = ["Newest Posts", "Highest Votes"];

  //todo add loading widget
  return (
    <>
      <Navbar />
      <div className="container">
        <Dropdown options={sortOptions} handleSort={handleSort} />
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
