import { handleResponse, handleError } from "./apiUtils";

const baseUrl = `${process.env.REACT_APP_API_URL}/service/searchfilter`;

export function getSearchFilters() {
  return fetch(`${baseUrl}/search`)
    .then(handleResponse)
    .catch(handleError);
}

export default getSearchFilters;