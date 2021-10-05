import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SelectionOption = styled.li`
  padding: 10px;

  &:hover {
    background-color: #f3f8f8;
    cursor: pointer;
  }

  & input{
    margin-right: 10px;
  }
`;

const CheckBoxItem = ({
  item, itemClick
}) => {
  const [checked, setChecked] = useState(false);

  const handleItemClick = (e) => {
    setChecked(!checked);
    itemClick(item, e);
  };

  return (
    <SelectionOption onClick={handleItemClick} aria-hidden="true">
      <input type="checkbox" checked={checked} readOnly />
      {item}
    </SelectionOption>
  );
};

CheckBoxItem.propTypes = {
  item: PropTypes.string.isRequired,
  itemClick: PropTypes.func.isRequired,
};

export default CheckBoxItem;