import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Accordion from '../advancedAccordion';
import './advancedFilters.css';

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

  const OptionContainer = styled.div`
  display: flex;
  padding: 5px 0 5px 10px;

  .form-check-input {
    border-radius: 0;
    border: 2px solid #004187;
  }

  span {
    width: 80%;
    color: #004187;
    padding-left: 5px;
  }
`;

  return (
    <>
      {/* <div className="advancedFilterSection">
        <div className="advancedFilterLabel">
          <span>Research Area</span>
        </div>
        <div className="advancedFilterBlock">
          <Accordion fields={["Case Disease Diagnosis", "Case Treatment Administered", "Project Anatomic Site Studied", "Project Cancer Studied"]} />
        </div>
      </div> */}
      <div className="advancedFilterSection">
        <div className="advancedFilterLabel">
          <span>Research Area</span>
        </div>
        <div className="advancedFilterBlock">
          <Accordion fields={["Project Cancer Studied"]} />
        </div>
        <div className="advancedFilterBlock2">
          <Accordion fields={["Case Disease Diagnosis"]} />
        </div>
        <div className="space20" />
        <div className="advancedFilterBlock">
          <Accordion fields={["Project Anatomic Site Studied"]} />
        </div>
        <div className="advancedFilterBlock2">
          <Accordion fields={["Case Treatment Administered"]} />
        </div>
      </div>
      <div className="advancedFilterSection">
        <div className="advancedFilterLabel">
          <span>Biospecimen</span>
        </div>
        <div className="advancedFilterBlock">
          <Accordion fields={["Sample Anatomic Site"]} />
        </div>
        <div className="advancedFilterBlock2">
          <Accordion fields={["Sample Composition Type"]} />
        </div>
        <div className="space20" />
        <div className="advancedFilterBlock">
          <Accordion fields={["Sample Assay Method"]} />
        </div>
      </div>
      <div className="advancedFilterSection">
        <div className="advancedFilterLabel">
          <span>Case Demographic</span>
        </div>
        <div className="advancedFilterBlock4-1">
          <Accordion fields={["Case Sex at Birth"]} />
        </div>
        <div className="advancedFilterBlock4-2">
          <Accordion fields={["Case Race"]} />
        </div>
        <div className="advancedFilterBlock4-3">
          <Accordion fields={["Case Ethnicity"]} />
        </div>
        <div className="space50" />
        {/* <div className="advancedFilterBlock">
          <Accordion fields={["Case Age at Diagnosis"]} />
        </div> */}
        <div className="advancedFilterBlock">
          <span className="advancedFilterHeader">NUMBER OF CASES</span>
          <OptionContainer>
            <input className="form-check-input" type="checkbox" value readOnly />
            <span id="inputGroup-sizing-sm">0-10 Cases</span>
          </OptionContainer>
          <OptionContainer>
            <input className="form-check-input" type="checkbox" value readOnly />
            <span id="inputGroup-sizing-sm">10-100 Cases</span>
          </OptionContainer>
          <OptionContainer>
            <input className="form-check-input" type="checkbox" value readOnly />
            <span id="inputGroup-sizing-sm">100-1000 Cases</span>
          </OptionContainer>
          <OptionContainer>
            <input className="form-check-input" type="checkbox" value readOnly />
            <span id="inputGroup-sizing-sm">&gt; 1000 Cases</span>
          </OptionContainer>
        </div>
        <div className="advancedFilterBlock4-5">
          <span className="advancedFilterHeader">Case Age at Diagnosis</span>
          <OptionContainer>
            <input className="form-check-input" type="checkbox" value readOnly />
            <span id="inputGroup-sizing-sm">0-1 Years</span>
          </OptionContainer>
          <OptionContainer>
            <input className="form-check-input" type="checkbox" value readOnly />
            <span id="inputGroup-sizing-sm">1-10 Years</span>
          </OptionContainer>
          <OptionContainer>
            <input className="form-check-input" type="checkbox" value readOnly />
            <span id="inputGroup-sizing-sm">10-20 Years</span>
          </OptionContainer>
          <OptionContainer>
            <input className="form-check-input" type="checkbox" value readOnly />
            <span id="inputGroup-sizing-sm">20-30 Years</span>
          </OptionContainer>
          <OptionContainer>
            <input className="form-check-input" type="checkbox" value readOnly />
            <span id="inputGroup-sizing-sm">30-39 Years</span>
          </OptionContainer>
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