import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import FilterItem from './FilterItem';
import './Filters.css';

const Filters = ({
  searchFilters,
  sourceFilters,
  onLoadSearchDataResources
}) => {
  const sources = sourceFilters.map(sf => sf.key.toLowerCase());
  useEffect(() => {
    if (searchFilters.length === 0) {
      onLoadSearchDataResources().catch(error => {
        throw new Error(`Loading search catalog page filters failed ${error}`);
      });
    }
  }, []);

  return (
    <>
      <div className="filterSection">
        <div className="filterLabel">
          <span>Sources</span>
        </div>
        <div className="filterBlock">
          <div className="accordion">
            {searchFilters.map((field, idx) => {
              const key = `filters_${idx}`;
              return (
                <FilterItem key={key} item={field} highlight={sources.indexOf(field.data_resource_id.toLowerCase()) > -1} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

Filters.propTypes = {
  searchFilters: PropTypes.array.isRequired,
  sourceFilters: PropTypes.array.isRequired,
  onLoadSearchDataResources: PropTypes.func.isRequired,
};

export default Filters;