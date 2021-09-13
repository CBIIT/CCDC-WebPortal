import React from 'react';
import SearchBox from './SearchBox';
import SelectionBubble from './SelectionBubble';
import ExportButton from './ExportButton';
import SwitchView from './SwitchView';
import Sorting from './Sorting';
import PageInfo from './PageInfo';
import Filters from './Filters';
import SearchResult from './SearchResult';
import './searchCatalogPage.css';

const SearchCatalogPage = () => {
  return (
    <>
      <div className="searchBarContainer">
        <div className="searchBarArea">
          <div className="searchBarLabel">Search Results</div>
          <div className="searchBoxContainer">
            <div className="searchBoxArea">
              <SearchBox />
            </div>
            <div className="selectionBubbleArea">
              <SelectionBubble />
            </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCatalogPage;