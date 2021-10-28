import * as types from "../actions/actionTypes";
import initialState from './initialState';

const transformFilters = (searchFilters) => {
  const filters = {};
  Object.keys(searchFilters).forEach((key) => {
    filters[key.toLowerCase().replaceAll(' ', '_')] = searchFilters[key];
  });
  return filters;
};

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

export default function participatingResourcesReducer(state = initialState.participatingResources, action) {
    switch (action.type) {
        case types.LOAD_LANDING_PARTICIPATING_RESOURCES_SUCCESS:
            return {
                ...state,
                landing: action.participatingResources,
            };
        case types.LOAD_PARTICIPATING_RESOURCES_SEARCH_FILTERS_SUCCESS: {
          const searchFilters = transformFilters(action.searchFilters);
          return {
              ...state,
              searchFilters: {
                ...state.searchFilters,
                ...searchFilters,
              },
          };
        }
        case types.LOAD_PARTICIPATING_RESOURCES_SEARCH_FILTERS_SELECTION_SUCCESS: {
          return {
            ...state,
            searchCriteria: {
              ...state.searchCriteria,
              facet_filters: {
                ...state.searchCriteria.facet_filters,
                ...action.filters,
              },
            },
          };
        }
        case types.LOAD_PARTICIPATING_RESOURCES_SEARCH_RESULTS_SUCCESS: {
          return {
            ...state,
            searchResults: action.searchResults.result,
            searchCriteria: {
              ...state.searchCriteria,
              pageInfo: action.searchResults.pageInfo,
              },
          };
        }
        case types.ADD_PARTICIPATING_RESOURCES_SEARCH_RESULTS_SUCCESS: {
          return {
            ...state,
            searchResults: [...state.searchResults, ...action.searchResults.result],
            searchCriteria: {
              ...state.searchCriteria,
              pageInfo: action.pageInfo,
              },
          };
        }
        case types.CLICK_PARTICIPATING_RESOURCES_SEARCH_FILTER_SUCCESS: {
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
        case types.PARTICIPATING_RESOURCES_SWITCH_PAGE:
          return {
            ...state,
            searchCriteria: {
              ...state.searchCriteria,
              pageInfo: action.pageInfo,
              },
          };
        case types.LOAD_DATARESOURCE_DETAIL_SUCCESS:
          return {
            ...state,
            details: {
              ...state.details,
              ...action.dataresource,
            }
          };
        default:
            return state;
    }
}