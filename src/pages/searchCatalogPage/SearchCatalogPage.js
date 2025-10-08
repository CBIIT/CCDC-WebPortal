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
  if (query.get("filterByResource")) {
    str += `&filterByResource=${query.get("filterByResource")}`;
  }
  str += "&page=1";
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

const replaceResourceFilter = (query, filter) => {
  let str = "";
  if (query.get("search_text")) {
    str += `&search_text=${query.get("search_text")}`;
  }
  if (filter !== "") {
    const tmp = query.get("filterByResource") ? query.get("filterByResource").split("|") : [];
    const idx = tmp.indexOf(filter);
    if (idx > -1) {
      tmp.splice(idx, 1);
    } else {
      tmp.push(filter);
    }
    if (tmp.length > 0) {
      str += `&filterByResource=${tmp.join("|")}`;
    }
  }
  str += "&page=1";
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
  searchKeyword,
  resourceFilters,
  viewType,
  onLoadFromUrlQuery,
  onStartFullTextSearch,
  onBubbleSearchTextRemoveClick,
  onBubbleResourcesRemoveClick,
}) => {
  const query = useQuery();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchTerm = query.get("search_text") ? query.get("search_text").trim() : "";
  const [searchText, setSearchText] = useState(searchTerm);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const options = {};
    if (query.get("page")) {
      options.page = parseInt(query.get("page").trim(), 10);
    }
    if (query.get("filterByResource")) {
      options.filterByResource = query.get("filterByResource").trim().split("|");
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

  const handleBubbleSearchTextRemoveClick = () => {
    setSearchText("");
    const queryStr = replaceQueryStr(query, "");
    navigate(`/search?${queryStr}`);
    onBubbleSearchTextRemoveClick();
  };

  const handleBubbleResourcesRemoveClick = () => {
    const queryStr = replaceResourceFilter(query, "");
    navigate(`/search?${queryStr}`);
    onBubbleResourcesRemoveClick();
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

  return (
    <>
      <div id="top" className="searchBarContainer">
        <div className="searchBarArea">
          <div className="searchBarLabel">
            <h1 style={{ fontSize: "42px", fontWeight: "bold"}}>
              Search Results
            </h1>
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
                        Searches will return both full and partial word results (i.e. leuk will return results for leukemia).
                      </li>
                      <li>
                        If you search multiple terms (i.e. lymphocytic survivors) the search results will return sources that contain all the specified terms (AND Boolean operator).
                      </li>
                      <li>
                        Results can be filtered by Participating Resource by checking a resource in the Resource column.  Selecting multiple Resources will filter as an OR Boolean operator.
                      </li>
                      <li>
                        Anatomical site searches leverage the NCI Thesaurus to display Case Tumor Site synonym matches. For example, a search for ‘eye’ will also return results for ‘orbit’.
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
              searchKeyword={searchKeyword}
              resourceFilters={resourceFilters}
              handleBubbleSearchTextRemoveClick={handleBubbleSearchTextRemoveClick}
              handleBubbleResourcesRemoveClick={handleBubbleResourcesRemoveClick}
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
            <div className={viewType === "card" ? "searchDisplayOptionsRow" : "searchDisplayOptionsRowTable"}>
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
  searchKeyword: PropTypes.string.isRequired,
  resourceFilters: PropTypes.array.isRequired,
  viewType: PropTypes.string.isRequired,
  onLoadFromUrlQuery: PropTypes.func.isRequired,
  onStartFullTextSearch: PropTypes.func.isRequired,
  onBubbleSearchTextRemoveClick: PropTypes.func.isRequired,
  onBubbleResourcesRemoveClick: PropTypes.func.isRequired,
};

export default SearchCatalogPage;