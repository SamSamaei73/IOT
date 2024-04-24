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
  const { GetInfo, informationGet, sendDataByClick, PostButton } =
    energyContext;
  const [Datahumidity, setDatahumidity] = useState([]);
  const [Temp, setTemp] = useState([]);
  const [FanSet, setFanSet] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    GetInfo();
    const interval = setInterval(() => {
      GetInfo();
    }, 5000); 

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  useEffectSkipFirst(() => {
    if (informationGet) {
      setTemp(informationGet.temperature);
      setDatahumidity(informationGet.humidity);
      setFanSet(informationGet.fan);

    }
    console.log('datayi', informationGet)
  }, [informationGet]);


  useEffect(() => {
    const fanState = FanSet ===  true;
    setIsChecked(fanState);
  }, [FanSet]);

  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    const valueToSend = newValue ? 1 : 0;
    SendInfo("fan", valueToSend);
  };

  const SendInfo = (name, value) => {
    const payload = {
      name: name,
      value: value,
    };
    PostButton(payload);
    console.log("testi", payload);
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
        name="fan"
        role="switch"
        className="toggle"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default Temperature;
