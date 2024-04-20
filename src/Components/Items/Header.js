import React, { useRef, useState, useContext, useEffect } from "react";
import "../../Scss/Main.scss";
import Exit from "../../Images/icons8-log-out-64.png";
import Video from "../../Images/icons8-video-64.png";
import Report from "../../Images/icons8-reports-50.png";
import Home from "../../Images/icons8-home-64.png";
import { NavLink } from "react-router-dom";
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

const Header = (props) => {
  const energyContext = useContext(EnergyContext);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    const formattedTime = `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;

    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDate(currentDate);

  return (
    <div className="Header">
      <div className="MainBtn" style={{ width: "9rem" }}>
        <NavLink to="/Dashboard">
          <img src={Home} alt="Home" />
        </NavLink>
        <NavLink to="/VideoTable">
          <img src={Video} alt="Video" />
        </NavLink>
        <NavLink to="/Reports">
          <img src={Report} alt="Report" style={{ width: "2.5rem" }} />
        </NavLink>
      </div>
      <h2>{props.HeaderTitle}</h2>
      <div className="MainBtn" style={{ width: "9rem" }}>
        <h4 style={{color:'white'}}>{formattedDate}</h4>
        <NavLink to="/">
          <img src={Exit} alt="Exit" />
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
