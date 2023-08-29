import React, { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState([]);
  const [searched, setSearched] = useState(false);
  const apiKey = "7922c653a48000e12af69ed0f9a586d4";

  const handleCitySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      setWeather([response.data]);
      setSearched(true); // Update the searched state
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  useEffect(() => {
    setWeather(weather); // Log the updated weather state
  }, [weather]);
  return (
    <div className="home">
      <div className="container">
        <div className="location">
          <form onSubmit={handleCitySubmit}>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="Enter Location"
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        {searched && weather.length > 0 ? (
          weather.map((we) => (
            <div className="data-container" key={we.id}>
              <span className="city">{we.name}</span>
              <h1 className="degree">{(we.main.temp - 273.15).toFixed()}</h1>
              <i className="fa-solid fa-wind icon"></i>
              <h1 className="f">C</h1>
              <h4 className="about-weather">{we.weather[0].main}</h4>
            </div>
          ))
        ) : (
          <div className="data-container">
            <span className="city">city</span>
            <h1 className="degree">30</h1>
            <i className="fa-solid fa-wind icon"></i>
            <h1 className="f">F</h1>
            <h4 className="about-weather">clear</h4>
          </div>
        )}
        {searched && weather.length > 0 ? (
          weather.map((w) => (
            <div className="bottom" key={w.id}>
              <h1 className="degree-b">{(w.main.temp - 273.15).toFixed()}</h1>
              <i class="fa-solid fa-wind icon-b"></i>
              <h1 className="f-b">C</h1>
              <h1 className="humidity">{w.main.humidity}% H</h1>
              <h1>{w.wind.speed}MPH</h1>
            </div>
          ))
        ) : (
          <div className="bottom">
            <h1 className="degree-b">30</h1>
            <i class="fa-solid fa-wind icon-b"></i>
            <h1 className="f-b">C</h1>
            <h1 className="humidity">72%</h1>
            <h1>2MPH</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
