import axios from 'axios';
import React, { useState } from 'react'

const Weather = () => {
  const[city,setcity]=useState("")
  const[weather,setweather]=useState(null)
  
  const fetchapi= async ()=>{
    try {
      
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${`bcb58512da9fa67778af87090be9f4f6`}&units=metric`)
       setweather(res.data);
       console.log(res)
      
    } 
    catch (error) {
      alert("error")
    }
  }
  const handleapi =()=>{
    fetchapi();
  }
  return (
    <div className='weather'>
       <input type="text" className='input' placeholder='Enter city name' value={city} onChange={(e)=>setcity(e.target.value)}/>
            <br />
            <button className='button' onClick={handleapi}>View</button>
            {weather && (
            <div>
        <div className='data'>
          <h3>{weather.name}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p className='temp'>{weather.main.temp}°C</p>
          <p className='at'>{weather.weather[0].description}</p>
          </div>
          <div className='hum'>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Weather