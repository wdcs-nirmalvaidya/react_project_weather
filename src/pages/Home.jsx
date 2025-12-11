import { useState, useEffect } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";
import useLocalStorage from "../hooks/useLocalStorage";
import { getWeather } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Home({ registerSearchFn }) {
  const [data, setData] = useLocalStorage("current_weather", null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [history, setHistory] = useLocalStorage("history", []);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const capitalize = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  useEffect(() => {
    registerSearchFn?.(handleSearch);
  }, []);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem("current_weather");
      if (savedData) setData(JSON.parse(savedData));

      const savedHistory = localStorage.getItem("history");
      if (savedHistory) setHistory(JSON.parse(savedHistory));

      const savedFav = localStorage.getItem("favorites");
      if (savedFav) setFavorites(JSON.parse(savedFav));
    } catch {}
  }, []);

  const handleSearch = async (city) => {
    if (!city?.trim()) {
      setError("Enter a valid city name");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formattedCity = capitalize(city);
      const weather = await getWeather(formattedCity);

      const newData = {
        city: formattedCity,
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
        { city: formattedCity, time: new Date().toLocaleString() },
        ...history.filter((i) => i.city !== formattedCity),
      ].slice(0, 5);

      setHistory(updatedHistory);
      localStorage.setItem("history", JSON.stringify(updatedHistory));
    } catch {
      setError("Could not fetch weather for this city");
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (city) => {
    if (!favorites.includes(city)) {
      const updated = [...favorites, city];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  const removeFavorite = (city) => {
    const updated = favorites.filter((c) => c !== city);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="page-container">
      <div className="top-row">
        <div className="favorites-box section">
          <h3>⭐ Favorites</h3>
          {favorites.length === 0 ? (
            <p>No favorites yet</p>
          ) : (
            favorites.map((city, idx) => (
              <div className="favorite-item" key={idx}>
                <span>{city}</span>
                <div className="fav-buttons">
                  <button className="btn btn-sm" onClick={() => handleSearch(city)}>View</button>
                  <button className="btn btn-sm remove" onClick={() => removeFavorite(city)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="recent-box section">
          <h3>Recent Searches</h3>
          {history.length === 0 ? (
            <p>No recent searches</p>
          ) : (
            history.map((item, idx) => (
              <div className="history-item" key={idx}>
                <span>{item.city} — {item.time}</span>
                <button className="btn btn-sm" onClick={() => handleSearch(item.city)}>View</button>
              </div>
            ))
          )}
        </div>
      </div>

      {data && (
        <div className="weather-section section">
          <div className="wc-container">

  
            <div className="wc-left">
              <h2 className="wc-city">{capitalize(data.city)}</h2>

              <h1 className="wc-temp">{data.temp}°</h1>
              <p className="wc-condition">Sunny / Mild</p>
              <p className="wc-feel">RealFeel® {data.feels_like}°</p>

              <div className="wc-stats">
                <div className="wc-stat"><span>🌬️</span> {data.wind} km/h</div>
                <div className="wc-stat"><span>💧</span> {data.humidity}%</div>
                <div className="wc-stat"><span>🫁</span> AQI {data.aqi}</div>
              </div>

              <div className="wc-buttons">
                <button
                  className="btn btn-sm wc-btn-blue"
                  onClick={() => addToFavorites(data.city)}
                >
                  ★ Add to Favorites
                </button>

                <button
                  className="btn btn-sm wc-btn-forecast"
                  onClick={() => navigate(`/forecast/${data.city}`)}
                >
                  📈 View Forecast
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="wc-right">
              <div className="wc-big-icon">🌤️</div>
            </div>

          </div>
        </div>
      )}

      {loading && <Loader />}
      {error && <ErrorBox message={error} />}
    </div>
  );
}
