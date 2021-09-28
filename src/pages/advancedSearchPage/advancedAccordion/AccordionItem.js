import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OptionContainer = styled.div`
  display: flex;
  padding: 5px 0 5px 10px;
  
  :nth-child(odd) {
    background-color: lightgray;
  }

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

const AccordionItem = ({
  name, value, itemClick, checked,
}) => {
  const handleItemClick = () => {
    itemClick({
      name,
      value,
    });
  };

  return (
    <OptionContainer>
      <input className="form-check-input" onClick={handleItemClick} type="checkbox" value={value} checked={checked} readOnly />
      <span id="inputGroup-sizing-sm">{value}</span>
    </OptionContainer>
  );
};

AccordionItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  itemClick: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default AccordionItem;