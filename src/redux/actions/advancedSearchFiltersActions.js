import * as types from "./actionTypes";
import * as searchFiltersApi from "../../api/searchFiltersApi";

export function loadAdvancedSearchFiltersSuccess(advancedFilters) {
    return { type: types.LOAD_ADVANCED_SEARCH_FILTERS_SUCCESS, advancedFilters };
}

export function clickAdvancedSearchFilterSuccess(advancedFilter) {
  return { type: types.CLICK_ADVANCED_SEARCH_FILTER_SUCCESS, advancedFilter };
}

export function clearAdvancedSearchSelectionSuccess() {
  return {type: types.CLEAR_ADVANCED_SEARCH_SELECTION_SUCCESS};
}

export function loadAdvancedSearchFilters() {
  const func = function func(dispatch) {
    return searchFiltersApi.getAdvancedSearchFilters()
      .then(searchResults => {
          dispatch(loadAdvancedSearchFiltersSuccess(searchResults.data));
      })
      .catch(error => {
          throw error;
      });
  };
  return func;
}

export function clickAdvancedSearchFilter(filter) {
  const func = function func(dispatch) {
    dispatch(clickAdvancedSearchFilterSuccess(filter));
  };
  return func;
}

export function clearAdvancedSearchSelection() {
  const func = function func(dispatch) {
    dispatch(clearAdvancedSearchSelectionSuccess());
  };
  return func;
}