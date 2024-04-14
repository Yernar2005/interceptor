import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const cities = "1526384,524901,1526273"; // Almaty, Moscow, Astana
  const myAPI = "2d736ba9f127f57586b8890b934a839b";
  const src = `https://api.openweathermap.org/data/2.5/group?id=${cities}&units=metric`;

  const [weatherList, setWeatherList] = useState([]);

  //Set up interceptor, adding API
  useEffect(() => {
    const weatherInterceptor = axios.interceptors.request.use(function (
      config
    ) {
      config.params = config.params || {};
      config.params.appid = myAPI; // checking
      return config;
    });
  }, [myAPI]);
  //extracting data from website
  useEffect(() => {
    axios.get(src).then((response) => {
      setWeatherList(response.data.list);
    });
  }, [src]);
  return (
    <div className="App">
      {weatherList.map((weather, index) => (
        <div key={index}>
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};