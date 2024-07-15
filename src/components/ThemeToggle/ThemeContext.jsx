import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

const DARK = "dark";
const LIGHT = "light";
const THEME = "theme";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(LIGHT);

  useEffect(() => {
    const savedTheme = localStorage.getItem(theme) || LIGHT;
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === LIGHT ? DARK : LIGHT;
    setTheme(newTheme);
    localStorage.setItem(THEME, newTheme);
    document.body.className = newTheme;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
