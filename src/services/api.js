import axios from "axios";

const API_KEY = "oZYaPiL8zHOJ4W+IwP3CWA==TfswRPrtGkVUyiJI";

function roundCoord(num) {
  return parseFloat(Number(num).toFixed(2));
}


export async function getWeather(city) {
  try {
    const geo = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    if (!geo.data.results?.length) throw new Error("City not found");


    const latitude = roundCoord(geo.data.results[0].latitude);
    const longitude = roundCoord(geo.data.results[0].longitude);

    const url = `https://api.api-ninjas.com/v1/weather?lat=${latitude}&lon=${longitude}`;

    const res = await axios.get(url, {
      headers: { "X-Api-Key": API_KEY }
    });

    return { city, latitude, longitude, ...res.data };

  } catch (err) {
    console.error("Weather API Error:", err);
    throw err;
  }
}


export async function getForecast(city) {
  try {
    const geo = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    if (!geo.data.results?.length) throw new Error("City not found");

    const latitude = roundCoord(geo.data.results[0].latitude);
    const longitude = roundCoord(geo.data.results[0].longitude);

    const url = `https://api.api-ninjas.com/v1/weatherforecast?lat=${latitude}&lon=${longitude}`;

    const res = await axios.get(url, {
      headers: { "X-Api-Key": API_KEY }
    });

    return res.data;

  } catch (err) {
    console.error("Forecast API Error:", err);
    throw err;
  }
}

export function getDummyAQI(city) {
  return { aqi: Math.floor(city.length * 10 + Math.random() * 40) };
}
