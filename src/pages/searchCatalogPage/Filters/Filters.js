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
        throw new Error(`Loading search catalog page filters failed ${error}`);
      });
    }
  }, []);

  return (
    <>
      <div className="filterSummary">
        <div className="advancedSearchBox">
          {/* <button type="button" className="advancedSearchButton btn btn-outline-secondary">
            <span><Link to="/advancedsearch">Advanced Search</Link></span>
            <i className="fa fa-arrow-right" />
          </button> */}
          <Link to="/advancedsearch">
            <button type="button" className="advancedSearchButton btn btn-outline-secondary">
              <span>Advanced Search</span>
              <i className="fa fa-arrow-right" />
            </button>
          </Link>
        </div>
      </div>
      <div className="filterSection">
        <div className="filterLabel">
          <span>Resource</span>
        </div>
        <div className="filterBlock">
          <Accordion domain="dataset" fields={["Research Data Repository", "Program", "Catalog", "Registry"]} />
        </div>
      </div>
      <div className="filterSection">
        <div className="filterLabel">
          <span>Research Area</span>
        </div>
        <div className="filterBlock">
          <Accordion domain="dataset" fields={["Case Disease Diagnosis", "Case Tumor Site", "Case Treatment Administered"]} />
        </div>
      </div>
      <div className="filterSection">
        <div className="filterLabel">
          <span>Biospecimen</span>
        </div>
        <div className="filterBlock">
          <Accordion domain="dataset" fields={["Sample Assay Method", "Sample Analyte Type", "Sample Composition Type"]} />
        </div>
      </div>
      <div className="filterSection">
        <div className="filterLabel">
          <span>Case Demographic</span>
        </div>
        <div className="filterBlock">
          <Accordion domain="dataset" fields={["Case Age at Diagnosis", "Case Ethnicity", "Case Race", "Case Sex"]} />
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