import * as types from "./actionTypes";
import * as participatingResourcesApi from "../../api/participatingResourcesApi";

export function loadLandingParticipatingResourcesSuccess(participatingResources) {
    return { type: types.LOAD_LANDING_PARTICIPATING_RESOURCES_SUCCESS, participatingResources };
}

export function loadDataresourceDetailSuccess(data) {
  return { type: types.LOAD_DATARESOURCE_DETAIL_SUCCESS, dataresource: data};
}

export function loadDataresourceDetailDatasetsSuccess(data) {
  return { type: types.LOAD_DATARESOURCE_DETAIL_DATASETS_SUCCESS, datasets: data};
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

export function switchSize(pageInfo) {
  return { type: types.PARTICIPATING_RESOURCES_SWITCH_SIZE, pageInfo};
}

export function loadSearchResultsSuccess(searchResults) {
  return { type: types.LOAD_PARTICIPATING_RESOURCES_SEARCH_RESULTS_SUCCESS, searchResults };
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
      dispatch(loadDataresourceDetailSuccess(participatingResources.data));
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
    .then(datasets => {
      dispatch(loadDataresourceDetailDatasetsSuccess(datasets.data));
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
  const func = function func(dispatch) {
    const searchCriteria = {};
    searchCriteria.facet_filters = {};
    searchCriteria.facet_filters.resource_type = [];
    searchCriteria.facet_filters.data_content_type = [];
    if (filters.resource_type) {
      searchCriteria.facet_filters.resource_type = filters.resource_type;
    }
    if (filters.data_content_type) {
      searchCriteria.facet_filters.data_content_type = filters.data_content_type;
    }
    searchCriteria.pageInfo = {};
    searchCriteria.pageInfo.page = filters.page ? filters.page : 1;
    searchCriteria.pageInfo.pageSize = filters.pageSize ? filters.pageSize : 10;
    return participatingResourcesApi.searchParticipatingResources(searchCriteria)
    .then(searchResults => {
      dispatch(loadSearchResultsSuccess(searchResults.data));
      dispatch(loadSearchFiltersSelectionSuccess(searchCriteria.facet_filters));
      dispatch(switchPage(searchResults.data.pageInfo));
      dispatch(switchSize(searchResults.data.pageInfo));
    })
    .catch(error => {
        throw error;
    });
  };
  return func;
}

export function cleanUpParticipatingResourceListPage() {
  const func = function func(dispatch) {
    dispatch(loadSearchFiltersSelectionSuccess({resource_type: [], data_content_type: []}));
    dispatch(switchPage({page: 1, pageSize: 10}));
  };
  return func;
}

export function clickParticipatingResourcesSearchFilter(filter) {
  const func = function func(dispatch) {
    dispatch(clickSearchFilterSuccess(filter));
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
      dispatch(switchSize({pageSize: pageInfo.pageSize ? pageInfo.pageSize : 10}));
  };
  return func;
}