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
  margin-bottom: 20px;
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
  inline-size: 1000px;
`;

// const ResourceContact = styled.div`
//   width: 100%;
//   display: flex;
//   margin-top: 20px;
// `;

const ParticipatingResourceDetail = ({
  detail,
  datasets,
  onPageLoadDataresourceDetail,
  onPageLoadDataresourceDetailDatasets,
}) => {
  const { id } = useParams();
  useEffect(() => {
    if (!detail.data_resource_id || detail.data_resource_id !== id) {
      onPageLoadDataresourceDetail(id).catch(error => {
        throw new Error(`Loading participating resource detail page failed ${error}`);
      });

      onPageLoadDataresourceDetailDatasets(id).catch(error => {
        throw new Error(`Loading participating resource detail datasets failed ${error}`);
      });
    }
  }, []);

  return (
    <>
        <ParticipatingResourceResultContainer>
        {
            detail && (
              <div className="prContainer">
                <div className="prBreadcrumbContainer">
                  <ul className="breadcrumb">
                      <li><a href="/">Home</a></li>
                      <li><a href="/search">Search Catalog</a></li>
                      <li><Link to={`/resource/${detail.data_resource_id}`}>{detail.data_resource_id}</Link></li>
                  </ul>
                </div>
                <div className="prDetailHeaderContainer">
                  <div className="prDetailHeaderLabel">{detail.resource_name}</div>
                  <div className="prIcon">
                    <DataResourceIcons participatingResource={detail.data_resource_id} type="white" />
                  </div>
                  <span className="badge"><i className="far fa-file-alt" /></span>
                  <span className="badgeCount">{detail.datasets_total}</span>
                  <div className="prDetailHeaderContent">
                    {/* <Link to={content.resource_uri} className="prDetailHeaderLink">{content.resource_uri}</Link> */}
                    <DataLink><a className="prDetailHeaderLink" href={detail.resource_uri}>{detail.resource_uri}</a></DataLink>
                  </div>
                  <div className="prDetailHeaderContent">
                    Point of Contact: &nbsp;
                    <span className="prDetailHeaderText">
                      {detail.poc}
                      , &nbsp;
                      {/* <Link to={content.poc_email} className="prDetailHeaderLink">{content.poc_email}</Link> */}
                      <DataLink><a className="prDetailHeaderLink" href={`mailto:${detail.poc_email}`}>{detail.poc_email}</a></DataLink>
                      {/* <li><a className="prDetailHeaderLink" href={content.poc_email}>{content.poc_email}</a></li> */}
                      {/* <a href={`mailto:${content.poc_email}`}>{content.poc_email}</a> */}
                    </span>
                  </div>
                  <DatasetType>
                    <span>{detail.resource_type}</span>
                  </DatasetType>
                </div>
                <div className="prAboutContentContainer">
                  <div className="prAboutResourceContainer">
                    <div className="prAboutResourceLabel">About This Resource</div>
                    <div className="prAboutResourceContent">{detail.description}</div>
                    <div className="prResourceToolsContainer">
                      <div className="prCoreDataLabel">Resource Description</div>
                      <div className="prDataElementLabel">Data Resource Type</div>
                        {detail.resource_type}
                      <div className="prDataElementLabel">Specialization</div>
                    </div>
                    <div className="prDataAccessContainer">
                      <div className="prAdditionalDataLabel">Resource Data Content Types</div>
                        <br />
                        {detail.data_content_type}
                    </div>
                    <div className="prResourceToolsContainer">
                      <div className="prCoreDataLabel">Resource Tools</div>
                      <div className="prDataElementLabel">Visualization Tools</div>
                        {detail.visualization > 0 ? 'YES' : 'NO'}
                      <div className="prDataElementLabel">Analytic Tools</div>
                        {detail.analytics > 0 ? 'YES' : 'NO'}
                    </div>
                    <div className="prDataAccessContainer">
                      <div className="prAdditionalDataLabel">Data Access</div>
                      {/* <div className="prDataElementLabel">API (Internal)</div> */}
                      <br />
                        {
                          detail.api
                          ? <DataLink><a href={detail.api}>{detail.api}</a></DataLink>
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
                    <Link to={`/resource/${detail.data_resource_id}#dataset_summaries`}>
                      DATASET SUMMARIES (
                      {detail.datasets_total}
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
            datasets.map((ds, idx) => {
              const key = `sr_${idx}`;
              const linkto = `/dataset/${ds.dataset_id}`;
              return (
                <DatasetCard key={key}>
                  <DatasetHeader>
                    <DatasetTitle>
                      <Link to={linkto}>
                        {ds.dataset_name}
                      </Link>
                    </DatasetTitle>
                  </DatasetHeader>
                  <DatasetDesc>
                    {ds.published_in
                      ? <div className="summaryDataElementLabel">Published In</div>
                      : null}
                    {
                      ds.published_in
                      ? <div className="summaryDataElementContent"><DataLink><a href={ds.published_in}>{ds.published_in}</a></DataLink></div>
                      : null
                    }
                    <br />
                    {ds.case_id
                      ? <div className="summaryDataElementLabel">Number of Cases</div>
                      : null}
                    {
                      ds.case_id
                      ? <div className="summaryDataElementContent">{ds.case_id.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                      : null
                    }
                    <br />
                    {ds.case_sex
                        ? <div className="summaryDataElementLabel">Case Sex</div>
                        : null}
                      <div className="summaryDataElementContent">
                        {
                          ds.case_sex
                          ? ds.case_sex.map((cs, csidx) => {
                            const cskey = `cs_${csidx}`;
                            return (
                              <span key={cskey} className="itemSpan">
                                {cs.n}
                                &nbsp;(
                                {cs.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                )&#59; &nbsp;
                              </span>
                            );
                          })
                          : null
                        }
                      </div>
                    <br />
                    {ds.case_age_at_diagnosis
                        ? <div className="summaryDataElementLabel">Case Age At Diagnosis</div>
                        : null}
                      <div className="summaryDataElementContent">
                        {
                          ds.case_age_at_diagnosis
                          ? ds.case_age_at_diagnosis.map((cad, cadidx) => {
                            const cadkey = `cad_${cadidx}`;
                            return (
                              <span key={cadkey} className="itemSpan">
                                {cad.n}
                                &nbsp;(
                                {cad.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
                    <span>{ds.primary_dataset_scope}</span>
                  </DatasetType>
                </DatasetCard>
              );
            })
          }
        </DatasetSummaryContainer>
    </>
  );
};

ParticipatingResourceDetail.propTypes = {
  detail: PropTypes.object.isRequired,
  datasets: PropTypes.array.isRequired,
  onPageLoadDataresourceDetail: PropTypes.func.isRequired,
  onPageLoadDataresourceDetailDatasets: PropTypes.func.isRequired,
};

export default ParticipatingResourceDetail;