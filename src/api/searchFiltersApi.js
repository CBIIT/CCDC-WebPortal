import { handleResponse, handleError } from "./apiUtils";

const baseUrl = `${process.env.REACT_APP_API_URL}/service/dataset`;

export function getSearchFilters() {
  return fetch(`${baseUrl}/filters`)
    .then(handleResponse)
    .catch(handleError);
}

export default getSearchFilters;