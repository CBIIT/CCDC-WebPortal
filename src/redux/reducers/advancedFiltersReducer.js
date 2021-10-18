import * as types from "../actions/actionTypes";
import initialState from './initialState';

const insertOrDeleteFilter = (filters, action) => {
  const tmp = {};
  const newArray = filters[action.advancedFilter.name] ? filters[action.advancedFilter.name].slice() : [];
  const idx = newArray.indexOf(action.advancedFilter.value);
  if (idx > -1) {
    newArray.splice(idx, 1);
    tmp[action.advancedFilter.name] = newArray;
  } else {
    newArray.push(action.advancedFilter.value);
    tmp[action.advancedFilter.name] = newArray;
  }
  return tmp;
};

export default function advancedFiltersReducer(state = initialState.advancedSearch, action) {
    switch (action.type) {
        case types.LOAD_ADVANCED_SEARCH_FILTERS_SUCCESS:
          return {
            ...state,
            advancedFilters: {
              ...state.advancedFilters,
              ...action.advancedFilters,
            },
          };
        case types.CLICK_ADVANCED_SEARCH_FILTER_SUCCESS: {
          const facetFilter = insertOrDeleteFilter(state.advanced_facet_filters, action);
          return {
            ...state,
            advanced_facet_filters: {
              ...state.advanced_facet_filters,
              ...facetFilter,
            },
          };
        }
        case types.CLEAR_ADVANCED_SEARCH_SELECTION_SUCCESS:
          return {
            ...state,
            advanced_facet_filters: {},
          };
        default:
            return state;
    }
}