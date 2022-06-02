import React from 'react';
import PropTypes from 'prop-types';

const SelectionItem = ({
  item, itemClick
}) => {
  const handleItemClick = (e) => {
    itemClick({name: item.name, k: item.k, v: item.v}, e);
  };

  return (
    <li onClick={handleItemClick} aria-hidden="true">
      <span>{item.name}</span>
    </li>
  );
};

SelectionItem.propTypes = {
  item: PropTypes.object.isRequired,
  itemClick: PropTypes.func.isRequired,
};

export default SelectionItem;