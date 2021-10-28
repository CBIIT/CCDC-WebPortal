import React, {useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DataResourceIcons from '../../components/DataResourceIcons';
import datasetsIcon from "../../assets/img/datasets_icon.svg";
import './participatingResourceDetailPage.css';

const ParticipatingResourceResultContainer = styled.div`
  margin: 0 auto;
  width: 1200px;
`;

const DataLink = styled.li`
  text-decoration: none;
  list-style-type: none;
`;

// const PrType = styled.div`
//   // width: 30%;
//   // text-align: right;
//   // padding-right: 10px;

//   // margin-left: 88%;
//   // margin-right: 1%;
//   // margin-bottom: -80px;

//   span {
//     border-radius: 20px;
//     border: 1px solid gold;
//     padding: 5px 10px;
//     line-height: 52px;
//   }
// `;

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

const ParticipatingResourceDetail = ({
  details,
  onPageLoadDataresourceDetail,
}) => {
  const { id } = useParams();
  const content = details[id];
  // const linktoDatasetSummaries = `/resource/${content.data_resource_id}#dataset_summaries`;

  useEffect(() => {
    if (!content) {
      onPageLoadDataresourceDetail(id).catch(error => {
        throw new Error(`Loading participating resource detail page failed ${error}`);
      });
    }
  }, []);

  return (
    <>
        <ParticipatingResourceResultContainer>
        {
            content && (
              <div className="prContainer">
                <div className="prBreadcrumbContainer">
                  <ul className="breadcrumb">
                      <li><a href="/">Home</a></li>
                      <li><a href="/search">Search Catalog</a></li>
                      <li><Link to={`/resource/${content.data_resource_id}`}>{content.data_resource_id}</Link></li>
                  </ul>
                </div>
                <div className="prDetailHeaderContainer">
                  <div className="prDetailHeaderLabel">{content.resource_name}</div>
                  <div className="prIcon">
                    <DataResourceIcons participatingResource={content.data_resource_id} />
                  </div>
                  <button type="button" className="prTypeButton btn">
                    {content.resource_type}
                  </button>
                  {/* <PrType>
                    <span>{content.resource_type}</span>
                  </PrType> */}
                  <div className="prDetailHeaderContent">
                    <Link to={content.resource_uri} className="prDetailHeaderText">{content.resource_uri}</Link>
                  </div>
                  <div className="prDetailHeaderContent">
                    Point of Contact: &nbsp;
                    <span className="prDetailHeaderText">
                      {content.poc}
                      , &nbsp;
                      <Link to={content.poc_email} className="prDetailHeaderText">{content.poc_email}</Link>
                      &nbsp;
                      {content.data_content_type}
                    </span>
                  </div>
                </div>
                <div className="prAboutContentContainer">
                  <div className="prAboutResourceContainer">
                    <div className="prAboutResourceLabel">About This Resource</div>
                    <div className="prAboutResourceContent">{content.description}</div>
                    <div className="prResourceToolsContainer">
                      <div className="prCoreDataLabel">Resource Description</div>
                      <div className="prDataElementLabel">Data Resource Type</div>
                        {content.resource_type}
                      <div className="prDataElementLabel">Specialization</div>
                    </div>
                    <div className="prDataAccessContainer">
                      <div className="prAdditionalDataLabel">Resource Data Content Types</div>
                        {content.data_content_type}
                              {/* <p />
                              {content.has_genomics_omics > 0 ? 'Omics Data' : ''}
                              <p />
                              {content.has_imaging_data > 0 ? 'Imaging Data' : ''}
                              <p />
                              {content.has_clinical_data > 0 ? 'Clinical Data' : ''}
                              <p />
                              {content.has_xenograft_data > 0 ? 'Xenograft Data' : ''}
                              <p />
                              {content.has_cell_lines_data > 0 ? 'Cell Lines Data' : ''} */}
                    </div>
                    <div className="prResourceToolsContainer">
                      <div className="prCoreDataLabel">Resource Tools</div>
                      <div className="prDataElementLabel">Visualization Tools</div>
                        {content.visualization > 0 ? 'YES' : 'NO'}
                      <div className="prDataElementLabel">Analytic Tools</div>
                        {content.analytics > 0 ? 'YES' : 'NO'}
                    </div>
                    <div className="prDataAccessContainer">
                      <div className="prAdditionalDataLabel">Data Access</div>
                      <div className="prDataElementLabel">API (Internal)</div>
                        {
                          content.api
                          ? <DataLink><a href={content.api}>{content.api}</a></DataLink>
                          : null
                        }
                    </div>
                  </div>
                </div>
                <div className="prDatasetSummaryContainer">
                  <DatasetsSummary>
                    <SummaryIcon>
                      <img src={datasetsIcon} alt="datasets" />
                    </SummaryIcon>
                    {/* <Link to={linktoDatasetSummaries}> */}
                    <Link to={content.data_resource_id}>
                      DATASET SUMMARIES (
                      {content.datasets_total}
                      )
                    </Link>
                  </DatasetsSummary>
                </div>
              </div>
            )
        }
        </ParticipatingResourceResultContainer>
    </>
  );
};

ParticipatingResourceDetail.propTypes = {
  details: PropTypes.object.isRequired,
  onPageLoadDataresourceDetail: PropTypes.func.isRequired,
};

export default ParticipatingResourceDetail;