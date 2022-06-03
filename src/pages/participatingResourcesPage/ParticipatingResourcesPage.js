import React, { useEffect } from 'react';
import {
  useLocation, useSearchParams
} from "react-router-dom";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Filters from './Filters';
import SearchResult from './SearchResult';
import PageInfo from './PageInfo';
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
  width: 500px;
`;

const PageLabel = styled.div`
  color: #004187;
  font-size: 42px;
  line-height: 42px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`;

const PageLabelMore = styled.div`
  color: #7699A7;
  font-size: 29px;
  line-height: 42px;
`;

const PageLogoArea = styled.div`
  width: 700px;
  height: 202px;
  background-size: auto;
  background-image: url(${img});
`;

const SearchContainer = styled.div`
  width: 100%;
  // padding-bottom: 80px;
`;

const SearchArea = styled.div`
  margin: 0 auto;
  width: 1200px;
  display: flex;
`;

const SearchFiltersContainer = styled.div`
  width: 20%;
  // margin: 0 auto;
  // padding: 0 0 0 80px;
  padding: 0 0 80px 0;
  border-left: 1px solid #e0e4e7;
  border-right: 1px solid #e0e4e7;
`;

const SearchContentContainer = styled.div`
  width: 80%;
  border-right: 1px solid #e0e4e7;
  padding: 0 18px;
  padding-bottom: 80px;
  // padding: 0 0 0 80px;
`;

const SearchContent = styled.div`
  width: 100%;
`;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ParticipatingResourcesPage = ({
  total,
  onLoadFromUrlQuery,
}) => {
  const query = useQuery();
  const [searchParams] = useSearchParams();
  window.scrollTo(0, 0);

  useEffect(() => {
    const options = {};
    if (query.get("resource_type")) {
      options.resource_type = query.get("resource_type").trim().split("|");
    }
    if (query.get("data_content_type")) {
      options.data_content_type = query.get("data_content_type").trim().split("|");
    }
    if (query.get("page")) {
      options.page = parseInt(query.get("page").trim(), 10);
    }
    if (query.get("pageSize")) {
      options.pageSize = parseInt(query.get("pageSize").trim(), 10);
    }
    onLoadFromUrlQuery(options).catch(error => {
      throw new Error(`Loading search from url query failed: ${error}`);
    });
  }, [searchParams]);

  return (
    <>
      <PageHeaderContainer>
        <PageHeaderArea>
          <PageLabelArea>
            <PageLabel>Participating Resources</PageLabel>
            {total >= 0 && (
              <PageLabelMore>
                {total}
                &nbsp;Results
              </PageLabelMore>
            )}
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
            <PageInfo />
            <SearchContent>
              <SearchResult />
            </SearchContent>
            <PageInfo />
          </SearchContentContainer>
        </SearchArea>
      </SearchContainer>
    </>
  );
};

ParticipatingResourcesPage.propTypes = {
  total: PropTypes.number,
  onLoadFromUrlQuery: PropTypes.func.isRequired,
};

ParticipatingResourcesPage.defaultProps = {
  total: -1
};

export default ParticipatingResourcesPage;