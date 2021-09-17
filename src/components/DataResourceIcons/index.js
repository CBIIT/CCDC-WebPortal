import React from 'react';
import PropTypes from 'prop-types';
import drPGDI from '../../assets/img/dr_PGDI.png';
import drSTJUDE from '../../assets/img/dr_STJUDE.png';
import drPEDC from '../../assets/img/dr_PEDC.png';

const DataResourceIcons = ({
  participatingResource
}) => {
  if (participatingResource === "PGDI") {
    return <img src={drPGDI} alt={participatingResource} />;
  }
  if (participatingResource === "PEDC") {
    return <img src={drPEDC} alt={participatingResource} />;
  }
  if (participatingResource === "STJUDE") {
    return <img src={drSTJUDE} alt={participatingResource} />;
  }
  return <img src={drPEDC} alt={participatingResource} />;
};

DataResourceIcons.propTypes = {
  participatingResource: PropTypes.string.isRequired
};

export default DataResourceIcons;
