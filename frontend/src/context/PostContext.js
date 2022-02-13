import { createContext, useReducer } from "react";
import postReducer, { initialState } from "./postReducer";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const value = {
    posts: state.posts,
    loading: state.loading,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
