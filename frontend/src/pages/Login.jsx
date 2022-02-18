import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login">
      <div className="back">
        <HiOutlineArrowNarrowLeft onClick={() => navigate(-1)} />{" "}
        {/* Goes back to last page */}
      </div>
    </div>
  );
}

export default Login;
