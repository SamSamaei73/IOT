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

  return data;
  // <div>
  //   <ComponentTemperature data={data} />
  //   {/* <ComponentHumidity humidity={data.humidity} /> */}
  // </div>
}

function ComponentTemperature({ data }) {
  return <div>{[data.temperature, data.humidity]}</div>;
}

// function ComponentHumidity({ humidity }) {
//   return <div>{Math.round(humidity)}</div>;
// }

export default FetchedData;
