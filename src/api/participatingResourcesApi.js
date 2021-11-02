import { handleResponse, handleError } from "./apiUtils";

const baseUrl = `${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : ''}/service/dataresources`;

export function getLandingParticipatingResources() {
  return fetch(`${baseUrl}/landing`)
    .then(handleResponse)
    .catch(handleError);
}

export function getSearchFilters() {
  return fetch(`${baseUrl}/filters`)
    .then(handleResponse)
    .catch(handleError);
}

export function searchParticipatingResources(body) {
  return fetch(`${baseUrl}/search`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }).then(handleResponse)
    .catch(handleError);
}

export function getDataresourceById(id) {
  return fetch(`${baseUrl}/${id}`)
    .then(handleResponse)
    .catch(handleError);
}

export function getDatasetsById(id) {
  return fetch(`${baseUrl}/${id}/datasets`)
    .then(handleResponse)
    .catch(handleError);
}

export default getLandingParticipatingResources;