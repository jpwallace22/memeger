import React from "react";
import "../styles/about.css";
import Navbar from "../components/Navbar";

function About() {
  return (
    <main className="about">
      <Navbar />
      <h1>About Memeger</h1>
      <div className="container">
        <h2>Meme Sharing, but better.</h2>
        <p>
          Here at Memeger we love a good meme and we love a little bit of
          competition as well.. So we thought to ourself "Why not mix the two?"
          <strong>
            {" "}
            Just like that, the once a day meme battle was born!
          </strong>{" "}
        </p>
        <h3>Memes are for the masses</h3>
        <p>
          Not <em>EVERYONE</em> likes to make memes. However, if you're here,
          you probably like to view them. Whats great about a bunch of nerds
          trying to make the best memes on the internet is the fresh awesome
          content everyone else gets from it!
        </p>
        <h3>Getting Technical</h3>
        <p>
          <strong>
            Memeger is a React-based single page application frontend that
            consumes a RESTful PHP API on the backend that queries an SQL
            database.
          </strong>{" "}
        </p>
        <p>
          Routing is achieved via React Router V6 and styling is done through
          css modules imported per component. The only other dependency other
          than React Router is React Icons for all iconography.
        </p>{" "}
        <p>
          Future plans are to refactor the backend to NodeJS with express
          connected to a MongoDB NoSQL database.
        </p>
        <p>Memeger was created as a project at Platt College San Diego.</p>
      </div>
      <img
        src="/frontend/src/assets/images/logo-dev.png"
        alt="Justin Wallace development logo"
        className="dev-logo"
      />
      <p className="plug">
        <small>Designed and Developed by Justin Wallace Development</small>
      </p>
    </main>
  );
}

export default About;
