import React from 'react';
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
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

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const replaceQueryStr = (query, filter) => {
  let str = "";
  if (filter.name === "resource_type") {
    const tmp = query.get("resource_type") ? query.get("resource_type").split("|") : [];
    const idx = tmp.indexOf(filter.value);
    if (idx > -1) {
      tmp.splice(idx, 1);
    } else {
      tmp.push(filter.value);
    }
    if (tmp.length > 0) {
      str += `&resource_type=${tmp.join("|")}`;
    }
    if (query.get("data_content_type")) {
      str += `&data_content_type=${query.get("data_content_type")}`;
    }
  }
  if (filter.name === "data_content_type") {
    const tmp = query.get("data_content_type") ? query.get("data_content_type").split("|") : [];
    const idx = tmp.indexOf(filter.value);
    if (idx > -1) {
      tmp.splice(idx, 1);
    } else {
      tmp.push(filter.value);
    }
    if (query.get("resource_type")) {
      str += `&resource_type=${query.get("resource_type")}`;
    }
    if (tmp.length > 0) {
      str += `&data_content_type=${tmp.join("|")}`;
    }
  }
  if (query.get("search_text")) {
    str += `&search_text=${query.get("search_text")}`;
  }
  str += "&page=1";
  if (query.get("pageSize")) {
    str += `&pageSize=${query.get("pageSize")}`;
  }
  return str.substring(1);
};

const AccordionItem = ({
  name, item, itemClick, checked, displayCount,
}) => {
  const query = useQuery();
  const navigate = useNavigate();

  const handleItemClick = () => {
    const value = item.name;
    const field = name.toLowerCase().replaceAll(' ', '_');
    const filter = {
      name: field,
      value,
    };
    const queryStr = replaceQueryStr(query, filter);
    navigate(`/participatingresources?${queryStr}`);
    itemClick(filter);
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