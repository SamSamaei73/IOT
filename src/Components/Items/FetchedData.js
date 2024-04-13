import React, { useState, useEffect } from "react";

function FetchedData() {
  const [data, setData] = useState({ temperature: null, humidity: null });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/data");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <ComponentTemperature temperature={data.temperature} />
      <ComponentHumidity humidity={data.humidity} />
    </>
  );
}

function ComponentTemperature({ temperature }) {
  return Math.round(temperature);
}

function ComponentHumidity({ humidity }) {
  return <div>{Math.round(humidity)}</div>;
}
export default FetchedData;
