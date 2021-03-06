import { handleResponse, handleError } from "./apiUtils";

const baseUrl = `${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : ''}/service/application`;

export function getApplicationVersionInfo() {
  return fetch(`${baseUrl}/version`)
    .then(handleResponse)
    .catch(handleError);
}

export default getApplicationVersionInfo;