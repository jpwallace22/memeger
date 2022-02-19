import { createContext, useState } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [sortBy, setSortBy] = useState("p.date");

  //global state and functions for posts
  const posts = {
    date,
    sortBy,
    setDate,
    setSortBy,
  };

  return <PostContext.Provider value={posts}>{children}</PostContext.Provider>;
};

export default PostContext;
