import * as types from "./actionTypes";
import * as searchFiltersApi from "../../api/searchFiltersApi";
import * as searchApi from "../../api/searchApi";
import {switchPage, loadSearchResultsSuccess} from "./searchActions";

export function loadSearchFiltersSuccess(searchFilters) {
    return { type: types.LOAD_SEARCH_FILTERS_SUCCESS, searchFilters };
}

export function clickSearchFilterSuccess(filter) {
  return { type: types.CLICK_SEARCH_FILTER_SUCCESS, filter };
}

export function loadSearchFilters() {
  return function(dispatch) {
    return searchFiltersApi.getSearchFilters()
      .then(searchResults => {
          dispatch(loadSearchFiltersSuccess(searchResults.data));
      })
      .catch(error => {
          throw error;
      });
  };
}

export function clickSearchFilter(filter) {
  return function(dispatch, getState) {
    dispatch(clickSearchFilterSuccess(filter));
    dispatch(switchPage({page: 1, pageSize: 10}));
    const afterState = getState();
    return searchApi.searchCatalog(afterState.datasets.searchCriteria)
    .then(searchResults => {
        dispatch(loadSearchResultsSuccess(searchResults.data));
    })
    .catch(error => {
        throw error;
    });
  };
}