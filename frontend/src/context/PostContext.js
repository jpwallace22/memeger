import { createContext, useState } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [sortBy, setSortBy] = useState("p.date");
  const [search, setSearch] = useState(null);

  //GLOBAL STATE AND FUNCTIONS FOR ALL POSTS
  const postState = {
    date,
    sortBy,
    search,
    setDate,
    setSortBy,
    setSearch,
    getPosts,
    getSinglePost,
    registerNewUser,
    getSearchResults,
  };

  //---------FUNCTIONS------------//

  /**
   * FETCHES ALL POSTS FROM API BASED ON DATE CONFIG
   * @param date string "YYYY-MM-DD" -- start date of the search
   * @param limit integer (default 20) -- Amount of posts fetched
   * @param offset integer (default 0) -- Where in the list it starts
   * @param order string (default 'p.date') -- Order by date or votes
   * @returns - JSON data
   */
  async function getPosts(
    date,
    limit = 20,
    offset = 0,
    order = "p.date",
    search = null
  ) {
    try {
      const response = await fetch(
        `/api/posts/date.php?date=${date}&limit=${limit}&offset=${offset}&order=${order}&search=${search}`
      );
      const posts = await response.json();
      return posts;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * FETCHES A SINGLE POST FROM THE API
   * @param id int  -- post_id of post requesting
   * @returns - JSON data
   */
  async function getSinglePost(id) {
    try {
      const response = await fetch(`/api/posts/post.php?post_id=${id}`);
      const post = await response.json();
      return post;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * FETCHES A SINGLE POST FROM THE API
   * @param id int  -- post_id of post requesting
   * @returns - JSON data
   */
  async function getSearchResults(string) {
    try {
      const response = await fetch(`/api/posts/search.php?search=${string}`);
      const posts = await response.json();
      return posts;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * POST REQUEST TO API TO REGISTER NEW USER
   * @param {string} username -- username from user input
   * @param {string} email -- email from user input
   * @param {string} password -- pw from user input
   * @returns JSON data either {success}, {error}, or [{errors} for failed validation]
   */
  async function registerNewUser(username, email, password) {
    try {
      const res = await fetch(
        `/api/users/register.php?username=${username}&email=${email}&password=${password}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/ charset=UTF-8",
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  return (
    <PostContext.Provider value={postState}>{children}</PostContext.Provider>
  );
};

export default PostContext;
