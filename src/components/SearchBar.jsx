import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city.trim());
    setCity("");
  };

  return (
    <form className="search-box glass-card fade-in" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="🔍 Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button type="submit" className="btn primary-btn">
        Search
      </button>
    </form>
  );
}
