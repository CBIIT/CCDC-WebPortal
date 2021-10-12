import * as types from "../actions/actionTypes";
import initialState from './initialState';

const transformFilters = (searchFilters) => {
  const filters = {};
  Object.keys(searchFilters).forEach((key) => {
    filters[key.toLowerCase().replaceAll(' ', '_')] = searchFilters[key];
  });
  return filters;
};

export default function searchFiltersReducer(state = initialState.searchFilters, action) {
    switch (action.type) {
        case types.LOAD_SEARCH_FILTERS_SUCCESS: {
          const searchFilters = transformFilters(action.searchFilters);
          return {
              ...state,
              ...searchFilters,
          };
        }
        default:
            return state;
    }
}