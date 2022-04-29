import React, { useEffect, useState, useRef } from 'react';
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SelectionItem from './SelectionItem';
import './SelectionInput.css';

const PaginationContainer = styled.div`
  display: flex;
`;

const useOutsideAlerter = (ref) => {
  useEffect(() => {
      function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
              ref.current.classList.remove('active');
          }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [ref]);
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const replaceQueryStr = (query, sort) => {
  let str = "";
  if (query.get("search_text")) {
    str += `&search_text=${query.get("search_text")}`;
  }
  if (query.get("page")) {
    str += `&page=${query.get("page")}`;
  }
  if (query.get("pageSize")) {
    str += `&pageSize=${query.get("pageSize")}`;
  }
  str += `&sortBy=${sort}`;
  if (query.get("sortOrder")) {
    str += `&sortOrder=${query.get("sortOrder")}`;
  }
  if (query.get("viewType")) {
    str += `&viewType=${query.get("viewType")}`;
  }
  return str.substring(1);
};

const SelectionInput = ({
  value,
  items,
  onChangeSorting
}) => {
  const [currentValue, setCurrentValue] = useState("Dataset");
  const dropdownSelection = useRef(null);
  const query = useQuery();
  const navigate = useNavigate();
  useOutsideAlerter(dropdownSelection);

  useEffect(() => {
    setCurrentValue(value.name);
  }, [value]);

  const handleSelectionClick = () => {
    if (dropdownSelection.current.classList.contains('active')) {
      dropdownSelection.current.classList.remove('active');
    } else {
      dropdownSelection.current.classList.add('active');
    }
  };

  const handleOptionClick = (sort, event) => {
    event.stopPropagation();
    dropdownSelection.current.classList.remove('active');
    setCurrentValue(sort.name);
    const queryStr = replaceQueryStr(query, sort.k);
    navigate(`/search?${queryStr}`);
    onChangeSorting(sort);
  };

  return (
    <PaginationContainer>
      <div ref={dropdownSelection} className="wrapper-dropdown" onClick={handleSelectionClick} aria-hidden="true">
        <span className="dropdownLabel">{currentValue}</span>
        <ul className="dropdown">
          {
            items.map((item, idx) => {
              const key = `sort_${idx}`;
              return (
                <SelectionItem key={key} item={item} itemClick={handleOptionClick} />
              );
            })
          }
        </ul>
      </div>
    </PaginationContainer>
    );
};

SelectionInput.propTypes = {
  value: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  onChangeSorting: PropTypes.func.isRequired,
};

export default SelectionInput;
