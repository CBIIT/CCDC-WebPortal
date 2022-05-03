import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactHtmlParser from "react-html-parser";
import CheckBoxItem from './CheckBoxItem';

const SelectionContainer = styled.div`
  width: 48%;
  margin-right: 2%;
`;

const SelectionLabel = styled.div`
  margin: 10px 0;
  width: 100%;
  // color: #8a9296;
  color: red;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const SelectionButton = styled.button`
  position: relative;
  width: 100%;
  padding: 5px 30px 5px 15px;
  text-align: left;
  box-shadow: 0 1px 1px rgba(50,50,50,0.1);
  cursor: pointer;
  outline: none;
  font-style: italic;
  border-radius: 0;
  border: 1px solid #99a9b1;
  background-color: #e8f1f8;
  color: #4b6c86;
  background-repeat: no-repeat;
  background-position: right .75rem center;
  background-size: 16px 12px;
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='rgba(75,108,134,1)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>");

  &:hover {
    background-color: #c6d2db;
  }

  &:focus {
    background-color: #c6d2db;
  }

  &.selectedFilter {
    font-weight: bold;
  }
`;

const SelectionItems = styled.ul`
  padding: 0;
  width: 100%;
  border: 2px;
  box-shadow: 0 0 10px gray;

  & li{
    display: block;
    padding: 10px;
    text-decoration: none;
    color: #8aa8bd;
    border-bottom: 1px solid #e6e8ea;
    box-shadow: inset 0 1px 0 rgba(255,255,255,1);
    transition: all 0.1s ease-out;
  }

  & li::first-of-type{
    border-radius: 7px 7px 0 0;
  }

  & li:last-of-type{
      border-radius: 0 0 7px 7px;
      border: none;
  }
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

const SelectionWithCheckBox = ({
  selectionLabel,
  selectionField,
  advancedFilter,
  onClickAdvancedSearchFilter,
}) => {
  const [currentValue, setCurrentValue] = useState([]);
  const dropdownSelection = useRef(null);
  useOutsideAlerter(dropdownSelection);

  const handleOptionClick = (item, event) => {
    event.stopPropagation();
    const idx = currentValue.indexOf(item);
    if (idx === -1) {
      setCurrentValue([...currentValue, item]);
    } else {
      setCurrentValue(currentValue.filter(element => element !== item));
    }
    onClickAdvancedSearchFilter({name: selectionField, value: item});
  };

  return (
    <SelectionContainer ref={dropdownSelection} className="dropdown">
      <SelectionLabel>{selectionLabel}</SelectionLabel>
      <SelectionButton type="button" data-bs-toggle="dropdown" aria-expanded="false">
        {currentValue.length === 0 ? "Please select ..." : ReactHtmlParser(`<b>${currentValue.join(", ")}</b>`)}
      </SelectionButton>
      <SelectionItems className="dropdown-menu">
        {
          advancedFilter.map((item, idx) => {
            const key = `sort_${idx}`;
            return (
              <CheckBoxItem key={key} item={item} itemClick={handleOptionClick} />
            );
          })
        }
      </SelectionItems>
    </SelectionContainer>
    );
};

SelectionWithCheckBox.propTypes = {
  selectionLabel: PropTypes.string.isRequired,
  selectionField: PropTypes.string.isRequired,
  advancedFilter: PropTypes.array.isRequired,
  onClickAdvancedSearchFilter: PropTypes.func.isRequired,
};

export default SelectionWithCheckBox;
