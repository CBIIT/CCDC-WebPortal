import React, { useEffect } from 'react';
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import PropTypes from 'prop-types';
import FilterItem from './FilterItem';
import './Filters.css';
import clearAllIcon from '../../../assets/img/clearAllIcon.svg';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const replaceResourceFilter = (query, filter) => {
  let str = "";
  if (query.get("search_text")) {
    str += `&search_text=${query.get("search_text")}`;
  }
  if (filter !== "") {
    const tmp = query.get("filterByResource") ? query.get("filterByResource").split("|") : [];
    const idx = tmp.indexOf(filter);
    if (idx > -1) {
      tmp.splice(idx, 1);
    } else {
      tmp.push(filter);
    }
    if (tmp.length > 0) {
      tmp.sort((a, b) => {
        return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
      });
      str += `&filterByResource=${tmp.join("|")}`;
    }
  }
  if (query.get("page")) {
    str += `&page=${query.get("page")}`;
  }
  if (query.get("pageSize")) {
    str += `&pageSize=${query.get("pageSize")}`;
  }
  if (query.get("sortBy")) {
    str += `&sortBy=${query.get("sortBy")}`;
  }
  if (query.get("sortOrder")) {
    str += `&sortOrder=${query.get("sortOrder")}`;
  }
  if (query.get("viewType")) {
    str += `&viewType=${query.get("viewType")}`;
  }
  return str.substring(1);
};

const Filters = ({
  searchFilters,
  sourceFilters,
  selectedFilters,
  onLoadSearchDataResources,
}) => {
  const query = useQuery();
  const navigate = useNavigate();
  const sources = sourceFilters === "all" ? searchFilters.map(element => element.data_resource_id.toLowerCase()) : sourceFilters.split("|").filter(element => element);

  useEffect(() => {
    if (searchFilters.length === 0) {
      onLoadSearchDataResources().catch(error => {
        throw new Error(`Loading search catalog page filters failed ${error}`);
      });
    }
  }, []);

  const handleResourceClick = (filter) => {
    const queryStr = replaceResourceFilter(query, filter);
    navigate(`/search?${queryStr}`);
  };

  return (
    <>
      <div className="filterSection">
        <div className="filterLabel">
          <span>Resources</span>
          <button type="button" onClick={() => handleResourceClick("")} className="clear-all-button">
              <img src={clearAllIcon} alt="clear-all" />
          </button>
        </div>
        <div className="filterBlock">
          <div className="accordion">
            {searchFilters.map((field, idx) => {
              const key = `filters_${idx}`;
              const checked = selectedFilters.indexOf(field.data_resource_id) > -1;
              return (
                <FilterItem key={key} item={field} checked={checked} highlight={sources.indexOf(field.data_resource_id.toLowerCase()) > -1} onSourceClick={handleResourceClick} />
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
  sourceFilters: PropTypes.string.isRequired,
  selectedFilters: PropTypes.array.isRequired,
  onLoadSearchDataResources: PropTypes.func.isRequired,
};

export default Filters;