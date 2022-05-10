import * as types from "./actionTypes";
import * as searchApi from "../../api/searchApi";
import * as participatingResourcesApi from "../../api/participatingResourcesApi";

export function loadSearchFiltersSuccess(resourcesList) {
  return { type: types.LOAD_RESOURCES_LIST_SUCCESS, resourcesList };
}

export function loadSearchResultsSuccess(searchResults) {
  return { type: types.LOAD_SEARCH_RESULTS_SUCCESS, searchResults };
}

export function runFullTextSearch(searchText) {
  return { type: types.RUN_FULL_TEXT_SEARCH, searchText };
}

export function applyResourcesFilter(filter) {
  return { type: types.UPDATE_RESOURCES_FILTER_SUCCESS, filter };
}

export function handleBubbleSearchTextRemove() {
  return { type: types.RUN_FULL_TEXT_SEARCH, searchText: ""};
}

export function handleBubbleResourcesRemove() {
  return { type: types.UPDATE_RESOURCES_FILTER_SUCCESS, filter: [] };
}

export function switchSorting(sorting) {
  return { type: types.SWITCH_SORTING, sorting};
}

export function switchSortingOrder(order) {
  return { type: types.SWITCH_SORTING_ORDER, order};
}

export function switchPage(pageInfo) {
  return { type: types.SWITCH_PAGE, pageInfo};
}

export function switchSize(pageInfo) {
  return { type: types.SWITCH_SIZE, pageInfo};
}

export function switchView(viewType) {
  return { type: types.SWITCH_VIEW, viewType};
}

export function loadDatasetDetailSuccess(id, data) {
  const tmp = {};
  tmp[id] = data;
  return { type: types.LOAD_DATASET_DETAIL_SUCCESS, dataset: tmp};
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

export function loadFromUrlQuery(searchText, filters) {
  const func = function func(dispatch) {
      const searchCriteria = {};
      searchCriteria.search_text = searchText;
      searchCriteria.resources_filter = filters.filterByResource ? filters.filterByResource : [];
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
        dispatch(applyResourcesFilter(searchCriteria.resources_filter));
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

export function startFullTextSearch(searchText) {
  const func = function func(dispatch) {
      dispatch(runFullTextSearch(searchText));
  };
  return func;
}

export function bubbleSearchTextRemoveClick() {
  const func = function func(dispatch) {
      dispatch(handleBubbleSearchTextRemove());
  };
  return func;
}

export function bubbleResourcesRemoveClick() {
  const func = function func(dispatch) {
      dispatch(handleBubbleResourcesRemove());
  };
  return func;
}

export function changeSorting(sorting) {
  const func = function func(dispatch) {
      dispatch(switchSorting(sorting));
  };
  return func;
}

export function changeSortingOrder(order) {
  const func = function func(dispatch) {
      dispatch(switchSortingOrder(order));
  };
  return func;
}

export function pageSelect(pageInfo) {
  const func = function func(dispatch) {
      dispatch(switchPage(pageInfo));
  };
  return func;
}

export function sizeSelect(pageInfo) {
  const func = function func(dispatch) {
      // dispatch(switchSize(pageInfo));
      dispatch(switchSize({page: pageInfo.page ? pageInfo.page : 1, pageSize: pageInfo.pageSize ? pageInfo.pageSize : 10}));
  };
  return func;
}

export function switchDataView(viewType) {
  const func = function func(dispatch) {
    return dispatch(switchView(viewType));
  };
  return func;
}

export function loadDatasetDetail(id) {
  const func = function func(dispatch) {
    return searchApi.getDatasetById(id)
    .then(searchResults => {
      dispatch(loadDatasetDetailSuccess(id, searchResults.data));
    })
    .catch(error => {
        throw error;
    });
  };
  return func;
}