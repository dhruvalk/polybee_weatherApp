import { useEffect, useState } from "react";
import "./App.css";
import WeatherCard from "./WeatherCard";

function App() {
  const numGrids = 9;
  let emptyArr = [];
  for (var x = 0; x < numGrids; x++) {
    emptyArr.push({});
  }

  const [cityData, setCityData] = useState(emptyArr);

  const clearList = () => {
    localStorage.removeItem("data");
    setCityData(emptyArr);
    alert("All cities cleared!");
  };

  useEffect(() => {
    const initialValue = localStorage.getItem("data");
    if (initialValue) setCityData(JSON.parse(initialValue));
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
