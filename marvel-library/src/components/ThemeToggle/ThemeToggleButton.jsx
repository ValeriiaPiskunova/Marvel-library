import React from "react";
import { useTheme } from "./ThemeContext";
import "./ThemeToggleButton.css";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle__button theme-toggle__button--${theme}`}
    >
      {theme === "light"
        ? "Switch to Dark Theme"
        : "Switch to Light Theme"}
    </button>
  );
};

export default ThemeToggleButton;
