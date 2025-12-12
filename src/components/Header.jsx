import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Header({ onSearch, theme, toggleTheme }) {
  const [city, setCity] = useState("");
  const location = useLocation(); 

  return (
    <header className="main-header">
      <div className="header-left">
        <span className="logo">🌤️</span>
        <span className="logo-text">SkyCast</span>
      </div>

      <nav className="header-right">

        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/forecast/delhi"
          className={location.pathname.includes("/forecast") ? "active" : ""}
        >
          Forecast
        </Link>

        <div className="searchbox">
          <span className="search-icon">🔍</span>

          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button onClick={() => onSearch(city)}>Go</button>
        </div>

        <div
          className="theme-switch"
          onClick={() => toggleTheme(theme === "light" ? "dark" : "light")}
        >
          <div className={`switch-circle ${theme}`}></div>
        </div>
      </nav>
    </header>
  );
}
