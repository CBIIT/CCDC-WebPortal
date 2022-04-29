import * as types from "./actionTypes";
import * as searchFiltersApi from "../../api/searchFiltersApi";
import * as participatingResourcesApi from "../../api/participatingResourcesApi";
import * as searchApi from "../../api/searchApi";
import {
  runFullTextSearch,
  switchPage,
  switchSorting,
  switchSortingOrder,
  switchView,
  loadSearchResultsSuccess
} from "./searchActions";

export function loadSearchFiltersSuccess(searchFilters) {
    return { type: types.LOAD_SEARCH_FILTERS_SUCCESS, searchFilters };
}

export function clickSearchFilterSuccess(filter) {
  return { type: types.CLICK_SEARCH_FILTER_SUCCESS, filter };
}

export function loadSearchFiltersSelectionSuccess(filters) {
  return { type: types.LOAD_SEARCH_FILTERS_SELECTION_SUCCESS, filters };
}

export function loadSearchDataResources() {
  const func = function func(dispatch) {
    return participatingResourcesApi.getAllParticipatingResources()
      .then(searchResults => {
          dispatch(loadSearchFiltersSuccess(searchResults.data));
      })
      .catch(error => {
          throw error;
      });
  };
  return func;
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
  const func = function func(dispatch) {
      const searchCriteria = {};
      searchCriteria.search_text = searchText;
      searchCriteria.facet_filters = {};
      searchCriteria.pageInfo = {};
      searchCriteria.pageInfo.page = filters.page ? filters.page : 1;
      searchCriteria.pageInfo.pageSize = filters.pageSize ? filters.pageSize : 10;
      searchCriteria.sort = {};
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "dataset_name.raw":
            searchCriteria.sort.name = "Dataset";
            searchCriteria.sort.k = "dataset_name.raw";
            break;
          case "case_id":
            searchCriteria.sort.name = "Cases";
            searchCriteria.sort.k = "case_id";
            break;
          case "sample_id":
            searchCriteria.sort.name = "Samples";
            searchCriteria.sort.k = "sample_id";
            break;
          case "data_resource_id":
            searchCriteria.sort.name = "Resource";
            searchCriteria.sort.k = "data_resource_id";
            break;
          case "primary_dataset_scope":
            searchCriteria.sort.name = "Primary Dataset Scope";
            searchCriteria.sort.k = "primary_dataset_scope";
            break;
          default:
            dispatch(switchSorting({name: "Dataset", k: "dataset_name.raw"}));
            searchCriteria.sort.name = "Dataset";
            searchCriteria.sort.k = "dataset_name.raw";
        }
      } else {
        searchCriteria.sort.name = "Dataset";
        searchCriteria.sort.k = "dataset_name.raw";
      }
      if (filters.sortOrder) {
        searchCriteria.sort.v = filters.sortOrder;
      } else {
        searchCriteria.sort.v = "asc";
      }
      searchCriteria.viewType = filters.viewType ? filters.viewType : "card";
      return searchApi.searchCatalog(searchCriteria)
      .then(searchResults => {
        dispatch(loadSearchResultsSuccess(searchResults.data));
        dispatch(runFullTextSearch(searchText));
        dispatch(switchPage(searchResults.data.pageInfo));
        dispatch(switchSorting({name: searchResults.data.sort.name, k: searchResults.data.sort.k}));
        dispatch(switchSortingOrder(searchResults.data.sort.v));
        dispatch(switchView(searchCriteria.viewType));
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