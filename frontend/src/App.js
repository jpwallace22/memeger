import { useEffect, useState } from "react";
import "./App.css";
import { getPosts } from "./AppFunctions";
import PostItem from "./components/PostItem";

function App() {
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

  return (
    <div>
      {isLoading ? (
        "loading..."
      ) : posts.error ? (
        <h2>{posts.error}</h2>
      ) : (
        posts.map((post, index) => <PostItem post={post} key={index} />)
      )}
    </div>
  );
}

export default App;
