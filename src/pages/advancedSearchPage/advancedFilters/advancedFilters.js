import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SelectionWithCheckBox from '../../../components/SelectionWithCheckBox';
import './advancedFilters.css';

const OptionContainer = styled.div`
  display: flex;
  margin-top: 5px;
  
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

const Filters = ({
  advancedFilters,
  onLoadAdvancedSearchFilters
}) => {
  useEffect(() => {
    if (Object.keys(advancedFilters).length === 0) {
      onLoadAdvancedSearchFilters().catch(error => {
        throw new Error(`Loading advanced search page filters failed ${error}`);
      });
    }
  }, []);

  return (
    <>
      <div className="advancedFilterSection">
        <div className="advancedFilterLabel">
          <span>Research Area</span>
        </div>
        <div className="advancedFilterBlock">
          <SelectionWithCheckBox selectionLabel="Case Disease Diagnosis" />
        </div>
        <div className="advancedFilterBlock">
          <SelectionWithCheckBox selectionLabel="Case Tumor Site" />
          <SelectionWithCheckBox selectionLabel="Case Treatment Administered" />
        </div>
        <div className="advancedFilterBlock">
          <SelectionWithCheckBox selectionLabel="Case Treatment Outcome" />
        </div>
      </div>
      <div className="advancedFilterSection">
        <div className="advancedFilterLabel">
          <span>Sample Characteristic</span>
        </div>
        <div className="advancedFilterBlock">
          <SelectionWithCheckBox selectionLabel="Sample Anatomic Site" />
          <SelectionWithCheckBox selectionLabel="Sample Analyte Type" />
        </div>
        <div className="advancedFilterBlock">
          <SelectionWithCheckBox selectionLabel="Sample Assay Method" />
          <SelectionWithCheckBox selectionLabel="Sample Composition Type" />
        </div>
        <div className="advancedFilterBlock">
          <SelectionWithCheckBox selectionLabel="Sample Is Normal" />
        </div>
      </div>
      <div className="advancedFilterSection">
        <div className="advancedFilterLabel">
          <span>Case Demographic</span>
        </div>
        <div className="advancedFilterBlock">
          <SelectionWithCheckBox selectionLabel="Case Sex" />
          <SelectionWithCheckBox selectionLabel="Case Race" />
          <SelectionWithCheckBox selectionLabel="Case Ethnicity" />
        </div>
        <div className="advancedFilterBlock">
          <div className="advancedFilterArea">
            <span className="advancedFilterHeader">Case Age at Diagnosis</span>
            {
              Object.keys(advancedFilters).length > 0 ? advancedFilters["Case Age at Diagnosis"].map((item, idx) => {
                const key = `caad_${idx}`;
                return (
                  <OptionContainer key={key}>
                    <input className="form-check-input" type="checkbox" value readOnly />
                    <span id="inputGroup-sizing-sm">{item}</span>
                  </OptionContainer>
                );
              }) : ""
            }
          </div>
          <div className="advancedFilterArea">
            <span className="advancedFilterHeader">NUMBER OF CASES</span>
            {
              Object.keys(advancedFilters).length > 0 ? advancedFilters["Number of Cases"].map((item, idx) => {
                const key = `noc_${idx}`;
                return (
                  <OptionContainer key={key}>
                    <input className="form-check-input" type="checkbox" value readOnly />
                    <span id="inputGroup-sizing-sm">{item}</span>
                  </OptionContainer>
                );
              }) : ""
            }
          </div>
          <div className="advancedFilterArea">
            <span className="advancedFilterHeader">NUMBER OF SAMPLES</span>
            {
              Object.keys(advancedFilters).length > 0 ? advancedFilters["Number of Samples"].map((item, idx) => {
                const key = `nos_${idx}`;
                return (
                  <OptionContainer key={key}>
                    <input className="form-check-input" type="checkbox" value readOnly />
                    <span id="inputGroup-sizing-sm">{item}</span>
                  </OptionContainer>
                );
              }) : ""
            }
          </div>
        </div>
      </div>
    </>
  );
};

Filters.propTypes = {
  advancedFilters: PropTypes.object.isRequired,
  onLoadAdvancedSearchFilters: PropTypes.func.isRequired,
};

export default Filters;