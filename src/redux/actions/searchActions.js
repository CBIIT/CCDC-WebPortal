import * as types from "./actionTypes";
import * as searchApi from "../../api/searchApi";

export function loadSearchResultsSuccess(searchResults) {
  return { type: types.LOAD_SEARCH_RESULTS_SUCCESS, searchResults };
}

export function runFullTextSearch(searchText) {
  return { type: types.RUN_FULL_TEXT_SEARCH, searchText };
}

export function handleSelectionRemove(selection) {
  if (selection.field === "search_text") {
    console.log("here!");
    return { type: types.RUN_FULL_TEXT_SEARCH, searchText: ""};
  }
  return { type: types.CLICK_SEARCH_FILTER_SUCCESS, filter: {name: selection.field, value: selection.value} };
}

export function switchSorting(sorting) {
  return { type: types.SWITCH_SORTING, sorting};
}

export function switchPage(pageInfo) {
  return { type: types.SWITCH_PAGE, pageInfo};
}

export function switchView(viewType) {
  return { type: types.SWITCH_VIEW, viewType};
}

export function initialLoadSearchResults() {
  return function(dispatch, getState) {
    const { datasets } = getState();
    return searchApi.searchCatalog(datasets.searchCriteria)
      .then(datesets => {
          dispatch(loadSearchResultsSuccess(datesets.data));
      })
      .catch(error => {
          throw error;
      });
  };
}

export function startFullTextSearch(searchText) {
  return function(dispatch, getState) {
      dispatch(runFullTextSearch(searchText));
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
}

export function bubbleRemoveClick(selection) {
  return function(dispatch, getState) {
      dispatch(handleSelectionRemove(selection));
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
}

export function changeSorting(sorting) {
  return function(dispatch, getState) {
      dispatch(switchSorting(sorting));
      const { datasets } = getState();
      return searchApi.searchCatalog(datasets.searchCriteria)
      .then(searchResults => {
        dispatch(loadSearchResultsSuccess(searchResults.data));
      })
      .catch(error => {
          throw error;
      });
  };
}

export function pageSelect(pageInfo) {
  return function(dispatch, getState) {
      dispatch(switchPage(pageInfo));
      const { datasets } = getState();
      return searchApi.searchCatalog(datasets.searchCriteria)
      .then(searchResults => {
        dispatch(loadSearchResultsSuccess(searchResults.data));
      })
      .catch(error => {
          throw error;
      });
  };
}

export function switchDataView(viewType) {
  return function(dispatch) {
    return dispatch(switchView(viewType));
  };
}