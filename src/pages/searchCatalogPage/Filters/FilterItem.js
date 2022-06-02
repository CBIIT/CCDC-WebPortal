import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OptionContainer = styled.div`
  display: flex;
  padding: 5px 0 5px 10px;
  
  :nth-child(6n+1) {
    background-color: #e9e9e9;
  }

  :nth-child(6n+3) {
    background-color: #d6e6f3;
  }

  :nth-child(6n+5) {
    background-color: #e9e2bc;
  }

  .form-check-input {
    border-radius: 0;
    border: 2px solid #004187;
    margin-top: 0.3em;
    margin-left: 2px;
  }

  .checkbox-disabled {
    border: 2px solid gray;
  }
`;

const SearchableOption = styled.span`
  padding-left: 8px;
  font-weight: bold;
  color: #004187;
  font-size: 17px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const OptionLabel = styled.span`
  color: lightgray;
  padding-left: 8px;
  font-weight: bold;
  font-size: 17px;
`;

const FilterItem = ({
  item, checked, highlight, onSourceClick,
}) => {
  const handleResourceClick = () => {
    onSourceClick(item.data_resource_id);
  };

  return (
    <OptionContainer>
      {
        highlight ? (
          <>
            <input className="form-check-input" onClick={handleResourceClick} type="checkbox" value={item.data_resource_id} checked={checked} readOnly />
            <SearchableOption title={`${item.resource_name} , ${item.resource_type}`} onClick={handleResourceClick}>
              {item.data_resource_id}
            </SearchableOption>
          </>
        )
        : (
          <>
            <input className="form-check-input checkbox-disabled" type="checkbox" value={item.data_resource_id} checked={checked} disabled="disabled" />
            <OptionLabel title={`${item.resource_name} , ${item.resource_type}`}>
              {item.data_resource_id}
            </OptionLabel>
          </>
        )
      }
    </OptionContainer>
  );
};

FilterItem.propTypes = {
  item: PropTypes.object.isRequired,
  checked: PropTypes.bool.isRequired,
  highlight: PropTypes.bool.isRequired,
  onSourceClick: PropTypes.func.isRequired,
};

export default FilterItem;