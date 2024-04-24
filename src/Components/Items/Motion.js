import React, { useRef, useState, useContext, useEffect } from "react";
import "../../Scss/Main.scss";
import "../../Scss/Button.scss";
import safe from "../../Images/safe.png";
import Danger from "../../Images/32.png";
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
  const { GetInfo, informationGet ,PostButton } = energyContext;
  const [isVisible, setIsVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [Buzzer, setBuzzer] = useState([]);

  useEffect(() => {
    GetInfo();
    const interval = setInterval(() => {
      GetInfo();
    }, 5000); // Refresh every 4 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  useEffectSkipFirst(() => {
    if (informationGet) {
      setBuzzer(informationGet.buzzer);
    }
  }, [informationGet]);

  useEffect(() => {
    const fanState = Buzzer ===  true;
    setIsChecked(fanState);
  }, [Buzzer]);





  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    const valueToSend = newValue ? 1 : 0;
    SendInfo("buzzer", valueToSend);
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
    <div className="tempr">
      <div className="temp">
        {isChecked == false ? (
          <img src={safe} alt="safe" className="Sun" />
        ) : null}
        {isChecked == true ? (
          <img src={Danger} alt="Danger" className="Sun" />
        ) : null}
      </div>
      {isChecked == false ? <h4></h4> : null}
      {isChecked == true ? <h4 style={{ color: "red" }}>Danger!</h4> : null}
      <input
          type="checkbox"
          name="buzzer"
          role="switch"
          className="toggle"
          checked={isChecked}
          onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default Lights;
