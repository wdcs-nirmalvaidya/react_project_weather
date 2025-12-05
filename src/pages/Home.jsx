import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";
import useLocalStorage from "../hooks/useLocalStorage";
import { getWeather } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [data, setData] = useLocalStorage("current_weather", null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [history, setHistory] = useLocalStorage("history", []);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  useEffect(() => {
    function safeLoad(key, setter) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return;

        const parsed = JSON.parse(raw);
        if (parsed !== undefined && parsed !== null) {
          setter(parsed);
        }
      } catch {
        
        localStorage.removeItem(key);
      }
    }

    safeLoad("current_weather", setData);
    safeLoad("history", setHistory);
    safeLoad("favorites", setFavorites);
  }, []);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError("");

      const weather = await getWeather(city);

      const newData = {
        city,
        temp: weather.temp,
        feels_like: weather.feels_like,
        humidity: weather.humidity,
        min_temp: weather.min_temp,
        max_temp: weather.max_temp,
        wind: weather.wind_speed,
        cloud: weather.cloud_pct,
        aqi: Math.floor(Math.random() * 100),
      };

      setData(newData);
      localStorage.setItem("current_weather", JSON.stringify(newData));

      const updatedHistory = [
        { city, time: new Date().toLocaleString() },
        ...history.filter((i) => i.city !== city),
      ].slice(0, 5);

      setHistory(updatedHistory);
      localStorage.setItem("history", JSON.stringify(updatedHistory));

    } catch (err) {
      setError("Could not fetch weather for this city");
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (city) => {
    const updated = favorites.includes(city) ? favorites : [...favorites, city];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const removeFavorite = (city) => {
    const updated = favorites.filter((c) => c !== city);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="home-container">

      {/* SEARCH + FAVORITES */}
      <div className="top-section">

        {/* SEARCH BAR */}
        <div className="search-box-wrapper">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* FAVORITES */}
        <div className="favorites-box glass-card">
          <h3>⭐ Favorites</h3>

          {favorites.length === 0 ? (
            <p>No favorites yet</p>
          ) : (
            favorites.map((city, idx) => (
              <div className="favorite-item" key={idx}>
                <span>{city}</span>

                <div className="fav-buttons">
                  <button className="btn btn-sm" onClick={() => handleSearch(city)}>
                    Load
                  </button>

                  <button
                    className="btn btn-sm remove"
                    onClick={() => removeFavorite(city)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* RECENT + WEATHER CARD GRID */}
      <div className="middle-grid">

        {/* RECENT SEARCHES */}
        <div className="recent-box glass-card">
          <h3>Recent Searches</h3>

          {history.length === 0 ? (
            <p>No recent searches</p>
          ) : (
            history.map((item, idx) => (
              <div className="history-item" key={idx}>
                <span>{item.city} — {item.time}</span>
                <button className="btn btn-sm" onClick={() => handleSearch(item.city)}>
                  Load
                </button>
              </div>
            ))
          )}
        </div>

        {/* WEATHER CARD */}
        {data && (
          <Card title={data.city} className="weather-card glass-card">
            <p>
              <span className="icon">🌡️</span>
              <b>Temperature:</b> {data.temp}°C
            </p>
            <p>
              <span className="icon">🥵</span>
              <b>Feels Like:</b> {data.feels_like}°C
            </p>
            <p>
              <span className="icon">💧</span>
              <b>Humidity:</b> {data.humidity}%
            </p>
            <p>
              <span className="icon">🌬️</span>
              <b>Wind Speed:</b> {data.wind} km/h
            </p>
            <p>
              <span className="icon">☁️</span>
              <b>Cloud Coverage:</b> {data.cloud}%
            </p>
            <p>
              <span className="icon">🫁</span>
              <b>AQI:</b> {data.aqi}
            </p>

            <div className="weather-buttons">
              <button className="btn btn-sm" onClick={() => addToFavorites(data.city)}>
                ★ Add to Favorites
              </button>

              <button
                className="btn btn-sm"
                onClick={() => navigate(`/forecast/${data.city}`)}
              >
                📈 View Forecast
              </button>
            </div>
          </Card>
        )}

      </div>

      {loading && <Loader />}
      {error && <ErrorBox message={error} />}

    </div>
  );
}
