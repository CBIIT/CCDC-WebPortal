import * as types from "../actions/actionTypes";
import initialState from './initialState';

export default function advancedFiltersReducer(state = initialState.documentSearch, action) {
    switch (action.type) {
        case types.LOAD_DOCUMENT_SEARCH_RESULTS_SUCCESS:
          return {
            ...state,
            pageInfo: action.searchResults.pageInfo,
            results: action.searchResults.result,
          };
        case types.PUT_SEARCH_KEYWORD:
          return {
            ...state,
            keyword: action.searchText,
          };
        case types.SWITCH_PAGE:
          return {
            ...state,
            pageInfo: action.pageInfo,
          };
        default:
            return state;
    }
}