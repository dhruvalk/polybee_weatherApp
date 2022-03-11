import { useEffect, useState } from "react";
import "./App.css";
import WeatherCard, { getWeather } from "./WeatherCard";

function App() {
  const numGrids = 9; //number of total grids to display by default
  let emptyArr = [];
  for (var x = 0; x < numGrids; x++) {
    emptyArr.push({});
  }

  const [cityData, setCityData] = useState(emptyArr);

  //clear local storage
  const clearList = () => {
    localStorage.removeItem("data");
    setCityData(emptyArr);
    alert("All cities cleared!");
  };

  //pull local storage info on first render
  useEffect(() => {
    const initialValue = localStorage.getItem("data");
    if (initialValue) setCityData(JSON.parse(initialValue));
  }, []);

  //get local storage data and update weather through API call
  const updateWeather = async () => {
    const initialValue = localStorage.getItem("data");
    if (initialValue) {
      var data = JSON.parse(initialValue);
      for (const entry of data) {
        if (entry.name) {
          const newWeather = await getWeather(entry.name);
          if (entry.weather !== newWeather) {
            console.log("updating weather!");
          }
          entry.weather = newWeather;
        }
      }
      setCityData(data);
      localStorage.setItem("data", JSON.stringify(data));
    }
  };

  //update weather of entered cities every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      await updateWeather();
      console.log("30s interval done!");
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <header>
        <img
          src={require("./assets/polybee_logo_white.png")}
          width={200}
          alt="logo"
        />
        <h1>Weather Forecast</h1>
        <button onClick={clearList}>CLEAR CITIES</button>
      </header>
      <div className="mainContainer">
        {cityData.map((entry, index) => (
          <WeatherCard
            data={cityData}
            id={index}
            setData={setCityData}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
