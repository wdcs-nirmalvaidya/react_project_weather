import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header({ onSearch }) {
  const [city, setCity] = useState("");

  return (
    <header className="main-header">
<div className="left">
      {/* LEFT - LOGO */}
      <div className="header-left">
        <span className="logo">🌤️</span>
        <span className="logo-text">SkyCast</span>
      </div>
 </div>
      {/* CENTER - NAVIGATION */}
      <div className="right">
      <nav className="header-center">
        <Link to="/">Home</Link>
        <Link to="/forecast/delhi">Forecast</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>

      {/* RIGHT - SEARCH BAR */}
      <div className="header-right">
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
      </div>
</div>
    </header>
  );
}
