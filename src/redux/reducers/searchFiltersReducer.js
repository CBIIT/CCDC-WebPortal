import * as types from "../actions/actionTypes";
import initialState from './initialState';

export default function searchFiltersReducer(state = initialState.searchFilters, action) {
    switch (action.type) {
        case types.LOAD_SEARCH_FILTERS_SUCCESS: {
          return action.searchFilters;
        }
        default:
            return state;
    }
}