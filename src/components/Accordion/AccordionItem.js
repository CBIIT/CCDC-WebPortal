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
  padding-left: 8px;
  // line-height: 18px;
`;

const OptionCount = styled.span`
  color: #046ab2;
  width: 20px;
  text-align: right;
  font-weight: bold;
`;

const AccordionItem = ({
  name, item, itemClick, checked, displayCount,
}) => {
  const handleItemClick = () => {
    const value = item.name;
    const field = name.toLowerCase().replaceAll(' ', '_');
    itemClick({
      name: field,
      value,
    });
  };

  return (
    <OptionContainer>
      <input className="form-check-input" onClick={handleItemClick} type="checkbox" value={item.name} checked={checked} readOnly />
      <OptionLabel title={item.label ? item.label : ""}>
        {item.name}
      </OptionLabel>
      {
        displayCount && (
          <OptionCount>
            {item.count === -1 ? "" : item.count}
          </OptionCount>
        )
      }
    </OptionContainer>
  );
};

AccordionItem.propTypes = {
  name: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  itemClick: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  displayCount: PropTypes.bool.isRequired,
};

export default AccordionItem;