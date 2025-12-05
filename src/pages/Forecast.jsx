import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tabs from "../components/Tabs";
import ChartWrapper from "../components/ChartWrapper";
import { getForecast } from "../services/api";

export default function Forecast() {
  const { city } = useParams();

  const [forecastData, setForecastData] = useState([]);
  const [activeTab, setActiveTab] = useState("today");


  useEffect(() => {
    async function load() {
      try {
        const data = await getForecast(city);

        const formatted = data.map((entry) => ({
          time: entry.timestamp * 1000, // 
          label: new Date(entry.timestamp * 1000).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          temp: entry.temp,
          wind: entry.wind_speed,
        }));

        setForecastData(formatted);
        localStorage.setItem("forecast_data", JSON.stringify(formatted));

      } catch (err) {
        console.error("Forecast load error:", err);


        try {
          const saved = localStorage.getItem("forecast_data");
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) setForecastData(parsed);
          }
        } catch {
          localStorage.removeItem("forecast_data");
        }
      }
    }

    load();
  }, [city]);

  function buildDailyCards(hourly) {
    const days = {};

    hourly.forEach((item) => {
      const d = new Date(item.time);
      const key = d.toISOString().split("T")[0]; 

      if (!days[key]) days[key] = { temps: [], winds: [] };

      days[key].temps.push(item.temp);
      days[key].winds.push(item.wind);
    });

    return Object.keys(days).map((date) => {
      const temps = days[date].temps;
      const winds = days[date].winds;

      return {
        date: new Date(date),
        max: Math.max(...temps),
        min: Math.min(...temps),
        wind: Math.round(
          winds.reduce((a, b) => a + b, 0) / winds.length
        ),
        rain: (Math.random() * 2).toFixed(1), 
      };
    });
  }


  function getWeatherIcon(day) {
    if (day.rain > 1) return "🌧️";     
    if (day.max >= 30) return "☀️";     
    if (day.wind > 5) return "🌬️";      
    return "⛅";                          
  }

  const todayData = forecastData.slice(0, 8);      
  const tomorrowData = forecastData.slice(8, 16);  
  const weekCards = buildDailyCards(forecastData);

  const tabData = {
    today: todayData,
    tomorrow: tomorrowData,
  };

  return (
    <div>
      <h2>Forecast for {city}</h2>

      <Tabs
        active={activeTab}
        onChange={setActiveTab}
        tabs={["today", "tomorrow", "week"]}
      />

      {/* TODAY + TOMORROW */}
      {activeTab !== "week" && (
        <>
          <ChartWrapper
            title="Temperature (°C)"
            data={tabData[activeTab]}
            dataKey="temp"
          />

          <ChartWrapper
            title="Wind Speed (km/h)"
            data={tabData[activeTab]}
            dataKey="wind"
          />
        </>
      )}

      {/* WEEK VIEW */}
      {activeTab === "week" && (
        <div className="week-grid">
          {weekCards.map((d, idx) => (
            <div key={idx} className="week-card">
              <div className="weather-icon">{getWeatherIcon(d)}</div>

              <h4>
                {d.date.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </h4>

              <p className="max">Max: {d.max.toFixed(1)}°C</p>
              <p className="min">Min: {d.min.toFixed(1)}°C</p>
              <p className="wind">Wind: {d.wind} km/h</p>
              <p className="rain">Rain: {d.rain} mm</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
