import { createContext, useState } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [sortBy, setSortBy] = useState("p.date");

  const state = {
    date,
    sortBy,
  };

  return (
    <PostContext.Provider
      value={{
        state,
        setDate,
        setSortBy,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
