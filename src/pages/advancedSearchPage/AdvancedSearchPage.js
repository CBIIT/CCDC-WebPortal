import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import {InputGroup, FormControl} from 'react-bootstrap';
import AdvancedFilters from './advancedFilters';
import './advancedSearchPage.css';

const AdvancedSearchPage = ({
  advancedFilters,
  onClearAdvancedSearchSelection,
}) => {
  const [localText, setLocalText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onClearAdvancedSearchSelection();
  }, []);

  const handleTextInputChange = (event) => {
    const text = event.target.value;
    setLocalText(text);
  };

  const handleSubmit = () => {
    let queryStr = localText.trim() !== "" ? `search_text=${localText}` : "";
    const filters = Object.keys(advancedFilters).map((k) => {
     return `${k}=${advancedFilters[k].join("|")}`;
    });
    if (queryStr === "" && filters.length > 0) {
      queryStr = `?${filters.join("&")}`;
    } else if (queryStr !== "" && filters.length > 0) {
      queryStr = `?${queryStr}&${filters.join("&")}`;
    } else if (queryStr !== "" && filters.length === 0) {
      queryStr = `?${queryStr}`;
    }
    navigate(`/search${queryStr}`);
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
              />
            </InputGroup>
          </div>
          <div className="advancedSearchFiltersContainer">
            <AdvancedFilters />
          </div>
          <div className="advancedSearchSubmitBox">
            <button type="button" className="advancedSearchSubmitButton btn btn-outline-secondary" onClick={handleSubmit}>
              <span>Submit</span>
              <i className="fa fa-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

AdvancedSearchPage.propTypes = {
  advancedFilters: PropTypes.object.isRequired,
  onClearAdvancedSearchSelection: PropTypes.func.isRequired,
};

export default AdvancedSearchPage;