import { useEffect, useState } from "react";
import "./App.css";
import { getPosts } from "./AppFunctions";
import PostItem from "./components/PostItem";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //get todays date in UTC
    const date = new Date().toISOString().split("T")[0];
    //fetch posts for today
    async function getTodaysPosts() {
      const posts = await getPosts(date);
      setPosts(posts);
    }
    getTodaysPosts();
  }, []);

  return (
    <div>
      <PostItem post={posts[0]} />
    </div>
  );
}

export default App;
