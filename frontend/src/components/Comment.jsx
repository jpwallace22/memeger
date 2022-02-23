import { Link } from "react-router-dom";
import "../styles/comment.css";

function Comment({ comment }) {
  return (
    <>
      <hr />
      <div className="comment">
        <div className="commenter-info">
          <div className="commenter">
            <Link to={`/profile/${comment.username}`}>
              {" "}
              <img
                className="commenter-pic"
                src={comment.profile_pic}
                alt={comment.username}
              />
            </Link>
            <Link to={`/profile/${comment.username}`}>
              <span className="commenter-name cap">{comment.username}</span>
            </Link>
            •
          </div>
          <span className="comment-time"> {timeAgo(comment.date)}</span>
        </div>
        <p className="body-info">{comment.body}</p>
      </div>
    </>
  );
}

export default Comment;

/**
 * RETURNS HOW LONG AGO SINCE THE DATE IN A NICE STRING
 * ## https://coolaj86.com/articles/time-ago-in-under-50-lines-of-javascript/
 * (updated to add configuration from any date format)
 * @param {string} date
 * @returns string [how long ago since date]
 */
function timeAgo(date) {
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
    return part === 1 ? part + " day ago" : part + " days ago";
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
}
