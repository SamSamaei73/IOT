import React from "react";
import "../../Scss/Main.scss";
import "../../Scss/Button.scss";
// import ComponentTemperature from "./FetchedData";
// import ComponentHumidity from "./FetchedData";
import data from "./FetchedData";

const Temperature = () => {
  // console.log(ComponentTemperature);
  return (
    <div className="tempr" style={{ width: "21rem" }}>
      <div className="temp">
        <section id="sha_temp_body" className="col-12">
          <div className="row">
            <div className="col-12">
              <span className="sha_temp">
                <span>
                  <span className="temp-data">
                    {data} <sup>°C</sup>{" "}
                    {/* <ComponentTemperature/> */}
                  </span>
                  <span className="temp-info">
                    <i className="fa fa-snowflake-o"></i> Temperature
                  </span>
                </span>
              </span>
              <span className="sha_temp">
                <span>
                  <span className="temp-data">
                    {/* {<ComponentHumidity />} */}
                    40 <sup>%</sup>{" "}
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
