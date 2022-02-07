import React from 'react';
import PropTypes from 'prop-types';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import styled from 'styled-components';

const BubbleContainer = styled.div`
  border-radius: 20px;
  background-color: #e8f1f8;
  color: #4b6a90;
  border: 1px solid gold;
  padding: 0 5px;
  margin-left: 5px;
  margin-bottom: 5px;
  float: left;

  .removeBubble {
    margin-left: 10px;
  }

  .removeBubble:hover {
    color: #07368b;
    cursor: pointer;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  color: #004187;
  right: 135px;
  z-index: 10;
  line-height: 50px;
  font-size: 25px;
`;

const SearchBoxArea = styled.div`
  width: 50%;

  .searchBoxInputGroup {
    float: right;
    padding: 0 0 20px 5px;
  }
  
  .searchBoxInputGroup .form-control {
    border-radius: 0;
    border: 2px solid #07368b;
    color: #07368b;
    padding-right: 50px;
    font-size: 25px;
  }

  .searchBoxInputGroup .form-control:focus {
    box-shadow: none;
  }
  
  .searchBoxInputGroup .form-control::placeholder {
    color: #07368b;
    font-family: Inter;
    font-weight: 600;
    font-size: 25px;
  }
  
  .searchBoxButton {
    width: 120px;
    border-radius: 0;
    font-weight: bold;
    color: white;
    border: 2px solid #07368b;
    background-color: #07368b;
    padding: .75rem 1rem;
    line-height: 26px;
  }

  .buttonDisabled {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
  }
`;

const SelectionBubbleArea = styled.div`
  width: 50%;
`;

const getSearchableText = (searchString) => {
  const termArr = searchString.trim().split(" ");
  const result = [];
  termArr.forEach((term) => {
    const t = term.trim();
    if (t.length > 2) {
      result.push(t);
    }
  });
  return result.length === 0 ? "" : result.join(" ");
};

const SearchBox = ({
  searchText,
  searchCriteria,
  onBubbleRemoveClick,
  onSearchBoxKeyPress,
  onSearchSubmit,
  onSearchTextInputChange,
}) => {
  const searchableText = getSearchableText(searchText);

  const handleBubbleRemoveClick = () => {
    onBubbleRemoveClick();
  };

  const handleTextInputChange = (event) => {
    const text = event.target.value;
    onSearchTextInputChange(text);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && searchableText.length > 0) {
      onSearchBoxKeyPress();
    }
  };

  const handleSubmit = () => {
    onSearchSubmit();
  };

  return (
    <>
      <SearchBoxArea>
        <InputGroup className="searchBoxInputGroup">
          <FormControl
            placeholder="Search the Catalog"
            aria-label="Search the Catalog"
            aria-describedby="basic-addon"
            value={searchText}
            onChange={(e) => handleTextInputChange(e)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <SearchIcon>
            <i className="fas fa-search" />
          </SearchIcon>
          <InputGroup.Append>
            {
              searchableText.length > 0 ? (
                <Button variant="outline-secondary" className="searchBoxButton" onClick={() => handleSubmit()}>SUBMIT</Button>
              ) : (
                <Button variant="outline-secondary" className="searchBoxButton buttonDisabled" disabled>SUBMIT</Button>
              )
            }
          </InputGroup.Append>
        </InputGroup>
      </SearchBoxArea>
      <SelectionBubbleArea>
        {
          getSearchableText(searchCriteria) !== "" && (
            <BubbleContainer>
              search text
              :&nbsp;
              {getSearchableText(searchCriteria)}
              <span className="removeBubble" onClick={() => handleBubbleRemoveClick()} aria-hidden="true">
                <i className="fas fa-times" />
              </span>
            </BubbleContainer>
          )
        }
      </SelectionBubbleArea>
    </>
  );
};

SearchBox.propTypes = {
  searchText: PropTypes.string.isRequired,
  searchCriteria: PropTypes.string.isRequired,
  onBubbleRemoveClick: PropTypes.func.isRequired,
  onSearchBoxKeyPress: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  onSearchTextInputChange: PropTypes.func.isRequired,
};

export default SearchBox;