import React from "react";
import "../styles/button.css";

function Button({ children, primary, secondary, className }) {
  return (
    <button
      className={`btn ${primary ? "primary" : secondary ? "secondary" : ""} ${
        className ? className : ""
      }`}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  primary: false,
  secondary: false,
};

export default Button;
