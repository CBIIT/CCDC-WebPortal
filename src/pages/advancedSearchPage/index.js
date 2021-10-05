import React, {useState} from "react";
import { Link } from "react-router-dom";
import {InputGroup, FormControl} from 'react-bootstrap';
import AdvancedFilters from './advancedFilters';
import './advancedSearchPage.css';

const AdvancedSearchPage = () => {
  const [localText, setLocalText] = useState("");

  const handleTextInputChange = (event) => {
    const text = event.target.value;
    setLocalText(text);
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (localText.trim() !== "") {
        handleSubmit();
      }
    }
  };

  return (
    <>
      <div className="advancedSearchBarContainer">
        <div className="advancedSearchBarArea">
          <div className="advancedSearchBarLabel">Advanced Search</div>
        </div>
      </div>
      <div className="advancedSearchCatalogContainer">
        <div className="advancedSearchArea">
          <div className="searchBoxArea">
            <InputGroup className="advancedSearchInputBox">
              <FormControl
                placeholder="Search the Catalog"
                aria-label="Search the Catalog"
                aria-describedby="basic-addon"
                value={localText}
                onChange={(e) => handleTextInputChange(e)}
                onKeyPress={(e) => handleKeyPress(e)}
              />
            </InputGroup>
          </div>
          <div className="advancedSearchFiltersContainer">
            <AdvancedFilters />
          </div>
          <div className="advancedSearchSubmitBox">
            <Link to="/search">
              <button type="button" className="advancedSearchSubmitButton btn btn-outline-secondary">
                <span>Submit</span>
                <i className="fa fa-arrow-right" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

  export default AdvancedSearchPage;