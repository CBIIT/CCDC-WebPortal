import { handleResponse, handleError } from "./apiUtils";

const baseUrl = `${process.env.REACT_APP_API_URL}/service/dataresource`;

export function getLandingParticipatingResources() {
  return fetch(`${baseUrl}/landing`)
    .then(handleResponse)
    .catch(handleError);
}

export default getLandingParticipatingResources;