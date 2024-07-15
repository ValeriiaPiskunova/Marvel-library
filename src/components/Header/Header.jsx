import React from "react";
import ThemeToggleButton from "../ThemeToggle/ThemeToggleButton";
import "./Header.css";

const Header = ({}) => {
  return (
    <header className="header">
      <h1 className="header__title">MARVEL CHARACTERS LIST</h1>
      <ThemeToggleButton />
    </header>
  );
};

export default Header;
