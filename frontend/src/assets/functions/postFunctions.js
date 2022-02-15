/**
 * Fetches all posts from API based on time (can also do pagination)
 *
 * @param date string "YYYY-MM-DD" -- start date of the search
 * @param limit integer (default 20) -- Amount of posts fetched
 * @param offset integer (default 0) -- Where in the list it starts
 * @returns - JSON data
 */
export const getPosts = async (date, limit = 20, offset = 0) => {
  const response = await fetch(
    `/api/posts/date.php?date=${date}&limit=${limit}&offset=${offset}`
  );
  const posts = await response.json();
  return posts;
};

/**
 * Fetches a single post from API
 *
 * @param id int  -- post_id of post requesting
 * @returns - JSON data
 */
export const getSinglePost = async (id) => {
  const response = await fetch(`/api/posts/post.php?post_id=${id}`);
  const post = await response.json();
  return post;
};
