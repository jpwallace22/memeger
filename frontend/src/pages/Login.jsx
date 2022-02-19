import React, { useState } from "react";
import "../styles/loginPage.css";
import Button from "../components/Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { ImEye, ImEyeBlocked } from "react-icons/im";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const register = searchParams.get("register");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername("asdf");
  };

  return (
    <main className="login">
      <div className="back">
        <HiOutlineArrowNarrowLeft onClick={() => navigate(-1)} />
        {/* Goes back to last page */}
      </div>
      <div className="logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      {register && (
        <div>
          <h1 className="gold">Success!</h1>
          <h2>You can log in now.</h2>
        </div>
      )}

      <form className="card" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username" className="sr-only">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          placeholder="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <div className="password">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            type={seePassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          {seePassword ? (
            <ImEyeBlocked onClick={() => setSeePassword(false)} />
          ) : (
            <ImEye onClick={() => setSeePassword(true)} />
          )}
          <Button primary className="forget">
            Forget?
          </Button>
        </div>
        <div className="login-ui">
          <Button secondary className="login-button">
            Login
          </Button>
          <Link to="/register" className="register-question">
            Dont have an account?
          </Link>
        </div>
      </form>
    </main>
  );
}

export default Login;
