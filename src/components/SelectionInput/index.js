import React, { useEffect, useState, useRef } from 'react';
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

const SelectionInput = ({
  value,
  items,
  onChangeSorting
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const dropdownSelection = useRef(null);
  useOutsideAlerter(dropdownSelection);

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
    setCurrentValue(sort);
    onChangeSorting(sort);
  };

  return (
    <PaginationContainer>
      <div ref={dropdownSelection} className="wrapper-dropdown" onClick={handleSelectionClick} aria-hidden="true">
        <span>{currentValue.name}</span>
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
