import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import icon from '../../../assets/img/data_resource_icons.png';
import externalIcon from "../../../assets/img/resource.svg";
import datasetsIcon from "../../../assets/img/datasets_icon.svg";

const SearchResultContainer = styled.div`
  width: 100%;
  display: grid;
`;

const ResourceCard = styled.div`
  width: 100%;
  display: grid;
  border: 1px solid #b6dffd;
  margin-top: 20px;
  padding: 15px 20px;
  box-shadow: 3px 3px 10px lightgray;
`;

const ResourceHeader = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
`;

const ResourceTitle = styled.div`
  width: 85%;
  color: #255b96;
  font-weight: 600;
  font-size: 1.3rem;
  height: 40px;
  border-bottom: 3px solid #255b96;

  a {
    color: inherit;
    text-decoration: inherit;
  }
`;

const ResourceLogo = styled.div`
  width: 15%;
  text-align: right;
`;

const ResourceIcon = styled.div`
  width: 65px;
  height: 65px;
  background-image: url(${icon});
  background-position: -75px -50px;
  background-size: 600px 599px;
  margin: 0 auto;
`;

const ResourceDesc = styled.div`
  width: 100%;
  display: flex;
  margin-top: 15px;
  word-wrap: break-word;
  hyphens: auto;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ResourceContact = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
`;

const ContactInfo = styled.div`
  width: 70%;
  display: grid;
`;

const POCInfo = styled.div`
  display: flex;
  font-size: 15px;

  label {
    font-weight: bold;
    color: #07468a;
  }

  a {
    margin-left: 5px;
    text-decoration: none;
    color: #48bea9;
    font-weight: 500;
  }
`;

const SiteInfo = styled.div`
  display: flex;
  font-size: 15px;

  a {
    text-decoration: none;
    color: #48bea9;
    font-weight: 500;
  }
`;

const SiteIcon = styled.div`
  font-weight: bold;
  color: #07468a;
  font-size: 1.2rem;  
  background-image: url(${externalIcon});
  background-repeat: no-repeat;
  background-size: 35px 35px;
  width: 35px;
  height: 35px;
  margin-left: -10px;
  margin-top: -5px;
`;

const ResourceType = styled.div`
  width: 30%;
  text-align: right;
  padding-right: 10px;

  span {
    border-radius: 20px;
    border: 1px solid gold;
    padding: 5px 10px;
    line-height: 52px;
  }
`;

const DatasetsSummary = styled.div`
  margin-top: 10px;  
  position: relative;
  width: 100%;
  display: flex;
  height: 60px;
  line-height: 60px;
  background-color: #25b39a;
  background-image: linear-gradient(to right, #25b39a ,#0c3561); 
  border-radius: 5px;

  span {
    color: white;
    margin-left: 100px;
  }
`;

const SummaryIcon = styled.div`
  position: absolute;
  bottom: 10px;
  left: 20px;
  color: #07468a;
  font-size: 30px;
  width: 64px;
  background-color: #1f5487;
  border-radius: 70px;
  border: 2px solid white;
  text-align: center;

  img {
    width: 25px;
    position: relative;
    margin-top: -10px;
    margin-left: 3px;
  }
`;

const LoadMoreContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  text-align: center;
`;

const SearchResult = ({
  pageInfo,
  resultList,
}) => {
  const handleLoadMore = (error) => {
    throw error;
  };

  return (
    <>
      <SearchResultContainer>
        {
          resultList.map((rst, idx) => {
            const key = `sr_${idx}`;
            const mailto = `mailto:${rst.poc_email}`;
            const linkto = `/resource/${rst.data_resource_id}`;
            return (
              <ResourceCard key={key}>
                <ResourceHeader>
                  <ResourceTitle>
                    <Link to={linkto}>
                      {rst.resource_name}
                    </Link>
                  </ResourceTitle>
                  <ResourceLogo>
                    <ResourceIcon />
                  </ResourceLogo>
                </ResourceHeader>
                <ResourceDesc>
                  {rst.description}
                </ResourceDesc>
                <ResourceContact>
                  <ContactInfo>
                    <POCInfo>
                      <label>Point of Contact:</label>
                      <a href={mailto}>{rst.poc}</a>
                    </POCInfo>
                    <SiteInfo>
                      <SiteIcon />
                      <a href={rst.resource_uri}>{rst.resource_uri}</a>
                    </SiteInfo>
                  </ContactInfo>
                  <ResourceType>
                    <span>{rst.resource_type}</span>
                  </ResourceType>
                </ResourceContact>
                <DatasetsSummary>
                  <SummaryIcon>
                    <img src={datasetsIcon} alt="datasets" />
                  </SummaryIcon>
                  <span>
                    DATASET SUMMARIES (
                    {rst.datasets_total}
                    )
                  </span>
                </DatasetsSummary>
              </ResourceCard>
            );
          })
        }
      </SearchResultContainer>
      {
        pageInfo.total !== 0
        && pageInfo.page * pageInfo.pageSize < pageInfo.total
        && (
          <LoadMoreContainer>
            <Button variant="outline-secondary" className="searchBoxButton" onClick={() => handleLoadMore()}>Load More Results</Button>
          </LoadMoreContainer>
        )
      }
    </>
  );
};

SearchResult.propTypes = {
  pageInfo: PropTypes.object.isRequired,
  resultList: PropTypes.array.isRequired,
};

export default SearchResult;