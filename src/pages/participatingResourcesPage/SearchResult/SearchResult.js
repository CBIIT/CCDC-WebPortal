import React, { useEffect } from 'react';
import ReactHtmlParser from 'html-react-parser';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Popover } from 'bootstrap';
import externalIcon from "../../../assets/img/resource-00a272.svg";
import datasetsIcon from "../../../assets/img/datasets_icon.svg";
import DataResourceIcons from '../../../components/DataResourceIcons';

const SearchResultContainer = styled.div`
  width: 100%;
  display: grid;
`;

const ResultInfo = styled.div`
  padding: 20px;
  font-weight: bold;
`;

const ResourceCard = styled.div`
  width: 100%;
  display: grid;
  border: 1px solid #b6dffd;
  margin-top: 20px;
  padding: 15px 29px;
  box-shadow: 3px 3px 10px lightgray;
`;

const ResourceHeader = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
`;

const ResourceTitle = styled.div`
  width: 85%;
  color: #004187;
  font-weight: 600;
  font-size: 1.28rem;
  height: 40px;
  border-bottom: 3px solid #004187;;

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
  width: 130px;
  margin: 0 auto;
  padding: 10px;
`;

const ResourceDesc = styled.div`
  width: 100%;
  // display: flex;
  margin-top: 15px;
  word-wrap: break-word;
  hyphens: auto;
  font-size: 0.9rem;
  font-weight: 500;

  a {
    color: #00875E;
    background: url(${externalIcon}) right center no-repeat;
    padding-right: 30px;
    background-size: 32px;
  }
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
    color: #004187;
  }

  a {
    margin-left: 5px;
    text-decoration: none;
    color: #008059;
    font-weight: 500;
  }
`;

const SiteInfo = styled.div`
  display: flex;
  font-size: 15px;
  margin-bottom: 10px;

  a {
    text-decoration: none;
    color: #00875E;
    font-weight: 500;
  }
`;

const SiteIcon = styled.div`
  font-weight: bold;
  color: #004187;
  font-size: 1.2rem;  
  background-image: url(${externalIcon});
  background-repeat: no-repeat;
  background-size: 35px 35px;
  width: 35px;
  height: 30px;
  margin-left: -2px;
  margin-top: -10px;
  margin-bottom: -8px;
  display: inline-table;
`;

const ResourceType = styled.div`
  width: 30%;
  text-align: right;
  padding-right: 10px;

  span {
    color: #108461;
    font-family: Poppins;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 19.31px; /* 148.538% */
    text-transform: capitalize;
    border-radius: 20px;
    border: 1px solid #108461;
    padding: 5px 10px;
    line-height: 52px;
  }

  a {
    color: #212529;
    text-decoration: none;
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
  background-image: linear-gradient(to right, #1B8370 ,#0C3561); 
  border-radius: 5px;

  a {
    color: white;
    margin-left: 100px;
    text-decoration: inherit;
  }
`;

const SummaryIcon = styled.div`
  position: absolute;
  bottom: 10px;
  left: 20px;
  color: #07468a;
  font-size: 30px;
  width: 64px;
  background-color: #004187;
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

// const LoadMoreContainer = styled.div`
//   width: 100%;
//   margin-top: 20px;
//   text-align: center;
// `;

const SearchResult = ({
  // pageInfo,
  resultList,
  onLoadGlossaryTerms,
  glossaryTerms,
}) => {
  // const handleLoadMore = (error) => {
  //   throw error;
  // };

  const getTooltipTermList = resultList.map((rt) => {
    return rt.resource_type;
  });

  const initializePopover = () => {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map((popoverTriggerEl) => {
      return new Popover(popoverTriggerEl);
    });
  };

  useEffect(() => {
    initializePopover();
  }, [resultList, glossaryTerms]);

  useEffect(() => {
    const termSet = [...new Set(getTooltipTermList)].filter((term) => !(term in glossaryTerms));
    const termPara = {termNames: termSet};
    if (termSet.length > 0) {
      onLoadGlossaryTerms(termPara).catch(error => {
        throw new Error(`Loading Glossary Terms from url query failed: ${error}`);
      });
    }
  }, [resultList]);

  return (
    <>
      <SearchResultContainer>
        {
          resultList.length === 0 ? (
            <ResultInfo>No Results</ResultInfo>
          ) : resultList.map((rst, idx) => {
            const key = `sr_${idx}`;
            const linkto = `/resource/${rst.data_resource_id}`;
            const linktoDatasetSummaries = `/resource/${rst.data_resource_id}#dataset_summaries`;
            const tooltip = glossaryTerms[rst.resource_type];
            let fullTitle = "".concat(rst.resource_name, ' (', rst.data_resource_id, ')');
            if (fullTitle.length > 72) {
              fullTitle = fullTitle.substring(0, 72).concat('...');
            }
            let pocArray = [];
            let pocEmailArray = [];
            if (rst.poc) {
              pocArray = rst.poc.split(";");
            }
            if (rst.poc_email) {
              pocEmailArray = rst.poc_email.split(";");
            }
            return (
              <ResourceCard key={key}>
                <ResourceHeader>
                  <ResourceTitle>
                    <a href={linkto}>{fullTitle}</a>
                  </ResourceTitle>
                  <ResourceLogo>
                    <ResourceIcon>
                      <DataResourceIcons participatingResource={rst.data_resource_id} type="gold" />
                    </ResourceIcon>
                  </ResourceLogo>
                </ResourceHeader>
                <ResourceDesc>
                  {rst.description && ReactHtmlParser(rst.description)}
                </ResourceDesc>
                <ResourceContact>
                  <ContactInfo>
                    <POCInfo>
                      <label>Point of Contact:</label>
                      {
                        rst.poc_email.includes("http")
                        ? (
                            <a href={rst.poc_email} target="_blank" rel="noreferrer noopener">
                              {rst.poc}
                              <SiteIcon />
                            </a>
                          )
                          : (
                            <div>
                              {
                                pocArray.map((pocitem, pocidx) => {
                                  const pockey = `poc_${pocidx}`;
                                  const mailto = `mailto:${pocEmailArray[pocidx].trim()}`;
                                  return (
                                    <>
                                      <a key={pockey} href={mailto}>{pocitem.trim()}</a>
                                      {pocidx !== pocArray.length - 1 && <span style={{color: '#00875E'}}>,</span>}
                                    </>
                                  );
                                })
                              }
                            </div>
                          )
                        }
                    </POCInfo>
                    <SiteInfo>
                      {
                        rst.resource_uri.split(";").map((uriItem, uriindex) => {
                          const urikey = `uri_${uriindex}`;
                          const uri = uriItem.trim();
                          return (
                            <>
                              <a key={urikey} href={uri} target="_blank" rel="noreferrer noopener">
                                {uri && uri.length > 70 ? `${uri.substring(0, 70)}...` : uri}
                                <SiteIcon />
                              </a>
                            </>
                          );
                        })
                      }
                    </SiteInfo>
                  </ContactInfo>
                  <ResourceType>
                    <span data-bs-custom-class="custom-popover" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content={tooltip}>
                      {rst.resource_type}
                    </span>
                  </ResourceType>
                </ResourceContact>
                <DatasetsSummary>
                  <SummaryIcon>
                    <img src={datasetsIcon} alt="datasets" />
                  </SummaryIcon>
                  <a href={linktoDatasetSummaries}>
                    DATASET SUMMARIES (
                    <span id="dataset_summaries_count">{rst.datasets_total}</span>
                    )
                  </a>
                </DatasetsSummary>
              </ResourceCard>
            );
          })
        }
      </SearchResultContainer>
      {/* {
        pageInfo.total !== 0
        && pageInfo.page * pageInfo.pageSize < pageInfo.total
        && (
          <LoadMoreContainer>
            <Button variant="outline-secondary" className="searchBoxButton" onClick={() => handleLoadMore()}>Load More Results</Button>
          </LoadMoreContainer>
        )
      } */}
    </>
  );
};

SearchResult.propTypes = {
  // pageInfo: PropTypes.object.isRequired,
  resultList: PropTypes.array.isRequired,
  onLoadGlossaryTerms: PropTypes.func.isRequired,
  glossaryTerms: PropTypes.object.isRequired,
};

export default SearchResult;