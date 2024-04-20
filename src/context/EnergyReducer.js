/* eslint-disable import/no-anonymous-default-export */
import {
  GET_INFO_SUCCESS,
  GET_INFO_FAIL,
  GET_ALL_INFO_SUCCESS,
  GET_ALL_INFO_FAIL,
} from "./Types";

export default (state, action) => {
  switch (action.type) {
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
