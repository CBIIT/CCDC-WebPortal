import * as types from "./actionTypes";
import * as participatingResourcesApi from "../../api/participatingResourcesApi";

export function loadLandingParticipatingResourcesSuccess(participatingResources) {
    return { type: types.LOAD_LANDING_PARTICIPATING_RESOURCES_SUCCESS, participatingResources };
}

export function loadLandingParticipatingResources() {
    return function(dispatch) {
        return participatingResourcesApi.getLandingParticipatingResources()
        .then(participatingResources => {
            dispatch(loadLandingParticipatingResourcesSuccess(participatingResources.data));
        })
        .catch(error => {
            throw error;
        });
    };
}