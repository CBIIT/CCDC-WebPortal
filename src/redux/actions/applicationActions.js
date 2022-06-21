import * as types from "./actionTypes";
import * as applicationApi from "../../api/applicationApi";

export function loadApplicationVersionInfoSuccess(versionInfo) {
    return { type: types.LOAD_APPLICATION_VERSION_INFO_SUCCESS, versionInfo };
}

export function loadWidgetUpdatesSuccess(widgetUpdates) {
    return { type: types.LOAD_WIDGET_UPDATE_SUCCESS, widgetUpdates };
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

export function loadWidgetUpdates() {
    const func = function func(dispatch) {
        return applicationApi.getWidgetUpdates()
        .then(result => {
            dispatch(loadWidgetUpdatesSuccess(result.data));
        })
        .catch(error => {
            throw error;
        });
    };
    return func;
  }