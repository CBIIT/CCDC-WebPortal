import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CheckBoxItem from './CheckBoxItem';

const SelectionContainer = styled.div`
  display: flex;

  .wrapper-dropdown {
    position: relative;
    width: 200px;
    padding: 0 10px;
    box-shadow: 0 1px 1px rgba(50,50,50,0.1);
    cursor: pointer;
    outline: none;
    font-weight: bold;
    border-radius: 0;
    border: 1px solid #99a9b1;
    background-color: #e8f1f8;
    color: #4b6c86;
    background-repeat: no-repeat;
    background-position: right .75rem center;
    background-size: 16px 12px;
    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='rgba(75,108,134,1)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>");
    
  }
  
  .wrapper-dropdown span {
    line-height: 2rem;
  }
  
  .wrapper-dropdown .dropdown {
    z-index: 1;
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
      background: white;
      border-radius: inherit;
      border: 1px solid rgba(0,0,0,0.17);
      box-shadow: 0 0 5px rgba(0,0,0,0.1);
      font-weight: normal;
      transition: all 0.1s ease-in;
      list-style: none;
      opacity: 0;
      pointer-events: none;
      margin: 0;
      padding: 0;
  }
  
  .wrapper-dropdown .dropdown li a {
      display: block;
      padding: 10px;
      text-decoration: none;
      color: #8aa8bd;
      border-bottom: 1px solid #e6e8ea;
      box-shadow: inset 0 1px 0 rgba(255,255,255,1);
      transition: all 0.1s ease-out;
  }
  
  .wrapper-dropdown .dropdown li i {
      float: right;
      color: inherit;
  }
  
  .wrapper-dropdown .dropdown li:first-of-type a {
      border-radius: 7px 7px 0 0;
  }
  
  .wrapper-dropdown .dropdown li:last-of-type a {
      border-radius: 0 0 7px 7px;
      border: none;
  }
  
  /* Hover state */
  
  .wrapper-dropdown .dropdown li:hover a {
      background: #f3f8f8;
  }
  
  .wrapper-dropdown.active .dropdown {
    opacity: 1;
    pointer-events: auto;
  }
  
  .wrapper-dropdown:hover {
    background-color: #c6d2db;
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
  value,
  items
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
  };

  return (
    <SelectionContainer>
      <div ref={dropdownSelection} className="wrapper-dropdown" onClick={handleSelectionClick} aria-hidden="true">
        <span>{currentValue.name}</span>
        <div className="dropdown">
          {
            items.map((item, idx) => {
              const key = `sort_${idx}`;
              return (
                <CheckBoxItem key={key} item={item} itemClick={handleOptionClick} />
              );
            })
          }
        </div>
      </div>
    </SelectionContainer>
    );
};

SelectionWithCheckBox.propTypes = {
  value: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
};

export default SelectionWithCheckBox;
