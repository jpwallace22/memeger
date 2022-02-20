import React, { useState } from "react";
import "../styles/loader.css";

function Loader() {
  const [tooLong, setTooLong] = useState(false);
  const [thing, setThing] = useState(false);

  setTimeout(() => {
    setTooLong(true);
  }, 6000);

  setTimeout(() => {
    setThing(true);
  }, 26000);

  return thing ? (
    <div>
      <h2>Well I be damned, you are VERY patient </h2>{" "}
      <p>
        Thanks for hanging in there. Send me a a screenshot of this message for
        your prize!
      </p>
    </div>
  ) : tooLong ? (
    <>
      <h2>Hmm.. This isn't right</h2>
      <p>Looks like something might be wrong. Try again later!</p>
    </>
  ) : (
    <div className="loader">Loading...</div>
  );
}

export default Loader;
