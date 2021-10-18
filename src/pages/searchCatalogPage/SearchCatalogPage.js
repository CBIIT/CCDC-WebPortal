import React, { useEffect } from 'react';
import {
  useLocation
} from "react-router-dom";
import PropTypes from 'prop-types';
import SearchBox from './SearchBox';
import ExportButton from './ExportButton';
import SwitchView from './SwitchView';
import Sorting from './Sorting';
import PageInfo from './PageInfo';
import Filters from './Filters';
import SearchResult from './SearchResult';
import './searchCatalogPage.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const getFiltersFromQuery = (query) => {
  const filters = {};
  query.forEach((value, key) => {
    if (key === "search_text") {
      return;
    }
    filters[key] = value.split("|");
  });
  return filters;
};

const SearchCatalogPage = ({
  searchCriteria,
  onLoadFromUrlQuery,
}) => {
  const query = useQuery();
  const searchText = query.get("search_text") ? query.get("search_text").trim() : searchCriteria.search_text;
  const filters = getFiltersFromQuery(query);

  useEffect(() => {
    onLoadFromUrlQuery(searchText, filters).catch(error => {
        throw new Error(`Loading search from url query failed: ${error}`);
      });
  }, []);

  return (
    <>
      <div className="searchBarContainer">
        <div className="searchBarArea">
          <div className="searchBarLabel">Search Results</div>
          <div className="searchBoxContainer">
            <SearchBox searchText={searchText} />
          </div>
        </div>
      </div>
      <div className="searchCatalogContainer">
        <div className="searchArea">
          <div className="searchFiltersContainer">
            <Filters />
          </div>
          <div className="searchContentContainer">
            <div className="searchContentHeader">
              <div className="contentSwitchArea">
                <SwitchView />
              </div>
              <div className="exportArea">
                <ExportButton />
              </div>
            </div>
            <div className="searchDisplayOptionsRow">
              <div className="searchSortingArea">
                <Sorting />
              </div>
              <div className="contentPagingArea">
                <PageInfo />
              </div>
            </div>
            <div className="searchContent">
              <SearchResult />
            </div>
            <div className="searchContentFooter">
              <PageInfo />
            </div>
            <div className="space50" />
          </div>
        </div>
      </div>
    </>
  );
};

SearchCatalogPage.propTypes = {
  searchCriteria: PropTypes.object.isRequired,
  onLoadFromUrlQuery: PropTypes.func.isRequired,
};

export default SearchCatalogPage;