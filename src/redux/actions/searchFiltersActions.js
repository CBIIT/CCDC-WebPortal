import * as types from "./actionTypes";
import * as searchFiltersApi from "../../api/searchFiltersApi";
import * as searchApi from "../../api/searchApi";
import { runFullTextSearch, switchPage, loadSearchResultsSuccess } from "./searchActions";

export function loadSearchFiltersSuccess(searchFilters) {
    return { type: types.LOAD_SEARCH_FILTERS_SUCCESS, searchFilters };
}

export function clickSearchFilterSuccess(filter) {
  return { type: types.CLICK_SEARCH_FILTER_SUCCESS, filter };
}

export function loadSearchFiltersSelectionSuccess(filters) {
  return { type: types.LOAD_SEARCH_FILTERS_SELECTION_SUCCESS, filters };
}

export function loadSearchFilters() {
  const func = function func(dispatch) {
    return searchFiltersApi.getSearchFilters()
      .then(searchResults => {
          dispatch(loadSearchFiltersSuccess(searchResults.data));
      })
      .catch(error => {
          throw error;
      });
  };
  return func;
}

export function loadFromUrlQuery(searchText, filters) {
  const func = function func(dispatch, getState) {
      dispatch(runFullTextSearch(searchText));
      dispatch(loadSearchFiltersSelectionSuccess(filters));
      dispatch(switchPage({page: 1, pageSize: 10}));
      const { datasets } = getState();
      return searchApi.searchCatalog(datasets.searchCriteria)
      .then(searchResults => {
        dispatch(loadSearchResultsSuccess(searchResults.data));
      })
      .catch(error => {
          throw error;
      });
  };
  return func;
}

export function clickSearchFilter(filter) {
  const func = function func(dispatch, getState) {
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
  return func;
}