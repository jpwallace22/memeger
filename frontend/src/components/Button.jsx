import React from "react";
import "../styles/button.css";

function Button({ children, primary, secondary, className, disabled }) {
  return (
    <button
      className={`btn ${primary ? "primary" : secondary ? "secondary" : ""} ${
        className ? className : ""
      }`}
      disabled={disabled ? true : false}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  primary: false,
  secondary: false,
  disabled: false,
};

export default Button;
