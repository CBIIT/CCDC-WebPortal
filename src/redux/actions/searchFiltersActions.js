import * as types from "./actionTypes";
import * as searchFiltersApi from "../../api/searchFiltersApi";

export function loadSearchFiltersSuccess(searchFilters) {
    return { type: types.LOAD_SEARCH_FILTERS_SUCCESS, searchFilters };
}

export function loadSearchFilters() {
    return function(dispatch) {
        return searchFiltersApi.getSearchFilters()
        .then(searchFilters => {
            dispatch(loadSearchFiltersSuccess(searchFilters.data));
        })
        .catch(error => {
            throw error;
        });
    };
}