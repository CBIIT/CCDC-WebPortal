import * as types from "./actionTypes";
import * as participatingResourcesApi from "../../api/participatingResourcesApi";

export function loadLandingParticipatingResourcesSuccess(participatingResources) {
    return { type: types.LOAD_LANDING_PARTICIPATING_RESOURCES_SUCCESS, participatingResources };
}

export function loadDataresourceDetailSuccess(id, data) {
  const tmp = {};
  tmp[id] = data;
  return { type: types.LOAD_DATARESOURCE_DETAIL_SUCCESS, dataresource: tmp};
}

export function loadDataresourceDetailDatasetsSuccess(id, data) {
  const tmp = {};
  tmp[id] = data;
  return { type: types.LOAD_DATARESOURCE_DETAIL_DATASETS_SUCCESS, dataresource: tmp};
}

export function loadSearchFiltersSuccess(data) {
  return { type: types.LOAD_PARTICIPATING_RESOURCES_SEARCH_FILTERS_SUCCESS, searchFilters: data.searchFilters };
}

export function loadSearchFiltersSelectionSuccess(filters) {
  return { type: types.LOAD_PARTICIPATING_RESOURCES_SEARCH_FILTERS_SELECTION_SUCCESS, filters };
}

export function switchPage(pageInfo) {
  return { type: types.PARTICIPATING_RESOURCES_SWITCH_PAGE, pageInfo};
}

export function loadSearchResultsSuccess(searchResults) {
  return { type: types.LOAD_PARTICIPATING_RESOURCES_SEARCH_RESULTS_SUCCESS, searchResults };
}

export function addSearchResultsSuccess(searchResults) {
  return { type: types.ADD_PARTICIPATING_RESOURCES_SEARCH_RESULTS_SUCCESS, searchResults };
}

export function clickSearchFilterSuccess(filter) {
  return { type: types.CLICK_PARTICIPATING_RESOURCES_SEARCH_FILTER_SUCCESS, filter };
}

export function loadLandingParticipatingResources() {
  const func = function func(dispatch) {
      return participatingResourcesApi.getLandingParticipatingResources()
      .then(participatingResources => {
          dispatch(loadLandingParticipatingResourcesSuccess(participatingResources.data));
      })
      .catch(error => {
          throw error;
      });
  };
  return func;
}

export function loadDataresourceDetail(id) {
  const func = function func(dispatch) {
    return participatingResourcesApi.getDataresourceById(id)
    .then(participatingResources => {
      dispatch(loadDataresourceDetailSuccess(id, participatingResources.data));
    })
    .catch(error => {
        throw error;
    });
  };
  return func;
}

export function loadDataresourceDetailDatasets(id) {
  const func = function func(dispatch) {
    return participatingResourcesApi.getDatasetsById(id)
    .then(participatingResources => {
      dispatch(loadDataresourceDetailDatasetsSuccess(id, participatingResources.data));
    })
    .catch(error => {
        throw error;
    });
  };
  return func;
}

export function loadSearchFilters() {
  const func = function func(dispatch) {
    return participatingResourcesApi.getSearchFilters()
      .then(searchResults => {
          dispatch(loadSearchFiltersSuccess(searchResults.data));
      })
      .catch(error => {
          throw error;
      });
  };
  return func;
}

export function loadFromUrlQuery(filters) {
  const func = function func(dispatch, getState) {
      dispatch(loadSearchFiltersSelectionSuccess(filters));
      dispatch(switchPage({page: 1, pageSize: 15, total: 0}));
      const { participatingResources } = getState();
      return participatingResourcesApi.searchParticipatingResources(participatingResources.searchCriteria)
      .then(searchResults => {
        dispatch(loadSearchResultsSuccess(searchResults.data));
      })
      .catch(error => {
          throw error;
      });
  };
  return func;
}

export function clickParticipatingResourcesSearchFilter(filter) {
  const func = function func(dispatch, getState) {
    // console.log(1, filter);
    dispatch(clickSearchFilterSuccess(filter));
    dispatch(switchPage({page: 1, pageSize: 15, total: 0}));
    const { participatingResources } = getState();
    // console.log(participatingResources);
    return participatingResourcesApi.searchParticipatingResources(participatingResources.searchCriteria)
    .then(searchResults => {
        dispatch(loadSearchResultsSuccess(searchResults.data));
    })
    .catch(error => {
        throw error;
    });
  };
  return func;
}