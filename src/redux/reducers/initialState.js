export default {
    participatingResources: {
      searchFilters: {
      },
      landing: [],
      searchCriteria: {
        facet_filters: {},
        pageInfo: {
          page: 1,
          pageSize: 10,
        }
      },
      searchResults: [],
      detail: {},
      datasets: [],
    },
    datasets: {
      searchCriteria: {
        search_text: "",
        resources_filter: [],
        pageInfo: {
            page: 1,
            pageSize: 10,
            total: 0,
        },
        sort: {
          name: "Dataset",
          k: "dataset_name.raw",
          v: "asc"
        }
      },
      searchResults: [],
      searchSourceResults: "all",
      resourcesList: [],
      viewType: "card",
      details: {},
    },
    documentSearch: {
      keyword: "",
      results: [],
      pageInfo: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
    },
    application: {
      softwareVersion: "",
      siteDataUpdate: "",
      widgetUpdates: [],
      siteUpdates: [],
    },
};
