import { handleResponse, handleError } from "./apiUtils";

const baseUrl = `${process.env.REACT_APP_API_URL}/service/datasets`;

export function getSearchFilters() {
  return fetch(`${baseUrl}/filters`)
    .then(handleResponse)
    .catch(handleError);
}

export function getAdvancedSearchFilters() {
  return fetch(`${baseUrl}/advancedFilters`)
    .then(handleResponse)
    .catch(handleError);
}

export default getSearchFilters;