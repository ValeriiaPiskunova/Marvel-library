import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import CharacterList from "./components/CharacterList/CharacterList";
import CharacterDetail from "./components/CharacterDetail/CharacterDetail";
import Header from "./components/Header/Header";
import { ThemeProvider } from "./components/ThemeToggle/ThemeContext";
import Loader from "./components/Loader/Loader";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <React.Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/Marvel-library"
              element={<CharacterList />}
            />
            <Route
              path="/Marvel-library/character/:id"
              element={<CharacterDetail />}
            />
          </Routes>
        </React.Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
