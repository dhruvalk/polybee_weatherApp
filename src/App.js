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
  };

  useEffect(() => {
    const initialValue = localStorage.getItem("data");
    if (initialValue) setCityData(JSON.parse(initialValue));
  }, []);

  return (
    <div>
      <div className="mainContainer">
        {cityData.map((entry, index) => (
          <WeatherCard data={cityData} id={index} setData={setCityData} />
        ))}
      </div>
      <button onClick={clearList}>Clear list</button>
    </div>
  );
}

export default App;
