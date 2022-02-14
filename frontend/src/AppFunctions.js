/**
 * Fetches posts from API
 *
 * @param date string "YYYY-MM-DD" -- start date of the search
 * @param limit integer (default 20) -- Amount of posts fetched
 * @param offset integer (default 0) -- Where in the list it starts
 *
 * @returns - JSON data
 */
export const getPosts = async (date, limit = 20, offset = 0) => {
  const response = await fetch(
    `/api/posts/date.php?date=${date}&limit=${limit}&offset=${offset}`
  );
  const posts = await response.json();
  return posts;
};
