import React, { useState } from "react";

export default function WeatherCard({ data, id, setData }) {
  const cityName = data[id].name;
  const [text, setText] = useState(cityName);
  const [edit, setEdit] = useState(false);

  const addToList = () => {
    setEdit(false);
    setData((prev) => {
      prev[id].name = text;
      localStorage.setItem("data", JSON.stringify(prev));
      const newArr = [...prev];
      return newArr;
    });
  };

  return (
    <div className="weatherCard">
      {edit ? "Enter a city:" : cityName ? cityName : "No City Selected!"}
      {edit && (
        <input
          type={"text"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoComplete={"No"}
        />
      )}
      {edit ? (
        <button onClick={addToList} style={{ backgroundColor: "green" }}>
          Enter
        </button>
      ) : (
        <button
          onClick={() => setEdit(true)}
          style={{ backgroundColor: "red" }}
        >
          Edit
        </button>
      )}
    </div>
  );
}
