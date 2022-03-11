import React, { useState } from "react";
import sunnyBg from "./assets/sunny_bg.jpg";
import cloudyBg from "./assets/cloudy_bg.jpg";
import rainyBg from "./assets/rainy_bg.jpg";
import clearBg from "./assets/clear_bg.jpg";
import smokeBg from "./assets/smoke_bg.jpg";

export default function WeatherCard({ data, id, setData }) {
  const getWeather = async (city) => {
    if (!city) return;
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPEN_WEATHERMAP_API_KEY}`,
        {
          method: "GET",
        }
      );
      const result = await response.json();
      if (result.weather) return result.weather[0].main;
      else return "Invalid";
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  const addToList = async () => {
    const cityWeather = await getWeather(text);
    await setEdit(false);
    await setData((prev) => {
      prev[id].name = cityWeather === "Invalid" ? "Invalid City!" : text;
      prev[id].weather = cityWeather;
      localStorage.setItem("data", JSON.stringify(prev));
      const newArr = [...prev];
      return newArr;
    });
  };

  const getBackground = (data) => {
    if (!data.name) return null;
    switch (data.weather) {
      case "Clouds":
        return cloudyBg;
      case "Clear":
        return clearBg;
      case "Sunny":
        return sunnyBg;
      case "Rainy":
        return rainyBg;
      case "Smoke":
        return smokeBg;
      default:
        return "white";
    }
  };

  const cityName = data[id].name;
  const cityWeather = data[id].weather;
  const bgImage = getBackground(data[id]);

  const [text, setText] = useState(cityName);
  const [edit, setEdit] = useState(false);

  return (
    <div className="weatherCard" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="cityName">
        {edit ? "Enter a city:" : cityName ? cityName : "No City Selected!"}
      </div>
      {edit && (
        <input
          type={"text"}
          value={text || ""}
          onChange={(e) => setText(e.target.value)}
          autoComplete={"No"}
        />
      )}
      {cityWeather && cityWeather != "Invalid" && !edit && (
        <div className="weatherStatus">
          <img src={require("./assets/cloud.png")} width={20} />
          {cityWeather}
        </div>
      )}
      {edit ? (
        <button onClick={addToList} style={{ backgroundColor: "green" }}>
          ENTER
        </button>
      ) : (
        <button
          onClick={() => setEdit(true)}
          style={{ backgroundColor: "red" }}
        >
          EDIT
        </button>
      )}
    </div>
  );
}
