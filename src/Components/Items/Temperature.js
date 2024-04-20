import React, { useRef, useState, useContext, useEffect } from "react";
import "../../Scss/Main.scss";
import "../../Scss/Button.scss";
import EnergyContext from "../../context/EnergyContext";

function useEffectSkipFirst(fn, arr) {
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    fn();
  }, arr);
}

const Temperature = () => {
  const energyContext = useContext(EnergyContext);
  const { GetInfo, informationGet } = energyContext;
  const [Datahumidity, setDatahumidity] = useState([]);
  const [Temp, setTemp] = useState([]);
  const [FanSet, setFanSet] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    GetInfo();
  }, []);

  useEffectSkipFirst(() => {
    if (informationGet) {
      console.log("mohtava", informationGet);
      const temperatureFirstTwo = informationGet.temperature.substring(0, 2);
      const humidityFirstTwo = informationGet.humidity.substring(0, 2);
      setTemp(temperatureFirstTwo);
      setDatahumidity(humidityFirstTwo);
      setFanSet(informationGet.fan);
    }
  }, [informationGet]);

  useEffect(() => {
    if (FanSet === 1) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [FanSet]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="tempr" style={{ width: "21rem" }}>
      <div className="temp">
        <section id="sha_temp_body" class="col-12">
          <div className="row">
            <div className="col-12">
              <span className="sha_temp">
                <span>
                  <span className="temp-data">
                    {Temp}
                    <sup>&deg;C</sup>{" "}
                  </span>
                  <span className="temp-info">
                    <i className="fa fa-snowflake-o"></i> Temperature
                  </span>
                </span>
              </span>
              <span className="sha_temp">
                <span>
                  <span className="temp-data">
                    {" "}
                    {Datahumidity} <sup>%</sup>{" "}
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
      <input
        type="checkbox"
        role="switch"
        className="toggle"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default Temperature;
