import React, { useState, useContext, useEffect } from "react";
import "../styles/loginPage.css";
import "../styles/register.css";
import PostContext from "../context/PostContext";
import UserContext from "../context/UserContext";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { ImEye, ImEyeBlocked } from "react-icons/im";

function Register() {
  //global state
  const { registerNewUser } = useContext(PostContext);
  const { user } = useContext(UserContext);

  //form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [errors, setErrors] = useState({});

  //hooks
  const navigate = useNavigate();

  //on form submit, send data to register user API, redirect if success.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerNewUser(username, email, password);
    if (data.errors) {
      setErrors(data.errors);
    }
    if (data.success) {
      navigate("/login?register=1");
    }
  };

  useEffect(() => {
    user.user_id && navigate("/");
  }, []);

  //TODO add front end validation to ease the server

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
        <div className="error">{errors.username && errors.username}</div>
        <input
          className={errors.username && "input-error"}
          type="text"
          name="username"
          id="username"
          value={username}
          placeholder="PythonMan22"
          onChange={({ target }) => setUsername(target.value)}
        />
        <label htmlFor="password">Password</label>
        <div className="error">{errors.password && errors.password}</div>
        <div className="password">
          <input
            className={errors.password && "input-error"}
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
        <div className="error">{errors.email && errors.email}</div>
        <input
          className={errors.email && "input-error"}
          type="text"
          name="email"
          id="email"
          value={email}
          placeholder="iheartpython@gmail.com"
          onChange={({ target }) => setEmail(target.value)}
        />
        <div className="login-ui">
          <Button
            secondary
            className="login-button"
            disabled={!username || !password || !email}
          >
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
