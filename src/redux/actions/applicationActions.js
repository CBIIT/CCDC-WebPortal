import * as types from "./actionTypes";
import * as applicationApi from "../../api/applicationApi";

export function loadApplicationVersionInfoSuccess(versionInfo) {
    return { type: types.LOAD_APPLICATION_VERSION_INFO_SUCCESS, versionInfo };
}

export function loadApplicationVersionInfo() {
  const func = function func(dispatch) {
      return applicationApi.getApplicationVersionInfo()
      .then(result => {
          dispatch(loadApplicationVersionInfoSuccess(result.data));
      })
      .catch(error => {
          throw error;
      });
  };
  return func;
}