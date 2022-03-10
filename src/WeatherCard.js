import React from "react";

export default function WeatherCard({ data, id, setData }) {
  const addToList = () => {
    setData((prev) => {
      prev[id].name = "Tokyo";
      localStorage.setItem("data", JSON.stringify(prev));
      const newArr = [...prev];
      return newArr;
    });
  };

  return (
    <div className="card">
      {data[id].name}
      {id}
      <button onClick={addToList}>test</button>
    </div>
  );
}
