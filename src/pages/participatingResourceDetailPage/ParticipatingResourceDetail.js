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

const DatasetSummaryContainer = styled.div`
  // width: 100%;
  // display: grid;
  margin: 0 auto;
  width: 1120px;
`;

const DataLink = styled.li`
  text-decoration: none;
  list-style-type: none;
  display: inline;
`;

const DatasetType = styled.div`
  width: 96%;
  text-align: right;
  // margin-top: -10px;
  // padding-top: 50px;
  // padding-right: 10px;

  span {
    background-color: white;
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

const DatasetCard = styled.div`
  width: 100%;
  display: grid;
  border: 1px solid #b6dffd;
  margin-top: 20px;
  padding: 15px 20px;
  box-shadow: 3px 3px 10px lightgray;
`;

const DatasetHeader = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
`;

const DatasetTitle = styled.div`
  // width: 85%;
  color: #255b96;
  // font-weight: 600;
  font-size: 1.3rem;
  height: 40px;
  border-bottom: 2px solid #255b96;

  a {
    color: inherit;
    text-decoration: inherit;
  }
`;

const DatasetDesc = styled.div`
  width: 100%;
  // display: inline;
  // margin-top: 15px;
  word-wrap: break-word;
  hyphens: auto;
  div {
    // padding-bottom: 20px;
    // background-color: red;
  }
  line-height: 32px;
`;

// const ResourceContact = styled.div`
//   width: 100%;
//   display: flex;
//   margin-top: 20px;
// `;

const ParticipatingResourceDetail = ({
  details,
  datasets,
  onPageLoadDataresourceDetail,
  resultList,
}) => {
  const { id } = useParams();
  const content = details[id];
  // const datasetscontent = datasets[id];
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
                  {/* <button type="button" className="prTypeButton btn">
                    {content.resource_type}
                  </button> */}
                  {/* <PrType>
                    <span>{content.resource_type}</span>
                  </PrType> */}
                  <div className="prDetailHeaderContent">
                    {/* <Link to={content.resource_uri} className="prDetailHeaderLink">{content.resource_uri}</Link> */}
                    <DataLink><a className="prDetailHeaderLink" href={content.resource_uri}>{content.resource_uri}</a></DataLink>
                  </div>
                  <div className="prDetailHeaderContent">
                    Point of Contact: &nbsp;
                    <span className="prDetailHeaderText">
                      {content.poc}
                      , &nbsp;
                      {/* <Link to={content.poc_email} className="prDetailHeaderLink">{content.poc_email}</Link> */}
                      <DataLink><a className="prDetailHeaderLink" href={`mailto:${content.poc_email}`}>{content.poc_email}</a></DataLink>
                      {/* <li><a className="prDetailHeaderLink" href={content.poc_email}>{content.poc_email}</a></li> */}
                      {/* <a href={`mailto:${content.poc_email}`}>{content.poc_email}</a> */}
                    </span>
                  </div>
                  <DatasetType>
                    <span>{content.resource_type}</span>
                  </DatasetType>
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
                        <br />
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
                      {/* <div className="prDataElementLabel">API (Internal)</div> */}
                      <br />
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
                    <Link to={`/resource/${content.data_resource_id}#dataset_summaries`}>
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
        <DatasetSummaryContainer id="#dataset_summaries">
          {
            resultList.map((rst, idx) => {
              const key = `sr_${idx}`;
              const linkto = `/dataset/${rst.content.dataset_id}`;
              return (
                <DatasetCard key={key}>
                  <DatasetHeader>
                    <DatasetTitle>
                      <Link to={linkto}>
                        {rst.content.dataset_name}
                      </Link>
                    </DatasetTitle>
                  </DatasetHeader>
                  <DatasetDesc>
                    {rst.content.published_in
                      ? <div className="summaryDataElementLabel">Published In</div>
                      : null}
                    {
                      rst.content.published_in
                      ? <div className="summaryDataElementContent"><DataLink><a href={rst.content.published_in}>{rst.content.published_in}</a></DataLink></div>
                      : null
                    }
                    <br />
                    {rst.content.case_id
                      ? <div className="summaryDataElementLabel">Case ID</div>
                      : null}
                    {
                      rst.content.case_id
                      ? <div className="summaryDataElementContent">{rst.content.case_id}</div>
                      : null
                    }
                    <br />
                    {rst.content.case_sex
                        ? <div className="summaryDataElementLabel">Case Sex</div>
                        : null}
                      <div className="summaryDataElementContent">
                        {
                          rst.content.case_sex
                          ? rst.content.case_sex.map((cs, csidx) => {
                            const cskey = `cs_${csidx}`;
                            return (
                              <span key={cskey} className="itemSpan">
                                {cs.n}
                                &nbsp;(
                                {cs.v}
                                )&#59; &nbsp;
                              </span>
                            );
                          })
                          : null
                        }
                      </div>
                    <br />
                    {rst.content.case_age_at_diagnosis
                        ? <div className="summaryDataElementLabel">Case Age At Diagnosis</div>
                        : null}
                      <div className="summaryDataElementContent">
                        {
                          rst.content.case_age_at_diagnosis
                          ? rst.content.case_age_at_diagnosis.map((cad, cadidx) => {
                            const cadkey = `cad_${cadidx}`;
                            return (
                              <span key={cadkey} className="itemSpan">
                                {cad.n}
                                &nbsp;(
                                {cad.v}
                                )&#59; &nbsp;
                              </span>
                            );
                          })
                          : null
                        }
                      </div>
                      <br />
                  </DatasetDesc>
                  <DatasetType>
                    <span>{rst.content.primary_dataset_scope}</span>
                  </DatasetType>
                </DatasetCard>
              );
            })
          }
        </DatasetSummaryContainer>
        <DatasetSummaryContainer id="#dataset_summaries">
          {
            datasets.map((rst, idx) => {
              const key = `sr_${idx}`;
              return (
                <DatasetCard key={key}>
                  <DatasetDesc>
                    {rst.dataset_name
                      ? <div className="summaryDataElementLabel">{rst.dataset_name}</div>
                      : null}
                    <br />
                  </DatasetDesc>
                </DatasetCard>
              );
            })
            // content && (
            //   <div className="prContainer">
            //     <br />
            //     <br />
            //     <div className="prAboutContentContainer">
            //       <div className="prAboutResourceContainer">
            //         <div className="prAboutResourceLabel">About This Resource</div>
            //         <div className="prAboutResourceContent">{content.resource_name}</div>
            //       </div>
            //     </div>
            //   </div>
            // )

          }
        </DatasetSummaryContainer>
    </>
  );
};

ParticipatingResourceDetail.propTypes = {
  details: PropTypes.object.isRequired,
  // datasets: PropTypes.object.isRequired,
  datasets: PropTypes.array.isRequired,
  onPageLoadDataresourceDetail: PropTypes.func.isRequired,
  resultList: PropTypes.array.isRequired,
};

export default ParticipatingResourceDetail;