import { handleResponse, handleError } from "./apiUtils";

const baseUrl = `${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : ''}/service/datasets`;

export function searchCatalog(body) {
  return fetch(`${baseUrl}/search`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }).then(handleResponse)
    .catch(handleError);
}

export function getDatasetById(id) {
  return fetch(`${baseUrl}/${id}`)
    .then(handleResponse)
    .catch(handleError);
}

export default searchCatalog;