import { handleResponse, handleError } from "./apiUtils";

const baseUrl = `${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : ''}/service/application`;

export function getApplicationVersionInfo() {
  return fetch(`${baseUrl}/version`)
    .then(handleResponse)
    .catch(handleError);
}

export function getWidgetUpdates() {
  return fetch(`${baseUrl}/widgetupdate`)
    .then(handleResponse)
    .catch(handleError);
}

export function getSiteUpdates(body) {
  return fetch(`${baseUrl}/releasenotes`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }).then(handleResponse)
    .catch(handleError);
}

export function getGlossaryTerms(body) {
  return fetch(`${baseUrl}/glossaryTerms`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }).then(handleResponse)
    .catch(handleError);
}

export function getGlossaryTermsByFirstLetter(body) {
  return fetch(`${baseUrl}/glossaryTermsByFirstLetter`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }).then(handleResponse)
    .catch(handleError);
}

export function getGlossaryLetters() {
  return fetch(`${baseUrl}/glossaryLetters`)
    .then(handleResponse)
    .catch(handleError);
}

export default getApplicationVersionInfo;