import React, { useEffect } from 'react';
import {
  useLocation
} from "react-router-dom";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Filters from './Filters';
import SearchResult from './SearchResult';
import img from '../../assets/img/Participating_Resources.png';

const PageHeaderContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 20px 0 20px 0;
`;

const PageHeaderArea = styled.div`
  margin: 0 auto;
  width: 1200px;
  display: flex;
`;

const PageLabelArea = styled.div`
  width: 40%;
`;

const PageLabel = styled.div`
  color: #07368b;
  font-size: 32px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`;

const PageLabelMore = styled.div`
  color: #9fb4c2;
  font-size: 20px;
`;

const PageLogoArea = styled.div`
  width: 85%;
  height: 150px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-size: cover;
  background-image: url(${img});
  border-bottom: 2px solid white;
  background-position: center;
`;

const SearchContainer = styled.div`
  width: 100%;
`;

const SearchArea = styled.div`
  margin: 0 auto;
  width: 1200px;
  display: flex;
`;

const SearchFiltersContainer = styled.div`
  width: 20%;
  border-left: 1px solid #e0e4e7;
  border-right: 1px solid #e0e4e7;
`;

const SearchContentContainer = styled.div`
  width: 80%;
  border-right: 1px solid #e0e4e7;
  padding: 5px 10px;
`;

const SearchContent = styled.div`
  width: 100%;
`;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const getFiltersFromQuery = (query) => {
  const filters = {};
  query.forEach((value, key) => {
    filters[key] = value.split("|");
  });
  return filters;
};

const ParticipatingResourcesPage = ({
  total,
  onLoadFromUrlQuery,
}) => {
  const query = useQuery();
  const filters = getFiltersFromQuery(query);

  useEffect(() => {
    onLoadFromUrlQuery(filters).catch(error => {
        throw new Error(`Loading search from url query failed: ${error}`);
      });
  }, []);

  return (
    <>
      <PageHeaderContainer>
        <PageHeaderArea>
          <PageLabelArea>
            <PageLabel>Participating Resources</PageLabel>
            <PageLabelMore>
              {total}
              &nbsp;Results
            </PageLabelMore>
          </PageLabelArea>
          <PageLogoArea />
        </PageHeaderArea>
      </PageHeaderContainer>
      <SearchContainer>
        <SearchArea>
          <SearchFiltersContainer>
            <Filters />
          </SearchFiltersContainer>
          <SearchContentContainer>
            <SearchContent>
              <SearchResult />
            </SearchContent>
          </SearchContentContainer>
        </SearchArea>
      </SearchContainer>
    </>
  );
};

ParticipatingResourcesPage.propTypes = {
  total: PropTypes.number.isRequired,
  onLoadFromUrlQuery: PropTypes.func.isRequired,
};

export default ParticipatingResourcesPage;