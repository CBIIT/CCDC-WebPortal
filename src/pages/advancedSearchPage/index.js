import React from "react";
import { Link } from "react-router-dom";
import AdvancedFilters from './advancedFilters';
import './advancedSearchPage.css';

const AdvancedSearchPage = () => {
    return (
      <>
        <div className="advancedSearchBarContainer">
          <div className="advancedSearchBarArea">
            <div className="advancedSearchBarLabel">Advanced Search</div>
          </div>
        </div>
        <div className="advancedSearchCatalogContainer">
          <div className="advancedSearchArea">
            <div className="advancedSearchFiltersContainer">
              <AdvancedFilters />
            </div>
          </div>
          <div className="space50" />
          <div className="advancedSearchSubmitBox">
            <Link to="/search">
              <button type="button" className="advancedSearchSubmitButton btn btn-outline-secondary">
                <span>Submit</span>
                <i className="fa fa-arrow-right" />
              </button>
            </Link>
          </div>
          <div className="space100" />
        </div>
      </>
    );
  };

  export default AdvancedSearchPage;