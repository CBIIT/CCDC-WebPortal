import React, {useState} from 'react';
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

const validateSearchText = (searchString) => {
  let valid = true;
  if (searchString === "") {
    valid = false;
  } else {
    const termArr = searchString.split(" ");
    termArr.forEach((term) => {
      valid = valid && term.trim().length > 2;
    });
  }
  return valid;
};

const SearchBox = ({
  searchCriteria,
  searchText,
  onBubbleRemoveClick,
  onStartFullTextSearch,
}) => {
  const [localText, setLocalText] = useState(searchText);
  const bubbles = [];

  if (searchCriteria.search_text !== "") {
    bubbles.push({field: "search_text", value: searchCriteria.search_text});
  }
  if (Object.keys(searchCriteria.facet_filters).length > 0) {
    Object.keys(searchCriteria.facet_filters).map((field) => {
      return searchCriteria.facet_filters[field].map((ffilter) => {
        return bubbles.push({
          field,
          value: ffilter,
        });
      });
    });
  }

  const handleBubbleRemoveClick = (bubble) => {
    if (bubble.field === "search_text") {
      setLocalText("");
    }
    onBubbleRemoveClick(bubble);
  };

  const handleTextInputChange = (event) => {
    const text = event.target.value;
    setLocalText(text);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (validateSearchText(localText.trim())) {
        onStartFullTextSearch(localText.trim());
      }
    }
  };

  const handleSubmit = () => {
    if (validateSearchText(localText.trim())) {
      onStartFullTextSearch(localText.trim());
    }
  };

  return (
    <>
      <SearchBoxArea>
        <InputGroup className="searchBoxInputGroup">
          <FormControl
            placeholder="Search the Catalog"
            aria-label="Search the Catalog"
            aria-describedby="basic-addon"
            value={localText}
            onChange={(e) => handleTextInputChange(e)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <SearchIcon>
            <i className="fas fa-search" />
          </SearchIcon>
          <InputGroup.Append>
            {
              localText !== "" && localText.length > 2 ? (
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
          bubbles.map((b, idx) => {
            const key = `bubble_${idx}`;
            return (
              <BubbleContainer key={key}>
                {b.field.replaceAll('_', ' ')}
                :&nbsp;
                {b.value}
                <span className="removeBubble" onClick={() => handleBubbleRemoveClick(b)} aria-hidden="true">
                  <i className="fas fa-times" />
                </span>
              </BubbleContainer>
            );
          })
        }
      </SelectionBubbleArea>
    </>
  );
};

SearchBox.propTypes = {
  searchCriteria: PropTypes.object.isRequired,
  searchText: PropTypes.string.isRequired,
  onStartFullTextSearch: PropTypes.func.isRequired,
  onBubbleRemoveClick: PropTypes.func.isRequired,
};

export default SearchBox;