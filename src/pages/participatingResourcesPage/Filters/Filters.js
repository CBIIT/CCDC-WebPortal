import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Accordion from '../../../components/Accordion';
import clearAllIcon from '../../../assets/img/clearAllIcon.svg';

const FilterSection = styled.div`
  padding-top: 5px;
  border-top: 3px solid #c3d5e0;
`;

const FilterLabel = styled.div`
  background-color: #f7f8fa;
  margin: 0 5px;
  padding: 5px 10px 5px 10px;
  color: #004187;
  font-weight: 900;
  font-size: 1.4rem;

  span {
    font-size: 21px;
  }

  .clearAllButtonContainer {
    width: 22px;
    height: 22px;
    margin-left: 40px;
  }

  .clearAllButton {
    width: 22px;
    height: 22px;
  }

  .clearAllButton:hover {
    width: 23px;
    height: 23px;
    cursor: pointer;
  }
`;

const FilterBlock = styled.div`
  background-color: #f7f8fa;
  margin: 0 5px;
`;

const Filters = ({
  searchFilters,
  onLoadSearchFilters
}) => {
  useEffect(() => {
    if (Object.keys(searchFilters).length === 0) {
      onLoadSearchFilters().catch(error => {
        throw new Error(`Loading participating resources page filters failed ${error}`);
      });
    }
  }, []);

  return (
    <FilterSection>
      <FilterLabel>
        <span>Resource Filter</span>
        <span className="clearAllButtonContainer">
            <img className="clearAllButton" src={clearAllIcon} alt="clear-all" />
        </span>
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