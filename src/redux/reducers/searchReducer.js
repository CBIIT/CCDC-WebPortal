import * as types from "../actions/actionTypes";
import initialState from './initialState';

const insertOrDeleteFilter = (filters, action) => {
  const tmp = {};
  const newArray = filters[action.filter.name] ? filters[action.filter.name].slice() : [];
  const idx = newArray.indexOf(action.filter.value);
  if (idx > -1) {
    newArray.splice(idx, 1);
    tmp[action.filter.name] = newArray;
  } else {
    newArray.push(action.filter.value);
    tmp[action.filter.name] = newArray;
  }
  return tmp;
};

export default function searchReducer(state = initialState.datasets, action) {
    switch (action.type) {
        case types.LOAD_SEARCH_RESULTS_SUCCESS: {
          return {
            ...state,
            searchResults: action.searchResults.result,
            searchCriteria: {
              ...state.searchCriteria,
              pageInfo: {
                ...state.searchCriteria.pageInfo,
                total: action.searchResults.pageInfo.total,
              },
            },
          };
        }
        case types.CLICK_SEARCH_FILTER_SUCCESS: {
          const facetFilter = insertOrDeleteFilter(state.searchCriteria.facet_filters, action);
          return {
            ...state,
            searchCriteria: {
              ...state.searchCriteria,
              facet_filters: {
                ...state.searchCriteria.facet_filters,
                ...facetFilter,
              },
            },
          };
        }
        case types.RUN_FULL_TEXT_SEARCH:
          return {
            ...state,
            searchCriteria: {
              ...state.searchCriteria,
              search_text: action.searchText,
              },
          };
        case types.SWITCH_SORTING:
          return {
            ...state,
            searchCriteria: {
              ...state.searchCriteria,
              sort: action.sorting,
              },
          };
        case types.SWITCH_PAGE:
          return {
            ...state,
            searchCriteria: {
              ...state.searchCriteria,
              pageInfo: action.pageInfo,
              },
          };
        case types.SWITCH_VIEW:
          return {
            ...state,
            viewType: action.viewType,
          };
        default:
            return state;
    }
}