import * as types from "../actions/actionTypes";
import initialState from './initialState';

export default function applicationReducer(state = initialState.application, action) {
    switch (action.type) {
        case types.LOAD_APPLICATION_VERSION_INFO_SUCCESS:
          return {
            ...state,
            softwareVersion: action.versionInfo.softwareVersion,
            siteDataUpdate: action.versionInfo.siteDataUpdate,
          };
        default:
            return state;
    }
}