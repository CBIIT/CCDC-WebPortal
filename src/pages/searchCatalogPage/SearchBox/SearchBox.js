import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import './SearchBox.css';

const SearchBox = ({
  searchText,
  onStartFullTextSearch,
}) => {
  const [localText, setLocalText] = useState(searchText);

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
    </>
  );
};

SearchBox.propTypes = {
  searchText: PropTypes.string.isRequired,
  onStartFullTextSearch: PropTypes.func.isRequired,
};

export default SearchBox;