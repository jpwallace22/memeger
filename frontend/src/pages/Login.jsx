import React, { useState, useContext } from "react";
import "../styles/loginPage.css";
import UserContext from "../context/UserContext";
import Button from "../components/Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { ImEye, ImEyeBlocked } from "react-icons/im";

function Login() {
  //global state
  const { userLogin, setUser } = useContext(UserContext);

  //local state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [errors, setErrors] = useState({});

  //hooks
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  //if register param is in url,  show success message from registering
  const register = searchParams.get("register");

  //handle login form submission and update state with errors or user info
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await userLogin({ username, password });
    data.errors && setErrors(data.errors);
    if (data.user_id) {
      setUser(data);
      localStorage.setItem("loggedUser", JSON.stringify(data));
      navigate("/");
    }
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
        <span className="error">{errors.incorrect && errors.incorrect}</span>
        <label htmlFor="username" className="sr-only">
          Username
        </label>
        <span className="error">{errors.username && errors.username}</span>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          placeholder="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <span className="error">{errors.password && errors.password}</span>
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
