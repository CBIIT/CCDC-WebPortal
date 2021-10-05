import { handleResponse, handleError } from "./apiUtils";

const baseUrl = `${process.env.REACT_APP_API_URL}/service/datasets`;

export function searchCatalog(body) {
  /*
  let todo = {
    search_text: "tumor",
    facet_filters: {
      "Resource": [
        "GDC",
        "PCDC"
      ]
    },
    pageInfo: {
        page: 2,
        pageSize: 10
    },
    sort: {
        k: "data_resource_id",
        v: "asc"
    }
  };
  */
  return fetch(`${baseUrl}/search`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }).then(handleResponse)
    .catch(handleError);
}

export default searchCatalog;