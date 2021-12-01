import React from 'react';
import PropTypes from 'prop-types';
import drDEFAULT from '../../assets/img/Default/Landing.svg';
import drDEFAULTList from '../../assets/img/Default/Resource.svg';
/*
import drCCSS from '../../assets/img/CCSS/Landing.svg';
import drCCSSList from '../../assets/img/CCSS/Resource.svg';
import drCGCI from '../../assets/img/CGCI/Landing.svg';
import drCGCIList from '../../assets/img/CGCI/Resource.svg';
import drHTAN from '../../assets/img/HTAN/Landing.svg';
import drHTANList from '../../assets/img/HTAN/Resource.svg';
import drPCDC from '../../assets/img/PCDC/Landing.svg';
import drPCDCList from '../../assets/img/PCDC/Resource.svg';
import drPEDC from '../../assets/img/PEDC/Landing.svg';
import drPEDCList from '../../assets/img/PEDC/Resource.svg';
import drPGDI from '../../assets/img/PGDI/Landing.svg';
import drPGDIList from '../../assets/img/PGDI/Resource.svg';
import drSTJUDE from '../../assets/img/STJUDE/Landing.svg';
import drSTJUDEList from '../../assets/img/STJUDE/Resource.svg';
import drUTAH from '../../assets/img/UTAH/Landing.svg';
import drUTAHList from '../../assets/img/UTAH/Resource.svg';
*/

const DataResourceIcons = ({
  participatingResource,
  type,
}) => {
  /*
  if (participatingResource === "CCSS") {
    return <img src={type === "gold" ? drCCSSList : drCCSS} alt={participatingResource} />;
  }
  if (participatingResource === "CGCI") {
    return <img src={type === "gold" ? drCGCIList : drCGCI} alt={participatingResource} />;
  }
  if (participatingResource === "HTAN") {
    return <img src={type === "gold" ? drHTANList : drHTAN} alt={participatingResource} />;
  }
  if (participatingResource === "PCDC") {
    return <img src={type === "gold" ? drPCDCList : drPCDC} alt={participatingResource} />;
  }
  if (participatingResource === "PEDC") {
    return <img src={type === "gold" ? drPEDCList : drPEDC} alt={participatingResource} />;
  }
  if (participatingResource === "PGDI") {
    return <img src={type === "gold" ? drPGDIList : drPGDI} alt={participatingResource} />;
  }
  if (participatingResource === "STJUDE") {
    return <img src={type === "gold" ? drSTJUDEList : drSTJUDE} alt={participatingResource} />;
  }
  if (participatingResource === "UTAH") {
    return <img src={type === "gold" ? drUTAHList : drUTAH} alt={participatingResource} />;
  }
  */
  return <img src={type === "gold" ? drDEFAULTList : drDEFAULT} alt={participatingResource} />;
};

DataResourceIcons.propTypes = {
  participatingResource: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default DataResourceIcons;
