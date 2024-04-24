/* eslint-disable import/no-anonymous-default-export */
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

export default (state, action) => {
  switch (action.type) {

    
    case GET_ALL_VIDEO_INFO_SUCCESS:
      return {
        ...state,
        videoReport: action.payload,
      };
    case GET_ALL_VIDEO_INFO_FAIL:
      return {
        ...state,
        err: action.payload,
      };
    
    case POST_DATA_SUCCESS:
      return {
        ...state,
        sendDataByClick: action.payload,
      };
    case POST_DATA_FAIL:
      return {
        ...state,
        err: action.payload,
      };

    case GET_INFO_SUCCESS:
      return {
        ...state,
        informationGet: action.payload,
      };
    case GET_INFO_FAIL:
      return {
        ...state,
        err: action.payload,
      };

    case GET_ALL_INFO_SUCCESS:
      return {
        ...state,
        allInformationGet: action.payload,
      };
    case GET_ALL_INFO_FAIL:
      return {
        ...state,
        err: action.payload,
      };
    default:
      return state;
  }
};
