/**
 * FETCHES ALL POSTS FROM API BASED ON DATE CONFIG
 * @param date string "YYYY-MM-DD" -- start date of the search
 * @param limit integer (default 20) -- Amount of posts fetched
 * @param offset integer (default 0) -- Where in the list it starts
 * @param order string (default 'p.date') -- Order by date or votes
 * @returns - JSON data
 */
export const getPosts = async (
  date,
  limit = 20,
  offset = 0,
  order = "p.date"
) => {
  try {
    const response = await fetch(
      `/api/posts/date.php?date=${date}&limit=${limit}&offset=${offset}&order=${order}`
    );
    const posts = await response.json();
    return posts;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * FETCHES A SINGLE POST FROM THE API
 * @param id int  -- post_id of post requesting
 * @returns - JSON data
 */
export const getSinglePost = async (id) => {
  try {
    const response = await fetch(`/api/posts/post.php?post_id=${id}`);
    const post = await response.json();
    return post;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * POST REQUEST TO API TO REGISTER NEW USER
 * @param {string} username -- username from user input
 * @param {string} email -- email from user input
 * @param {string} password -- pw from user input
 * @returns JSON data either {success}, {error}, or [{errors} for failed validation]
 */
export const registerNewUser = async (username, email, password) => {
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
};

/**
 * RETURNS HOW LONG AGO SINCE THE DATE IN A NICE STRING
 * ## https://coolaj86.com/articles/time-ago-in-under-50-lines-of-javascript/
 * (updated to add configuration from any date format)
 * @param {string} date
 * @returns string [how long ago since date]
 */
export const timeAgo = (date) => {
  const newDate = new Date(date).getTime();
  const currentDate = new Date().getTime();

  let ms = currentDate - newDate;
  let ago = Math.floor(ms / 1000);
  let part = 0;

  if (ago < 2) {
    return "a moment ago";
  }
  if (ago < 5) {
    return "moments ago";
  }
  if (ago < 60) {
    return ago + " seconds ago";
  }

  if (ago < 120) {
    return "a minute ago";
  }
  if (ago < 3600) {
    while (ago >= 60) {
      ago -= 60;
      part += 1;
    }
    return part + " minutes ago";
  }

  if (ago < 7200) {
    return "an hour ago";
  }
  if (ago < 86400) {
    while (ago >= 3600) {
      ago -= 3600;
      part += 1;
    }
    return part + " hours ago";
  }

  if (ago < 172800) {
    return "a day ago";
  }
  if (ago < 604800) {
    while (ago >= 172800) {
      ago -= 172800;
      part += 1;
    }
    return part + " days ago";
  }

  if (ago < 1209600) {
    return "a week ago";
  }
  if (ago < 2592000) {
    while (ago >= 604800) {
      ago -= 604800;
      part += 1;
    }
    return part + " weeks ago";
  }

  if (ago < 5184000) {
    return "a month ago";
  }
  if (ago < 31536000) {
    while (ago >= 2592000) {
      ago -= 2592000;
      part += 1;
    }
    return part + " months ago";
  }

  if (ago < 1419120000) {
    // 45 years, approximately the epoch
    return "more than year ago";
  }
};
