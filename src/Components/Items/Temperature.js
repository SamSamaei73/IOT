import React, { useState, useEffect } from "react";
import "../../Scss/Main.scss";
import "../../Scss/Button.scss";
// import ComponentTemperature from "./FetchedData";
// import ComponentHumidity from "./FetchedData";

const Temperature = () => {
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
    <div className="tempr" style={{ width: "21rem" }}>
      <div className="temp">
        <section id="sha_temp_body" className="col-12">
          <div className="row">
            <div className="col-12">
              <span className="sha_temp">
                <span>
                  <span className="temp-data">
                    {Math.round(data.temperature)} <sup>C</sup>
                    {/* {<ComponentTemperature key={"temperature"} />} */}
                  </span>
                  <span className="temp-info">
                    <i className="fa fa-snowflake-o"></i> Temperature
                  </span>
                </span>
              </span>
              <span className="sha_temp">
                <span>
                  <span className="temp-data">
                    {Math.round(data.humidity)}
                    <sup>%</sup>
                    {/* 40 <sup>%</sup>{" "} */}
                  </span>
                  <span className="temp-info">
                    <i className="fa fa-snowflake-o"></i> Humidity
                  </span>
                </span>
              </span>
            </div>
          </div>
        </section>
      </div>
      <input type="checkbox" role="switch" className="toggle" />
    </div>
  );
};

export default Temperature;
