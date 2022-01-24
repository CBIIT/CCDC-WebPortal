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
  }
`;

const SearchableOption = styled.span`
  padding-left: 5px;
  font-weight: bold;
  color: #004187;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

`;

const OptionLabel = styled.span`
  color: lightgray;
  padding-left: 5px;
  font-weight: normal;
`;

const FilterItem = ({
  item, highlight, onSourceClick
}) => {
  return (
    <OptionContainer>
      {
        highlight ? (
          <SearchableOption title={`${item.resource_name} , ${item.resource_type}`} onClick={onSourceClick}>
            {item.data_resource_id}
          </SearchableOption>
        )
        : (
          <OptionLabel title={`${item.resource_name} , ${item.resource_type}`}>
            {item.data_resource_id}
          </OptionLabel>
        )
      }
    </OptionContainer>
  );
};

FilterItem.propTypes = {
  item: PropTypes.object.isRequired,
  highlight: PropTypes.bool.isRequired,
  onSourceClick: PropTypes.func.isRequired,
};

export default FilterItem;