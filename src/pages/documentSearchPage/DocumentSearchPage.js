import React, { useEffect, useState } from 'react';
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import PropTypes from 'prop-types';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import styled from 'styled-components';
import SearchResult from './SearchResult';
import PageInfo from './PageInfo';

const PageHeaderContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #BFD3E1;
`;

const PageHeaderArea = styled.div`
  margin: 0 auto;
  width: 1200px;
  display: flex;
  position: relative;
  border-left: 1px solid #BFD3E1;
  border-right: 1px solid #BFD3E1;
  padding: 20px;
`;

const PageLabelArea = styled.div`
  width: 70%;
  height: 160px;
  z-index: 1;
`;

const PageLabel = styled.div`
  color: #07368b;
  font-size: 40px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 20px;
`;

const SearchBoxArea = styled.div`
  width: 100%;

  .searchBoxInputGroup {
    float: right;
    padding: 0;
  }
  
  .searchBoxInputGroup .form-control {
    border-radius: 0;
    border: 2px solid #07368b;
    color: #07368b;
    padding-right: 55px;
    font-size: 25px;
    font-weight: normal;
  }
  
  .searchBoxInputGroup .form-control::placeholder {
    color: #07368b;
    font-size: 25px;
  }
  
  .searchBoxButton {
    width: 140px;
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

const SearchIcon = styled.div`
  position: absolute;
  color: #004187;
  right: 155px;
  z-index: 10;
  line-height: 50px;
  font-size: 25px;
`;

const PageLogoArea = styled.div`
  width: 800px;
  height: 160px;
  position: absolute;
  right: 20px;
  background-image: linear-gradient(to right, #e7c54d ,#43c897);
`;

const PageLogoCover = styled.div`
  position: absolute;
  right: 660px;
  border-left: 160px solid white;
  border-bottom: 160px solid transparent;
`;

const SearchContainer = styled.div`
  width: 100%;
  // padding-bottom: 80px;
`;

const SearchContent = styled.div`
  margin: 0 auto;
  width: 1200px;
  padding: 0 30px;
  border-left: 1px solid #BFD3E1;
  border-right: 1px solid #BFD3E1;
  display: grid;
  padding-bottom: 80px;
`;

const SearchSummary = styled.div`
  width: 100%;
  color: #004187;
  font-size: 30px;
  padding: 20px;
`;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const getSearchableText = (searchString) => {
  if (searchString.trim() === "") {
    return true;
  }
  const termArr = searchString.trim().split(" ");
  const result = [];
  termArr.forEach((term) => {
    const t = term.trim();
    if (t.length > 2) {
      result.push(t);
    }
  });
  return result.length > 0;
};

const ParticipatingResourcesPage = ({
  pageInfo,
  onStartDocumentSearch,
}) => {
  const query = useQuery();
  const navigate = useNavigate();
  const searchText = query.get("keyword") ? query.get("keyword").trim() : "";
  const [localText, setLocalText] = useState(searchText);

  useEffect(() => {
    onStartDocumentSearch(searchText).catch(error => {
        throw new Error(`Loading search from url query failed: ${error}`);
      });
  }, []);

  const handleTextInputChange = (event) => {
    const text = event.target.value;
    setLocalText(text);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (getSearchableText(localText.trim())) {
        navigate(`/sitesearch?keyword=${localText.trim()}`);
        onStartDocumentSearch(localText.trim());
      }
    }
  };

  const handleSubmit = () => {
    navigate(`/sitesearch?keyword=${localText.trim()}`);
    onStartDocumentSearch(localText.trim());
  };

  return (
    <>
      <PageHeaderContainer>
        <PageHeaderArea>
          <PageLabelArea>
            <PageLabel>Documentation Search</PageLabel>
            <SearchBoxArea>
              <InputGroup className="searchBoxInputGroup">
                <FormControl
                  placeholder="Type to search"
                  aria-label="Search"
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
                    getSearchableText(localText) ? (
                      <Button variant="outline-secondary" className="searchBoxButton" onClick={() => handleSubmit()}>SUBMIT</Button>
                    ) : (
                      <Button variant="outline-secondary" className="searchBoxButton buttonDisabled" disabled>SUBMIT</Button>
                    )
                  }
                </InputGroup.Append>
              </InputGroup>
            </SearchBoxArea>
          </PageLabelArea>
          <PageLogoArea />
          <PageLogoCover />
        </PageHeaderArea>
      </PageHeaderContainer>
      <SearchContainer>
        <SearchContent>
          <SearchSummary>
            {pageInfo.total}
            &nbsp;Results
          </SearchSummary>
          <SearchResult />
          <PageInfo />
        </SearchContent>
      </SearchContainer>
    </>
  );
};

ParticipatingResourcesPage.propTypes = {
  pageInfo: PropTypes.object.isRequired,
  onStartDocumentSearch: PropTypes.func.isRequired,
};

export default ParticipatingResourcesPage;