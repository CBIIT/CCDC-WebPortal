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
  onLoadAdvancedSearchFilters,
  onClickAdvancedSearchFilter,
}) => {
  useEffect(() => {
    if (Object.keys(advancedFilters).length === 0) {
      onLoadAdvancedSearchFilters().catch(error => {
        throw new Error(`Loading advanced search page filters failed ${error}`);
      });
    }
  }, []);

  const handleItemClick = (item) => {
    onClickAdvancedSearchFilter(item);
  };

  return (
    <>
      <div className="advancedFilterSection">
        <div className="advancedFilterLabel">
          <span>Research Area</span>
        </div>
        <div className="advancedFilterBlock">
          <SelectionWithCheckBox selectionLabel="Case Disease Diagnosis" selectionField="case_disease_diagnosis" />
        </div>
        <div className="advancedFilterBlock">
          <SelectionWithCheckBox selectionLabel="Case Tumor Site" selectionField="case_tumor_site" />
          <SelectionWithCheckBox selectionLabel="Case Treatment Administered" selectionField="case_treatment_administrered" />
        </div>
        <div className="advancedFilterBlock">
          <SelectionWithCheckBox selectionLabel="Case Treatment Outcome" selectionField="case_treatment_outcome" />
        </div>
      </div>
      <div className="advancedFilterSection">
        <div className="advancedFilterLabel">
          <span>Sample Characteristic</span>
        </div>
        <div className="advancedFilterBlock">
          <SelectionWithCheckBox selectionLabel="Sample Anatomic Site" selectionField="sample_anatomic_site" />
          <SelectionWithCheckBox selectionLabel="Sample Analyte Type" selectionField="sample_analyte_type" />
        </div>
        <div className="advancedFilterBlock">
          <SelectionWithCheckBox selectionLabel="Sample Assay Method" selectionField="sample_assay_method" />
          <SelectionWithCheckBox selectionLabel="Sample Composition Type" selectionField="sample_composition_type" />
        </div>
        <div className="advancedFilterBlock">
          <SelectionWithCheckBox selectionLabel="Sample Is Normal" selectionField="sample_is_normal" />
        </div>
      </div>
      <div className="advancedFilterSection">
        <div className="advancedFilterLabel">
          <span>Case Demographic</span>
        </div>
        <div className="advancedFilterBlock">
          <SelectionWithCheckBox selectionLabel="Case Sex" selectionField="case_sex" />
          <SelectionWithCheckBox selectionLabel="Case Race" selectionField="case_race" />
          <SelectionWithCheckBox selectionLabel="Case Ethnicity" selectionField="case_ethnicity" />
        </div>
        <div className="advancedFilterBlock">
          <div className="advancedFilterArea">
            <span className="advancedFilterHeader">Case Age at Diagnosis</span>
            {
              Object.keys(advancedFilters).length > 0 ? advancedFilters["Case Age at Diagnosis"].map((item, idx) => {
                const key = `caad_${idx}`;
                return (
                  <OptionContainer key={key}>
                    <input className="form-check-input" type="checkbox" value readOnly onClick={() => handleItemClick({name: "case_age_at_diagnosis", value: item})} />
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
                    <input className="form-check-input" type="checkbox" value readOnly onClick={() => handleItemClick({name: "number_of_cases", value: item})} />
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
                    <input className="form-check-input" type="checkbox" value readOnly onClick={() => handleItemClick({name: "number_of_samples", value: item})} />
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
  onClickAdvancedSearchFilter: PropTypes.func.isRequired,
};

export default Filters;