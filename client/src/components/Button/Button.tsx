import React from "react";
import styles from "./Button.module.styl";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = "" }) => {
  return (
    <div className={`${className} ${styles.button}`.trim()}>{children}</div>
  );
};

export default Button;
