import React, { useRef, useState, useContext, useEffect } from "react";
import "../Scss/Main.scss";
import Header from './Items/Header';
import EnergyContext from "../context/EnergyContext";


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
  


const VideoTable = (HeaderTitle) => {
    const energyContext = useContext(EnergyContext);
  const { GetAllVideoInfo, videoReport } = energyContext;
  const [VideoReport, setVideoReport] = useState([]);
  

 
  useEffect(() => {
    GetAllVideoInfo();
    const interval = setInterval(() => {
      GetAllVideoInfo();
    }, 4000); // Refresh every 4 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  useEffectSkipFirst(() => {
    if (videoReport && Array.isArray(videoReport.data)) {
      const lastSixItems = videoReport.data.slice(-6  ); // Get the last 6 items
      let newData = lastSixItems.map((item) => {
        let newItem = {};
        newItem.id = item.id;
        newItem.motion = item.motion;
        newItem.buzzer = item.buzzer;
        newItem.video = item.video;
        newItem.created_at = item.created_at;
       
        return newItem;
      });
      setVideoReport(newData);
      console.log('video', newData)
    }
  }, [videoReport]);


  return (
    <div className='VideoTable'>
        <div className="shadow">
         <Header HeaderTitle='Videos'/>
         <h2 className="ResTitle">Video Report</h2>
        <table>
            <tr>
                <th>Date</th>
                <th>Buzzer</th>
                <th>video</th>
            </tr>
            {Array.isArray(VideoReport) && VideoReport.length > 0
            ? VideoReport.map((item) => (
            <tr>
                <td>{item.created_at}</td>
                <td>{item.buzzer == 0 ? <p>Off</p> : <p>On</p>} </td>
                <td> <a href={item.video} target="_blank">Play</a>
                </td>
                
            </tr>
             ))
             : null}
        </table>
        </div>
    </div>
  )
}

export default VideoTable