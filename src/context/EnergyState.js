import React, { useReducer } from "react";
import EnergyContext from "./EnergyContext";
import EnergyReducer from "./EnergyReducer";

//import { encode, decode } from 'js-base64';

import axios from "axios";
import { SERVER_URL } from "./Constant";
import {
  GET_INFO_SUCCESS,
  GET_INFO_FAIL,
  GET_ALL_INFO_SUCCESS,
  GET_ALL_INFO_FAIL,
  POST_DATA_SUCCESS,
  POST_DATA_FAIL,
  GET_ALL_VIDEO_INFO_SUCCESS,
  GET_ALL_VIDEO_INFO_FAIL,
} from "./Types";

const EnergyState = (props) => {
  const initialState = {
    error: null,
    informationGet: null,
    allInformationGet: null,
    sendDataByClick: null,
    videoReport: null,
  };

  const [state, dispatch] = useReducer(EnergyReducer, initialState);

  const GetInfo = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(SERVER_URL + "/current-state", config);
      dispatch({
        type: GET_INFO_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_INFO_FAIL,
        payload: err.response.data.msgText,
      });
    }
  };

  const GetAllVideoInfo = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(SERVER_URL + "/log/video", config);
      dispatch({
        type: GET_ALL_VIDEO_INFO_SUCCESS,
        payload: res.data,
      });
      console.log("Main", res.data);
    } catch (err) {
      dispatch({
        type: GET_ALL_VIDEO_INFO_FAIL,
        payload: err.response.data.msgText,
      });
    }
  };
  const GetAllInfo = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(SERVER_URL + "/log/state", config);
      dispatch({
        type: GET_ALL_INFO_SUCCESS,
        payload: res.data,
      });
      console.log("Main", res.data);
    } catch (err) {
      dispatch({
        type: GET_ALL_INFO_FAIL,
        payload: err.response.data.msgText,
      });
    }
  };

  const PostButton = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    console.log("Test", formData);
    try {
      var fm = new FormData();
      fm.append("name", formData.name);
      fm.append("value", formData.value);

      const res = await axios.post(SERVER_URL + "/switch", fm, config);

      dispatch({
        type: POST_DATA_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({  
        type: POST_DATA_FAIL,
        payload: err.response,
      });
    }
  };




  

  return (
    <EnergyContext.Provider
      value={{
        error: state.error,
        informationGet: state.informationGet,
        allInformationGet: state.allInformationGet,
        sendDataByClick: state.sendDataByClick,
        videoReport: state.videoReport,

        GetInfo,
        GetAllInfo,
        PostButton,
        GetAllVideoInfo,
      }}
    >
      {props.children}{" "}
    </EnergyContext.Provider>
  );
};

export default EnergyState;
