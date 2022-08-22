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

  .filterCheckBox {
    position: relative;
    cursor: pointer;
    appearance: none;
    margin-top: 4px;
    &:before {
      content: "";
      display: block;
      width: 1em;
      height: 1em;
      top: 0;
      left: 0;
      border: 2px solid #004187;
      background-color: white;
    }
    &:checked:before {
      content: "";
      display: block;
      width: 1em;
      height: 1em;
      top: 0;
      left: 0;
      background-color: #1E80EF;
    }
    &:checked:after {
      content: "";
      display: block;
      width: 5px;
      height: 9px;
      border: solid white;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      position: absolute;
      top: 2px;
      left: 6px;
    }
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
            <input className="filterCheckBox" onClick={handleResourceClick} type="checkbox" value={item.data_resource_id} checked={checked} readOnly />
            <SearchableOption title={`${item.resource_name} , ${item.resource_type}`} onClick={handleResourceClick}>
              {item.data_resource_id}
            </SearchableOption>
          </>
        )
        : (
          <>
            <input className="filterCheckBox checkbox-disabled" type="checkbox" value={item.data_resource_id} checked={checked} disabled="disabled" />
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