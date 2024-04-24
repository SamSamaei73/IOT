import React, { useRef, useState, useContext, useEffect } from "react";
import "../../Scss/Main.scss";
import "../../Scss/Button.scss";
import Sun from "../../Images/sun.png";
import Night from "../../Images/night.png";
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

const Lights = () => {
  const energyContext = useContext(EnergyContext);
  const { GetInfo, informationGet, PostButton } = energyContext;
  const [isVisible, setIsVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [LightSet, setLightSet] = useState([]);
  const [LightInt, setLightInt] = useState([]);

  useEffect(() => {
    GetInfo();
    const interval = setInterval(() => {
      GetInfo();
    }, 5000); // Refresh every 4 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  useEffectSkipFirst(() => {
    if (informationGet) {
      setLightSet(informationGet.lights);
      setLightInt(informationGet.light_intensity);
    }
  }, [informationGet]);

  useEffect(() => {
    const fanState = LightSet === true;
    setIsChecked(fanState);
  }, [LightSet]);

  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    const valueToSend = newValue ? 1 : 0;
    SendInfo("light", valueToSend);
  };

  const SendInfo = (name, value) => {
    const payload = {
      name: name,
      value: value,
    };
    PostButton(payload);
    console.log("testi", payload);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(1);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="tempr">
      <div className="temp">
        <section id="sha_temp_body" class="col-12">
          <div className="row">
            <div className="col-12">
              <span className="sha_temp">
                <span>
                  <span className="temp-data">
                    {LightInt}
                    <sup>%</sup>{" "}
                  </span>
                  <span style={{ fontSize: "10px" }} className="temp-info">
                    <i className="fa fa-snowflake-o"></i> Light Intensity
                  </span>
                </span>
              </span>
            </div>
          </div>
        </section>
      </div>
      {/* {isChecked == false ? <h4>On</h4> : null}
      {isChecked == true ? <h4>Off</h4> : null} */}

      <input
        type="checkbox"
        name="light"
        role="switch"
        className="toggle"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default Lights;
