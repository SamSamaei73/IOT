import React, { useRef, useState, useContext, useEffect } from "react";
import "../../Scss/Main.scss";
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

const Chart = () => {
  const energyContext = useContext(EnergyContext);
  const { GetAllInfo, allInformationGet } = energyContext;
  const [AllDataReport, setAllDataReport] = useState([]);

  useEffect(() => {
    GetAllInfo();
  }, []);

  useEffectSkipFirst(() => {
    if (allInformationGet && Array.isArray(allInformationGet.data)) {
      const lastSixItems = allInformationGet.data.slice(-6); // Get the last 6 items
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
    <div className="Chart">
      <div id="wrapper">
        <div id="q2_2010">
          <div id="q1_2010">
            <div id="q4_2009">
              <div id="q3_2009">
                <div id="q2_2009">
                  <div id="q1_2005">
                    <div id="labels">
                      <ul>
                        <li>
                          <span></span>Temperature
                        </li>
                        <li>
                          <span></span>Humidity
                        </li>
                        <li>
                          <span></span>Light Intensity
                        </li>
                      </ul>
                    </div>
                    <div id="pie_ico">Pie &raquo;</div>
                    <div id="pyr_ico">&laquo; Pyramid</div>
                    <div id="percentage_wrapper">
                      <div id="percentage">
                        <ul>
                          <li>
                            <p>60.14%</p>
                            <p>61.79%</p>
                            <p>63.90%</p>
                            <p>67.02%</p>
                            <p>68.28%</p>
                            <p>89.68%</p>
                          </li>
                      
                        </ul>
                      </div>
                    </div>
                    <div id="slider">
                      <div id="chart_holder">
                        <div id="pie_chart">
                          <ul>
                            <li id="c1_r">
                              <p>
                                <span class="pie_left"></span>
                              </p>
                            </li>
                            <li id="c1_l">
                              <p>
                                <span class="pie_right"></span>
                              </p>
                            </li>
                            <li id="c2_r">
                              <p>
                                <span class="pie_left"></span>
                              </p>
                            </li>
                            <li id="c2_l">
                              <p>
                                <span class="pie_right"></span>
                              </p>
                            </li>
                            <li id="c3_r">
                              <p>
                                <span class="pie_left"></span>
                              </p>
                            </li>
                            <li id="c3_l">
                              <p>
                                <span class="pie_right"></span>
                              </p>
                            </li>
                            <li id="c4_r">
                              <p>
                                <span class="pie_left"></span>
                              </p>
                            </li>
                            <li id="c4_l">
                              <p>
                                <span class="pie_right"></span>
                              </p>
                            </li>
                            <li id="c5_r">
                              <p>
                                <span class="pie_left"></span>
                              </p>
                            </li>
                            <li id="c5_l">
                              <p>
                                <span class="pie_right"></span>
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div id="pyr_chart">
                          <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
