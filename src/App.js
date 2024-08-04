import { useState } from "react";
import React from "react";
import axios from "axios";
import "./index.css";

function App() {

  
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const apikey = "6e6f0f2740dcb5512195ca6e4465b4da";

  const geocode_url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&units=imperial&appid=${apikey}`;

  const searchLocation = (event) => {
    if (event.key  === "Enter") {
      let lat;
      let lon;
      console.log(geocode_url);
      axios.get(geocode_url).then((response) => {
        setState(response.data[0].state);
        console.log(response.data);
        lat = response.data[0].lat;
        lon = response.data[0].lon;
        let weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apikey}`;

        axios.get(weather_url).then((response) => {
          setWeather(response.data);
          console.log("WEATHER")
          console.log(response.data);
        });
      });
      setLocation("");
    }
  }
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="enter location"
          type="text"/>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{weather.name}, {state}</p>
          </div>
          <div className="temp">
            {weather.main ? <h1>{weather.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {weather.weather ? <p>{weather.weather[0].main}</p> : null}
          </div>
        </div>

        {weather.main != undefined && 
        <div className="bottom">
          <div className="feels">

            {weather.main ? <p className="bold">{weather.main.feels_like.toFixed()}°F</p> : null}
            <p>Feels Like</p>

          </div>
          <div className="humidity">
            {weather.main ? <p className="bold">{weather.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {weather.wind ? <p className="bold">{weather.wind.speed.toFixed()} MPH</p> : null}
            <p>Wind</p>
           </div>
        </div>
        
        }
      </div>
    </div>

  );
}

export default App;
