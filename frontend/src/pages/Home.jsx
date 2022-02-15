import React from "react";
import { useEffect, useState } from "react";
import { getPosts } from "../assets/functions/postFunctions";
import PostItem from "../components/PostItem";
import Navbar from "../components/Navbar";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //get todays date in UTC
    const date = new Date().toISOString().split("T")[0];
    //fetch posts for today
    async function getTodaysPosts() {
      const posts = await getPosts(date);
      setPosts(posts);
      setIsLoading(false);
    }
    getTodaysPosts();
  }, []);

  //todo add loading widget
  return (
    <>
      <Navbar />
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
