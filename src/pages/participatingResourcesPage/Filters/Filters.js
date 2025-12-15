import React, { useEffect } from 'react';
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Accordion from '../../../components/Accordion';
import clearAllIcon from '../../../assets/img/clearAllIcon.svg';

const FilterSection = styled.div`
  padding-top: 5px;
  border-top: 3px solid #c3d5e0;
`;

const FilterLabel = styled.div`
  position: relative;
  background-color: #f7f8fa;
  margin: 0 5px;
  padding: 5px 10px 5px 10px;
  color: #004187;
  font-weight: 900;
  font-size: 1.4rem;

  h3 {
    font-size: 21px;
    color: #004187;
    font-weight: 900;
    line-height: 33px;
    margin-bottom: 0;
  }

  .clearAllButton {
    position: absolute;
    width: 18px;
    height: 18px;
    right: 10px;
    top: 5px;
    border: 0;
    padding: 0;
    background-color: transparent;
  }

  .clearAllButton:hover {
    width: 19px;
    height: 19px;
    cursor: pointer;
  }

  .clearAllButton img {
    padding-bottom: 4px;
  }
`;

const FilterBlock = styled.div`
  background-color: #f7f8fa;
  margin: 0 5px;
`;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const replaceResourceFilter = (query) => {
  let str = "";
  str += "&page=1";
  if (query.get("pageSize")) {
    str += `&pageSize=${query.get("pageSize")}`;
  }
  return str;
};

const Filters = ({
  searchFilters,
  onLoadSearchFilters
}) => {
  const query = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(searchFilters).length === 0) {
      onLoadSearchFilters().catch(error => {
        throw new Error(`Loading participating resources page filters failed ${error}`);
      });
    }
  }, []);

  const handleResourceClick = (filter) => {
    const queryStr = replaceResourceFilter(query, filter);
    navigate(`/participatingresources?${queryStr}`);
  };

  return (
    <FilterSection>
      <FilterLabel>
        <h3>Resource Filter</h3>
        <button type="button" className="clearAllButton" onClick={() => handleResourceClick()}>
            <img src={clearAllIcon} alt="clear-all" />
        </button>
      </FilterLabel>
      <FilterBlock>
        <Accordion domain="dataresource" fields={["Resource Type", "Data Content Type"]} />
      </FilterBlock>
    </FilterSection>
  );
};

Filters.propTypes = {
  searchFilters: PropTypes.object.isRequired,
  onLoadSearchFilters: PropTypes.func.isRequired,
};

export default Filters;