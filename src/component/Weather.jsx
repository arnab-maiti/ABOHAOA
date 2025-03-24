import axios from 'axios';
import React, { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null); // State to store 5-day forecast

  const fetchApi = async () => {
    try {
      // Fetch current weather
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${`bcb58512da9fa67778af87090be9f4f6`}&units=metric`);
      setWeather(res.data);
      console.log(res);
      
      // Fetch 5-day forecast
      const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${`bcb58512da9fa67778af87090be9f4f6`}&units=metric`);
      setForecast(forecastRes.data);
      console.log(forecastRes);
    } catch (error) {
      alert("Error fetching weather data");
    }
  };

  const handleApi = () => {
    fetchApi();
  };

  return (
    <div className='weather'>
      <input
        type="text"
        className='input'
        placeholder='Enter city name'
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <br />
      <button className='button' onClick={handleApi}>View</button>
      
      {/* Current Weather Display */}
      {weather && (
        <div>
          <div className='data'>
            <h3>{weather.name}</h3>
            <div className='im'>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <p className='temp'>{weather.main.temp}°C</p>
            </div>
            <p className='at'>{weather.weather[0].description}</p>
          </div>
          <div className='hum'>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}

      {/* 5-Day Forecast Display */}
{forecast && (
  <div className='forecast'>
    <h3>5-Day Forecast</h3>
    <div className='forecast-list'>
      {forecast.list
        .filter((day) => {
          const hours = new Date(day.dt * 1000).getHours();
          return hours >= 12 && hours <= 15; // Select forecasts between 12 PM - 3 PM
        })
        .slice(0, 5) // Get 5 days
        .map((day, index) => {
          const date = new Date(day.dt * 1000); // Convert timestamp to date
          const temp = day.main.temp.toFixed(1); // Get temperature
          const description = day.weather[0].description; // Weather condition
          const icon = day.weather[0].icon; // Weather icon
          const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time as HH:MM AM/PM

          return (
            <div key={index} className='forecast-item'>
              <p>{date.toDateString()}</p> {/* Show Date */}
              <p>{timeString}</p> {/* Show Time */}
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="weather icon"
              />
              <p>{temp}°C</p>
              <p>{description}</p>
            </div>
          );
        })}
    </div>
  </div>
)}

    </div>
  );
};

export default Weather;
