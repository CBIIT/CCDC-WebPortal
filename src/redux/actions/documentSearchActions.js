import * as types from "./actionTypes";
import * as documentSearchApi from "../../api/documentSearchApi";

export function loadDocumentSearchResultsSuccess(searchResults) {
  return { type: types.LOAD_DOCUMENT_SEARCH_RESULTS_SUCCESS, searchResults };
}

export function putSearchKeyword(searchText) {
  return { type: types.PUT_SEARCH_KEYWORD, searchText };
}

export function switchPage(pageInfo) {
  return { type: types.SWITCH_PAGE, pageInfo};
}

export function startDocumentSearch(searchKeyword) {
  const func = function func(dispatch, getState) {
      dispatch(putSearchKeyword(searchKeyword));
      dispatch(switchPage({page: 1, pageSize: 10, total: 0}));
      const { documentSearch } = getState();
      const body = {keyword: documentSearch.keyword, pageInfo: documentSearch.pageInfo};
      return documentSearchApi.searchDocument(body)
      .then(searchResults => {
        dispatch(loadDocumentSearchResultsSuccess(searchResults.data));
      })
      .catch(error => {
          throw error;
      });
  };
  return func;
}

export function pageSelect(pageInfo) {
  const func = function func(dispatch, getState) {
      dispatch(switchPage(pageInfo));
      const { documentSearch } = getState();
      const body = {keyword: documentSearch.keyword, pageInfo: documentSearch.pageInfo};
      return documentSearchApi.searchDocument(body)
      .then(searchResults => {
        dispatch(loadDocumentSearchResultsSuccess(searchResults.data));
      })
      .catch(error => {
          throw error;
      });
  };
  return func;
}