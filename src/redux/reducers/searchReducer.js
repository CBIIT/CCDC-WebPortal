import * as types from "../actions/actionTypes";
import initialState from './initialState';

export default function searchReducer(state = initialState.datasets, action) {
    switch (action.type) {
        case types.LOAD_RESOURCES_LIST_SUCCESS: {
          return {
            ...state,
            resourcesList: action.resourcesList,
          };
        }
        case types.LOAD_SEARCH_RESULTS_SUCCESS: {
          return {
            ...state,
            searchResults: action.searchResults.result,
            searchSourceResults: action.searchResults.aggs,
          };
        }
        case types.UPDATE_RESOURCES_FILTER_SUCCESS: {
          return {
            ...state,
            searchCriteria: {
              ...state.searchCriteria,
              resources_filter: action.filter,
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
              sort: {
                ...state.searchCriteria.sort,
                name: action.sorting.name,
                k: action.sorting.k,
              },
            },
          };
        case types.SWITCH_SORTING_ORDER:
          return {
            ...state,
            searchCriteria: {
              ...state.searchCriteria,
              sort: {
                ...state.searchCriteria.sort,
                v: action.order,
              },
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
        case types.LOAD_DATASET_DETAIL_SUCCESS:
          return {
            ...state,
            details: {
              ...state.details,
              ...action.dataset,
            }
          };
        default:
            return state;
    }
}