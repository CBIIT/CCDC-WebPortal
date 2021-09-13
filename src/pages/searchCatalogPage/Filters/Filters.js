import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Accordion from '../../../components/Accordion';
import './Filters.css';

const Filters = ({
  searchFilters,
  onLoadSearchFilters
}) => {
  useEffect(() => {
      if (Object.keys(searchFilters).length === 0) {
          onLoadSearchFilters().catch(error => {
              console.log(`Loading search catalog page filters failed ${error}`);
          });
      }
  }, []);

  return (
    <>
      <div className="filterSummary">
        <div className="advancedSearchBox">
          <button type="button" className="advancedSearchButton btn btn-outline-secondary">
            <span><Link to="/advancedsearch">Advanced Search</Link></span>
            <i className="fa fa-arrow-right" />
          </button>
        </div>
      </div>
      <div className="resourceFilterSection">
        <div className="filterBlock">
          <Accordion fields={["Resource"]} />
        </div>
      </div>
      <div className="filterSection">
        <div className="filterLabel">
          <span>Research Area</span>
        </div>
        <div className="filterBlock">
          <Accordion fields={["Case Disease Diagnosis", "Case Treatment Administered", "Project Anatomic Site Studied", "Project Cancer Studied"]} />
        </div>
      </div>
      <div className="filterSection">
        <div className="filterLabel">
          <span>Biospecimen</span>
        </div>
        <div className="filterBlock">
          <Accordion fields={["Sample Assay Method", "Sample Anatomic Site", "Sample Composition Type"]} />
        </div>
      </div>
      <div className="filterSection">
        <div className="filterLabel">
          <span>Case Demographic</span>
        </div>
        <div className="filterBlock">
          <Accordion fields={["Case Age at Diagnosis", "Case Ethnicity", "Case Race", "Case Sex at Birth"]} />
        </div>
      </div>
    </>
  );
};

Filters.propTypes = {
  searchFilters: PropTypes.object.isRequired,
  onLoadSearchFilters: PropTypes.func.isRequired,
};

export default Filters;