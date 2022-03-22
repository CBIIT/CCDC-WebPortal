import React, { useState, useEffect } from 'react';
import {
  useLocation
} from "react-router-dom";
import { OverlayTrigger } from 'react-bootstrap';
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

const SearchCatalogPage = ({
  searchCriteria,
  viewType,
  onLoadFromUrlQuery,
  onStartFullTextSearch,
  onBubbleRemoveClick,
  onCleanUpSearchCriteria,
}) => {
  const query = useQuery();
  const paramText = query.get("search_text") ? query.get("search_text").trim() : "";
  const [searchText, setSearchText] = useState(paramText);

  useEffect(() => {
    onLoadFromUrlQuery(paramText, {}).catch(error => {
        throw new Error(`Loading search from url query failed: ${error}`);
      });
    return () => {
      onCleanUpSearchCriteria();
    };
  }, []);

  const handleBubbleRemoveClick = () => {
    setSearchText("");
    onBubbleRemoveClick({field: "search_text", value: ""});
  };

  const handleSearchBoxKeyPress = () => {
    onStartFullTextSearch(searchText);
  };

  const handleSearchSubmit = () => {
    onStartFullTextSearch(searchText);
  };

  const handleSearchTextInputChange = (keyword) => {
    setSearchText(keyword);
  };

  const handleSourceClick = (event) => {
    const text = event.target.textContent;
    setSearchText(text);
    onStartFullTextSearch(text);
  };

  return (
    <>
      <div id="top" className="searchBarContainer">
        <div className="searchBarArea">
          <div className="searchBarLabel">
            <span>
              Search Results
            </span>
            <div className="searchTooltip">
              <OverlayTrigger
                placement="right-start"
                overlay={
                  (
                  <div className="searchTooltipBox">
                    <p>
                      <strong>Search Rules</strong>
                      :
                    </p>
                    <ul>
                      <li>
                        A minimum of 3 character are needed for a term search.
                      </li>
                      <li>
                        Searches will return both full and partial word results (i.e. leuk will returns results for leukemia).
                      </li>
                      <li>
                        If you search multiple terms (i.e lymphocytic survivors) the search results will return sources that contain all the specified terms (AND Boolean operator).
                      </li>
                      <li>
                        Selecting a resource Source (i.e. Kids First) will automatically create a search for the selected source.
                      </li>
                    </ul>
                  </div>
                  )
                }
              >
                <button type="button" aria-label="searchTooltip" className="searchTooltipButton"><i className="fas fa-question-circle" /></button>
              </OverlayTrigger>
            </div>
          </div>
          <div className="searchBoxContainer">
            <SearchBox
              searchText={searchText}
              searchCriteria={searchCriteria}
              onBubbleRemoveClick={handleBubbleRemoveClick}
              onSearchBoxKeyPress={handleSearchBoxKeyPress}
              onSearchSubmit={handleSearchSubmit}
              onSearchTextInputChange={handleSearchTextInputChange}
            />
          </div>
        </div>
      </div>
      <div className="searchCatalogContainer">
        <div className="searchArea">
          <div className="searchFiltersContainer">
            <Filters onSourceClick={handleSourceClick} />
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
                {
                  viewType === "card" ? <Sorting /> : ""
                }
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
            <div className="space50" />
          </div>
        </div>
      </div>
    </>
  );
};

SearchCatalogPage.propTypes = {
  searchCriteria: PropTypes.string.isRequired,
  viewType: PropTypes.string.isRequired,
  onLoadFromUrlQuery: PropTypes.func.isRequired,
  onStartFullTextSearch: PropTypes.func.isRequired,
  onBubbleRemoveClick: PropTypes.func.isRequired,
  onCleanUpSearchCriteria: PropTypes.func.isRequired,
};

export default SearchCatalogPage;