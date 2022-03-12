import React, { useState } from "react";
import sunnyBg from "./assets/sunny_bg.jpg";
import cloudyBg from "./assets/cloudy_bg.jpg";
import rainyBg from "./assets/rainy_bg.jpg";
import clearBg from "./assets/clear_bg.jpg";
import smokeBg from "./assets/smoke_bg.jpg";

export default function WeatherCard({ data, id, setData }) {
  //add entered city to local storage, claled when user enters a new city
  const addToList = async () => {
    const response = await getWeather(text);
    let cityWeather = "";
    let temp = "";
    if (response) {
      [cityWeather, temp] = response;
    }
    await setEdit(false);
    await setData((prev) => {
      prev[id].name = cityWeather === "Invalid" ? "Invalid City!" : text;
      prev[id].weather = cityWeather;
      prev[id].temp = temp;
      localStorage.setItem("data", JSON.stringify(prev));
      const newArr = [...prev];
      return newArr;
    });
    await setText("");
  };

  //get background image depending on the weather in city
  const getBackground = (data) => {
    if (!data.name) return null;
    switch (data.weather) {
      case "Clouds":
        return cloudyBg;
      case "Clear":
        return clearBg;
      case "Sunny":
        return sunnyBg;
      case "Rain":
        return rainyBg;
      case "Smoke":
        return smokeBg;
      default:
        return "white";
    }
  };

  const cityName = data[id].name;
  const cityWeather = data[id].weather;
  const temp = data[id].temp;
  const bgImage = getBackground(data[id]);

  const [text, setText] = useState(cityName); //city input by the user
  const [edit, setEdit] = useState(false); //state to control is user is editing city

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
          onKeyDown={(e) => {
            if (e.key === "Enter") addToList();
          }}
        />
      )}
      {cityWeather && cityWeather !== "Invalid" && !edit && (
        <div>
          <div className="weatherStatus">
            <img src={require("./assets/cloud.png")} alt="weather" width={20} />
            {cityWeather}
          </div>
        </div>
      )}
      {temp && temp !== "Invalid" && !edit && (
        <div className="weatherTemp">{temp} ºC</div>
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

//API call to get current weather status at city
export const getWeather = async (city) => {
  if (!city) return;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPEN_WEATHERMAP_API_KEY}&units=metric`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    if (result.weather) return [result.weather[0].main, result.main.temp];
    else return ["Invalid", "Invalid"];
  } catch (error) {
    console.error(error);
    return "";
  }
};
