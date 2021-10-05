import * as types from "../actions/actionTypes";
import initialState from './initialState';

export default function advancedFiltersReducer(state = initialState.advancedFilters, action) {
    switch (action.type) {
        case types.LOAD_ADVANCED_SEARCH_FILTERS_SUCCESS:
          return {
              ...state,
              ...action.advancedFilters,
          };
        default:
            return state;
    }
}