import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CheckBoxItem = ({
  item, itemClick
}) => {
  const [checked, setChecked] = useState(false);

  const handleItemClick = (e) => {
    setChecked(!checked);
    itemClick({name: item.name, k: item.k, v: item.v}, e);
  };

  return (
    <div onClick={handleItemClick} className="form-check" aria-hidden="true">
      <input className="form-check-input" type="checkbox" disabled="true" checked={checked} />
      {item.name}
    </div>
  );
};

CheckBoxItem.propTypes = {
  item: PropTypes.object.isRequired,
  itemClick: PropTypes.func.isRequired,
};

export default CheckBoxItem;