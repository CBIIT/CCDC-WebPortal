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
    return { type: types.RUN_FULL_TEXT_SEARCH, searchText: ""};
  }
  return { type: types.CLICK_SEARCH_FILTER_SUCCESS, filter: {name: selection.field, value: selection.value} };
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

export function switchView(viewType) {
  return { type: types.SWITCH_VIEW, viewType};
}

export function loadDatasetDetailSuccess(id, data) {
  const tmp = {};
  tmp[id] = data;
  return { type: types.LOAD_DATASET_DETAIL_SUCCESS, dataset: tmp};
}

export function resetSearchCriteria(searchCriteria) {
  return { type: types.RESET_SEARCH_CRITERIA, searchCriteria};
}

export function startFullTextSearch(searchText) {
  const func = function func(dispatch) {
      dispatch(runFullTextSearch(searchText));
      /*
      dispatch(switchPage({page: 1, pageSize: 10}));
      const { datasets } = getState();
      return searchApi.searchCatalog(datasets.searchCriteria)
      .then(searchResults => {
        dispatch(loadSearchResultsSuccess(searchResults.data));
      })
      .catch(error => {
          throw error;
      });
      */
  };
  return func;
}

export function bubbleRemoveClick(selection) {
  const func = function func(dispatch) {
      dispatch(handleSelectionRemove(selection));
      /*
      dispatch(switchPage({page: 1, pageSize: 10}));
      const { datasets } = getState();
      return searchApi.searchCatalog(datasets.searchCriteria)
      .then(searchResults => {
        dispatch(loadSearchResultsSuccess(searchResults.data));
      })
      .catch(error => {
          throw error;
      });
      */
  };
  return func;
}

export function changeSorting(sorting) {
  const func = function func(dispatch) {
      dispatch(switchSorting(sorting));
      /*
      const { datasets } = getState();
      return searchApi.searchCatalog(datasets.searchCriteria)
      .then(searchResults => {
        dispatch(loadSearchResultsSuccess(searchResults.data));
      })
      .catch(error => {
          throw error;
      });
      */
  };
  return func;
}

export function changeSortingOrder(order) {
  const func = function func(dispatch) {
      dispatch(switchSortingOrder(order));
      /*
      const { datasets } = getState();
      return searchApi.searchCatalog(datasets.searchCriteria)
      .then(searchResults => {
        dispatch(loadSearchResultsSuccess(searchResults.data));
      })
      .catch(error => {
          throw error;
      });
      */
  };
  return func;
}

export function pageSelect(pageInfo) {
  const func = function func(dispatch) {
      dispatch(switchPage(pageInfo));
      /*
      const { datasets } = getState();
      return searchApi.searchCatalog(datasets.searchCriteria)
      .then(searchResults => {
        dispatch(loadSearchResultsSuccess(searchResults.data));
      })
      .catch(error => {
          throw error;
      });
      */
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

export function cleanUpSearchCriteria() {
  const func = function func(dispatch) {
    dispatch(resetSearchCriteria({
      search_text: "",
      facet_filters: {},
      pageInfo: {
          page: 1,
          pageSize: 10,
      },
      sort: {
        name: "Dataset",
        k: "dataset_name.raw",
        v: "asc"
      }
    }));
  };
  return func;
}