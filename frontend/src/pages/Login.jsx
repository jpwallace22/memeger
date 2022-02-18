import React, { useState } from "react";
import "../styles/loginPage.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { ImEye, ImEyeBlocked } from "react-icons/im";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername("asdf");
  };

  return (
    <div className="login">
      <div className="back">
        <HiOutlineArrowNarrowLeft onClick={() => navigate(-1)} />
        {/* Goes back to last page */}
      </div>
      <div className="logo">
        <Logo />
      </div>
      <form className="card" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <div className="password">
          <input
            type={seePassword ? "text" : "password"}
            name="password"
            id="password"
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
        <Button secondary className="login-button">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
