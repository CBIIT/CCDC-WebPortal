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

const OptionLabel = styled.span`
  width: calc(100% - 50px);
  color: #004187;
  padding-left: 5px;
`;

const FilterItem = ({
  key, item, highlight
}) => {
  return (
    <OptionContainer key={key}>
      <OptionLabel title={`${item.resource_name} , ${item.resource_type}`} style={highlight ? {fontWeight: "bold", color: "#004187"} : {fontWeight: "normal", color: "lightgray"}}>
        {item.data_resource_id}
      </OptionLabel>
    </OptionContainer>
  );
};

FilterItem.propTypes = {
  key: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  highlight: PropTypes.bool.isRequired,
};

export default FilterItem;