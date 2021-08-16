import * as types from "../actions/actionTypes";
import initialState from './initialState';

export default function participatingResourcesReducer(state = initialState.participatingResources, action) {
    switch (action.type) {
        case types.LOAD_LANDING_PARTICIPATING_RESOURCES_SUCCESS:
            return {
                ...state,
                landing: action.participatingResources,
            };
        default:
            return state;
    }
}