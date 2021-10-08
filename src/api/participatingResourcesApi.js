import { handleResponse, handleError } from "./apiUtils";

const baseUrl = `${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : ''}/service/dataresources`;

export function getLandingParticipatingResources() {
  return fetch(`${baseUrl}/landing`)
    .then(handleResponse)
    .catch(handleError);
}

export default getLandingParticipatingResources;