import React from 'react';
import PropTypes from 'prop-types';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import styled from 'styled-components';
import xIcon from "../../../assets/img/xmark-solid.svg";

const BubbleContainer = styled.div`
  max-width: calc(50% - 20px);
  border-radius: 20px;
  background-color: #EDF0F2;
  color: #2E5A79;
  border: 2px solid #ECBD4D;
  font-size: 13px;
  font-family: Lato;
  font-weight: 400;
  padding: 5px 14px;
  margin-left: 15px;
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
  right: 140px;
  z-index: 10;
  line-height: 53px;
  font-size: 25px;
`;

const SearchBoxArea = styled.div`
  width: 50%;

  .searchBoxInputGroup {
    float: right;
    padding: 0 0 20px 0;
  }
  
  .searchBoxInputGroup .form-control {
    border-radius: 0;
    border: 2.5px solid #004187;
    color: #004187;
    padding-right: 50px;
    font-size: 25px;
  }

  .searchBoxInputGroup .form-control:focus {
    box-shadow: none;
  }
  
  .searchBoxInputGroup .form-control::placeholder {
    color: #004187;
    font-family: Inter;
    font-weight: 600;
    font-size: 25px;
  }
  
  .searchBoxButton {
    width: 120px;
    border-radius: 0;
    font-weight: bold;
    color: white;
    border: 2.5px solid #004187;
    background-color: #004187;
    padding: .75rem 1rem;
    position: relative;
    right: 1px;
    line-height: 26px;
  }

  .buttonDisabled {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
  }

  input[type="search"]::-webkit-search-cancel-button {
    position: relative;
    right: -30px;
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    background: url(${xIcon}) right center no-repeat;
    background-image: url(${xIcon}) red;
    background-size: 20px;
  }

  input[type="search"]:focus::-webkit-search-cancel-button {
    position: relative;
    right: -30px;
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    background: url(${xIcon}) right center no-repeat;
    background-image: url(${xIcon}) red;
    background-size: 20px;
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
  searchKeyword,
  resourceFilters,
  handleBubbleSearchTextRemoveClick,
  handleBubbleResourcesRemoveClick,
  onSearchBoxKeyPress,
  onSearchSubmit,
  onSearchTextInputChange,
}) => {
  const searchableText = getSearchableText(searchText);
  const bubbleSearchKeyword = getSearchableText(searchKeyword);
  const bubbleResources = resourceFilters.join(" , ");

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
            type="search"
            placeholder="Search the Catalog"
            aria-label="Search the Catalog"
            aria-describedby="basic-addon"
            value={searchText}
            onChange={(e) => handleTextInputChange(e)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <SearchIcon>
            {/* <i className="fas fa-search" /> */}
          </SearchIcon>
          {
            searchableText.length > 0 ? (
              <Button variant="outline-secondary" className="searchBoxButton" onClick={() => handleSubmit()}>SUBMIT</Button>
            ) : (
              <button type="button" variant="outline-secondary" className="searchBoxButton buttonDisabled" disabled>SUBMIT</button>
            )
          }
          {
            searchText.length > 0 ? null : (
              <SearchIcon>
                <i className="fas fa-search" />
              </SearchIcon>
            )
          }
        </InputGroup>
      </SearchBoxArea>
      <SelectionBubbleArea>
        {
          bubbleSearchKeyword !== "" && (
            <BubbleContainer title={bubbleSearchKeyword}>
              Search Text
              :&nbsp;
              {bubbleSearchKeyword.length > 24 ? `${bubbleSearchKeyword.substring(0, 21)}...` : bubbleSearchKeyword}
              <span className="removeBubble" onClick={() => handleBubbleSearchTextRemoveClick()} aria-hidden="true">
                <i className="fas fa-times" />
              </span>
            </BubbleContainer>
          )
        }
        {
          bubbleResources.length > 0 && (
            <BubbleContainer title={bubbleResources}>
              Resources
              :&nbsp;
              {bubbleResources.length > 24 ? `${bubbleResources.substring(0, 21)}...` : bubbleResources}
              <span className="removeBubble" onClick={() => handleBubbleResourcesRemoveClick()} aria-hidden="true">
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
  searchKeyword: PropTypes.string.isRequired,
  resourceFilters: PropTypes.array.isRequired,
  handleBubbleSearchTextRemoveClick: PropTypes.func.isRequired,
  handleBubbleResourcesRemoveClick: PropTypes.func.isRequired,
  onSearchBoxKeyPress: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  onSearchTextInputChange: PropTypes.func.isRequired,
};

export default SearchBox;
