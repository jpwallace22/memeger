import React, { useState } from "react";
import "../styles/loginPage.css";
import "../styles/register.css";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { ImEye, ImEyeBlocked } from "react-icons/im";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [seePassword, setSeePassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername("asdf");
  };

  return (
    <main className="login register">
      <div className="back">
        <HiOutlineArrowNarrowLeft onClick={() => navigate(-1)} />
        {/* Goes back to last page */}
      </div>
      <div className="logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <form className="card" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          placeholder="PythonMan22"
          onChange={({ target }) => setUsername(target.value)}
        />
        <label htmlFor="password">Password</label>
        <div className="password">
          <input
            type={seePassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="More than 7 characters"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          {seePassword ? (
            <ImEyeBlocked onClick={() => setSeePassword(false)} />
          ) : (
            <ImEye onClick={() => setSeePassword(true)} />
          )}
        </div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          placeholder="iheartpython@gmail.com"
          onChange={({ target }) => setEmail(target.value)}
        />
        <div className="login-ui">
          <Button secondary className="login-button">
            Register
          </Button>
          <Link to="/login" className="register-question">
            Have an account?
          </Link>
        </div>
      </form>
    </main>
  );
}

export default Register;
