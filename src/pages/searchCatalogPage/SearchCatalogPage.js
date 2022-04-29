import React, { useState, useEffect } from 'react';
import {
  useLocation,
  useNavigate,
  useSearchParams,
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

const replaceQueryStr = (query, searchText) => {
  let str = "";
  if (searchText.trim() !== "") {
    str += `&search_text=${searchText.trim()}`;
  }
  if (query.get("page")) {
    str += `&page=${query.get("page")}`;
  }
  if (query.get("pageSize")) {
    str += `&pageSize=${query.get("pageSize")}`;
  }
  if (query.get("sortBy")) {
    str += `&sortBy=${query.get("sortBy")}`;
  }
  if (query.get("sortOrder")) {
    str += `&sortOrder=${query.get("sortOrder")}`;
  }
  if (query.get("viewType")) {
    str += `&viewType=${query.get("viewType")}`;
  }
  return str.substring(1);
};

const SearchCatalogPage = ({
  searchCriteria,
  viewType,
  onLoadFromUrlQuery,
  onStartFullTextSearch,
  onBubbleRemoveClick,
}) => {
  const query = useQuery();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchTerm = query.get("search_text") ? query.get("search_text").trim() : "";
  const [searchText, setSearchText] = useState(searchTerm);

  useEffect(() => {
    const options = {};
    if (query.get("page")) {
      options.page = parseInt(query.get("page").trim(), 10);
    }
    if (query.get("pageSize")) {
      options.pageSize = parseInt(query.get("pageSize").trim(), 10);
    }
    if (query.get("sortBy")) {
      options.sortBy = query.get("sortBy").trim();
    }
    if (query.get("sortOrder")) {
      options.sortOrder = query.get("sortOrder").trim();
    }
    if (query.get("viewType")) {
      options.viewType = query.get("viewType").trim();
    }
    onLoadFromUrlQuery(searchTerm, options).catch(error => {
        throw new Error(`Loading search from url query failed: ${error}`);
      });
  }, [searchParams]);

  const handleBubbleRemoveClick = () => {
    setSearchText("");
    const queryStr = replaceQueryStr(query, "");
    navigate(`/search?${queryStr}`);
    onBubbleRemoveClick({field: "search_text", value: ""});
  };

  const handleSearchBoxKeyPress = () => {
    const queryStr = replaceQueryStr(query, searchText);
    navigate(`/search?${queryStr}`);
    onStartFullTextSearch(searchText);
  };

  const handleSearchSubmit = () => {
    const queryStr = replaceQueryStr(query, searchText);
    navigate(`/search?${queryStr}`);
    onStartFullTextSearch(searchText);
  };

  const handleSearchTextInputChange = (keyword) => {
    setSearchText(keyword);
  };

  const handleSourceClick = (event) => {
    const text = event.target.textContent;
    setSearchText(text);
    const queryStr = replaceQueryStr(query, text);
    navigate(`/search?${queryStr}`);
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
};

export default SearchCatalogPage;