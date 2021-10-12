import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import styled from 'styled-components';
import './SearchBox.css';

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

const SearchBoxArea = styled.div`
  width: 50%;
`;

const SelectionBubbleArea = styled.div`
  width: 50%;
`;

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
      onStartFullTextSearch(localText.trim());
    }
  };

  const handleSubmit = () => {
    onStartFullTextSearch(localText.trim());
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
          <InputGroup.Append>
            <Button variant="outline-secondary" className="searchBoxButton" onClick={() => handleSubmit()}>Submit</Button>
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