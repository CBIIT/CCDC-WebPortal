import * as types from "./actionTypes";
import * as applicationApi from "../../api/applicationApi";

export function loadApplicationVersionInfoSuccess(versionInfo) {
    return { type: types.LOAD_APPLICATION_VERSION_INFO_SUCCESS, versionInfo };
}

export function loadWidgetUpdatesSuccess(widgetUpdates) {
    return { type: types.LOAD_WIDGET_UPDATE_SUCCESS, widgetUpdates };
}

export function loadSiteUpdatesSuccess(siteUpdates) {
    return { type: types.LOAD_SITE_UPDATE_SUCCESS, siteUpdates };
}

export function switchPage(pageInfo) {
  return { type: types.SWITCH_PAGE, pageInfo};
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

export function loadSiteUpdates() {
    const func = function func(dispatch) {
        return applicationApi.getSiteUpdates()
        .then(result => {
            dispatch(loadSiteUpdatesSuccess(result.data));
        })
        .catch(error => {
            throw error;
        });
    };
    return func;
}

export function pageSelect(pageInfo) {
    const func = function func(dispatch) {
        dispatch(switchPage(pageInfo));
    };
    return func;
}