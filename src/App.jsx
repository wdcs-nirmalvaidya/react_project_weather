import Header from "./components/Header";
import Home from "./pages/Home";
import Forecast from "./pages/Forecast";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const [searchFn, setSearchFn] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = (mode) => {
    setTheme(mode);
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
  };

  return (
    <>
      <Header
        onSearch={(city) => searchFn && searchFn(city)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <Routes>
        <Route
          path="/"
          element={<Home registerSearchFn={(fn) => setSearchFn(() => fn)} />}
        />
        <Route path="/forecast/:city" element={<Forecast />} />
      </Routes>
    </>
  );
}
