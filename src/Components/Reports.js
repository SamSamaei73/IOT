import React, { useRef, useState, useContext, useEffect } from "react";
import "../Scss/Main.scss";
import Header from "./Items/Header";
import EnergyContext from "../context/EnergyContext";
import Chart from './Items/Chart'


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

const Reports = () => {
  const energyContext = useContext(EnergyContext);
  const { GetAllInfo, allInformationGet } = energyContext;
  const [AllDataReport, setAllDataReport] = useState([]);
  const [Temp, setATemp] = useState(false);

  useEffect(() => {
    GetAllInfo();
  }, []);

  useEffectSkipFirst(() => {
    if (allInformationGet && Array.isArray(allInformationGet.data)) {
      const lastSixItems = allInformationGet.data.slice(-6  ); // Get the last 6 items
      let newData = lastSixItems.map((item) => {
        let newItem = {};
        newItem.id = item.id;
        newItem.temperature = item.temperature;
        newItem.created_at = item.created_at;
        newItem.humidity = item.humidity;
        newItem.light_intensity = item.light_intensity;
        newItem.buzzer = item.buzzer;
        return newItem;
      });
      setAllDataReport(newData);
    }
  }, [allInformationGet]);

  return (
    <div className="VideoTable">
      <div className="shadow">
        <Header HeaderTitle="Reports" />
        <h2 className="ResTitle"> Reports</h2>

        <table>
          <tr>
            <th>Date</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Light Intensity</th>
            <th>Buzzer Function</th>
          </tr>
          {Array.isArray(AllDataReport) && AllDataReport.length > 0
            ? AllDataReport.map((item) => (
                <tr>
                  <td>{item.created_at}</td>
                  <td>{item.temperature}</td>
                  <td>{item.humidity}</td>
                  <td>{item.light_intensity}</td>
                  <td>{item.buzzer == 0 ? <p>Off</p> : <p>On</p>} </td>
                </tr>
              ))
            : null}
        </table>
        {/* <div className="Chart_place">
          <Chart/>
        </div> */}

      </div>
    </div>
  );
};

export default Reports;
