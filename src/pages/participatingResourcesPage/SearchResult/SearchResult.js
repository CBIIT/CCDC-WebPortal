import React, { useEffect } from 'react';
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
    color: #004187;
  }

  a {
    margin-left: 5px;
    text-decoration: none;
    color: #00a272;
    font-weight: 500;
  }
`;

const SiteInfo = styled.div`
  display: flex;
  font-size: 15px;
  margin-bottom: 10px;

  a {
    text-decoration: none;
    color: #00a272;
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
    border-radius: 20px;
    border: 1px solid #FFBF17;
    padding: 5px 23px 7px 23px;
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
  background-image: linear-gradient(to right, #25b39a ,#0c3561); 
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
}) => {
  const tooltips = {
    Repository: "Biomedical data repositories store, organize, validate, archive, preserve, and distribute data, in compliance with the FAIR Data Principles. It is a system for storing multiple research artifacts, provided at least some of the research artifacts contain Individual Research Data. A data repository often contains artifacts from multiple studies. Some data repositories accept research datasets irrespective of the structure of those datasets; other data repositories require all research datasets to conform to a standard reference model.",
    Catalog: "A data catalog is not a data repository but rather a place where data is described with an index to what is available. A collection of digests and references (e.g., URL or POC) to corresponding research artifacts. There is a consistent structure across the collection of digests to facilitate filtering and identifying research artifacts of interest. A catalog contains some combination of Summary Research Data, Summary Clinical Data, Data Overview, and Resource Metadata.",
    Collection: "A group of datasets collected together for any reason by an organization of researchers, stewards, or stakeholders either pertaining to a common theme or for a common purpose. For example, the Treehouse Childhood Cancer Initiative maintains a collection of cell line data as part of their repository of pediatric cancer genomic data.",
    Knowledgebase: "Biomedical knowledgebases extract, accumulate, organize, annotate, and link the growing body of information that is related to and relies on core datasets.",
    Registry: "A cancer registry is an information system designed for the collection, storage, and management of data on persons with cancer. An inventory of individuals or samples, usually focused on a specific diagnosis or condition. In some cases, public health laws require collecting information in registries about individuals who have a specific disease or condition. In other cases, individuals provide information about themselves to these registries voluntarily. Thus, a registry contains Individual Clinical Data, but not Individual Research Data.",
    Program: "A coherent assembly of plans, project activities, and supporting resources contained within an administrative framework, the purpose of which is to implement an organization's mission or some specific program-related aspect of that mission.",
    Project: "Any specifically defined piece of work that is undertaken or attempted to meet the goals of a program and that involves one or more case studies. Also known as a Study or Trial.",
    Xenograft: "Cells, tissues, or organs from a donor that are transplanted into a recipient of another species.",
    AnalyticTool: "Any platform, methodology, framework or other software designed for the use of and interpretation of biomedical research data.",
    "resource type": "resource type"
  };
  // const handleLoadMore = (error) => {
  //   throw error;
  // };
  const initializePopover = () => {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map((popoverTriggerEl) => {
      return new Popover(popoverTriggerEl);
    });
  };

  useEffect(() => {
    initializePopover();
  }, [resultList]);

  return (
    <>
      <SearchResultContainer>
        {
          resultList.length === 0 ? (
            <ResultInfo>No Results</ResultInfo>
          ) : resultList.map((rst, idx) => {
            const key = `sr_${idx}`;
            const pocArray = rst.poc.split(" ; ");
            const pocEmailArray = rst.poc_email.split(" ; ");
            const linkto = `/resource/${rst.data_resource_id}`;
            const linktoDatasetSummaries = `/resource/${rst.data_resource_id}#dataset_summaries`;
            const tooltip = tooltips[rst.resource_type.split(' ').join('')];
            let fullTitle = "".concat(rst.resource_name, ' (', rst.data_resource_id, ')');
            if (fullTitle.length > 77) {
              fullTitle = fullTitle.substring(0, 77).concat('...');
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
                  {rst.description}
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
                                  const mailto = `mailto:${pocEmailArray[pocidx]}`;
                                  return (
                                    <a key={pockey} href={mailto}>{pocitem}</a>
                                  );
                                })
                              }
                            </div>
                          )
                        }
                    </POCInfo>
                    <SiteInfo>
                      <a href={rst.resource_uri} target="_blank" rel="noreferrer noopener">
                        {rst.resource_uri && rst.resource_uri.length > 70 ? `${rst.resource_uri.substring(0, 70)}...` : rst.resource_uri}
                        <SiteIcon />
                      </a>
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
};

export default SearchResult;