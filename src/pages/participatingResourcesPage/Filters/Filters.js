import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Accordion from '../../../components/Accordion';

const FilterSection = styled.div`
  padding-top: 5px;
`;

const FilterLabel = styled.div`
  background-color: #f7f8fa;
  margin: 0 5px;
  padding: 10px;
  color: #245284;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 1.4rem;

  span {
    font-size: 21px;
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
        <span>Research Description</span>
      </FilterLabel>
      <FilterBlock>
        <Accordion domain="dataresource" fields={["Data Resource Type", "Resource Data Content Type"]} />
      </FilterBlock>
    </FilterSection>
  );
};

Filters.propTypes = {
  searchFilters: PropTypes.object.isRequired,
  onLoadSearchFilters: PropTypes.func.isRequired,
};

export default Filters;