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
  margin-bottom: 80px;
`;

const DataLink = styled.li`
  text-decoration: none;
  list-style-type: none;
  display: inline;
`;

const DatasetType = styled.div`
  width: 96%;
  text-align: right;
  margin-top: -36px;
  text-transform: uppercase;
  font-size: 12px;
  font-family: Inter;
  // padding-top: 50px;
  // padding-right: 10px;

  span {
    background-color: white;
    border-radius: 20px;
    border: 1px solid #FFBF17;
    padding: 8px 16px;
    line-height: 52px;
  }
`;

const SummaryDatasetType = styled.div`
  width: 98%;
  text-align: right;
  margin-top: -30px;
  margin-bottom: -5px;
  text-transform: uppercase;
  font-size: 12px;
  font-family: Inter;

  span {
    background-color: white;
    border-radius: 20px;
    border: 1px solid #FFBF17;
    padding: 8px 16px;
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
  font-size: 26px;
  font-family: Inter;

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
  font-family: Lato;
  // font-size: 1.3rem;
  font-size: 22px;
  height: 40px;
  // border-bottom: 2px solid #255b96;
  text-decoration: underline;

  a {
    color: inherit;
    text-decoration: inherit;
  }
`;

const DatasetDesc = styled.div`
  width: 100%;
  // display: inline;
  margin-top: -15px;
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
  const tooltips = {
    "Research Data Repository": "Biomedical data repositories accept submission of relevant data from the community to store, organize, validate, archive, preserve and distribute the data, in compliance with the FAIR Data Principles.  A system for storing multiple research artifacts, provided at least some of the research artifacts contain Individual Research Data. A data repository often contains artifacts from multiple studies. Some data repositories accept research datasets irrespective of the structure of those datasets; other data repositories require all research datasets to conform to a standard reference model.",
    Catalog: "A data catalog is not a data repository but rather a place where data is described with an index to what is available. A collection of digests and references (e.g., URL or POC) to corresponding research artifacts. There is a consistent structure across the collection of digests to facilitate filtering and identifying research artifacts of interest. A catalog contains some combination of Summary Research Data, Summary Clinical Data, Data Overview, and Resource Metadata.",
    Registry: "A cancer registry is an information system designed for the collection, storage, and management of data on persons with cancer. An inventory of individuals or samples, usually focused on a specific diagnosis or condition. In some cases, public health laws require collecting information in registries about individuals who have a specific disease or condition. In other cases, individuals provide information about themselves to these registries voluntarily. Thus, a registry contains Individual Clinical Data, but not Individual Research Data.",
    Program: "A coherent assembly of plans, project activities, and supporting resources contained within an administrative framework, the purpose of which is to implement an organization's mission or some specific program-related aspect of that mission.",
    Project: "Any specifically defined piece of work that is undertaken or attempted to meet the goals of a program and that involves one or more case studies. Also known as a Study or Trial.",
    "resource type": "resource type"
  };
  let dataContentTypes = detail.data_content_type === undefined ? "" : detail.data_content_type;
  dataContentTypes = dataContentTypes.replace(/,(?=[^\s])/g, ", ");
  let resourseLinks = detail.resource_uri === undefined ? "" : detail.resource_uri;
  resourseLinks = resourseLinks.split(';');
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
                      <li><a href="/participatingresources">Participating Rescources</a></li>
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
                    {/* <DataLink><a className="prDetailHeaderLink" href={detail.resource_uri}>{detail.resource_uri}</a></DataLink> */}
                    <DataLink><a className="prDetailHeaderLink" href={resourseLinks[0]} target="_blank" rel="noreferrer noopener">{resourseLinks[0]}</a></DataLink>
                    <DataLink><a className="prDetailHeaderLink" href={resourseLinks[1]} target="_blank" rel="noreferrer noopener">{resourseLinks[1]}</a></DataLink>
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
                    <span
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      // title={detail.resource_type === 'Program' ? `asdfasdfasdfasdf` : "resource type"}
                      title={tooltips[detail.resource_type]}
                    >
                      {detail.resource_type}
                    </span>
                  </DatasetType>
                </div>
                <br />
                <div className="prspace" />
                <div className="prAboutContentContainer">
                  <div className="prAboutResourceContainer">
                    <div className="prAboutResourceLabel">About This Resource</div>
                    <div className="prAboutResourceContent">{detail.description}</div>
                    <div className="prResourceToolsContainer">
                      <div className="prCoreDataLabel">Resource Description</div>
                      <div className="prDataElementLabel">Resource Type</div>
                        {detail.resource_type}
                      <div className="prDataElementLabel">Specialization</div>
                      <div className="prDataElementLabel">Data Update Date</div>
                        {detail.data_update_date}
                    </div>
                    <div className="prDataAccessContainer">
                      <div className="prAdditionalDataLabel">Data Content Types</div>
                        <br />
                        {dataContentTypes}
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
                          ? <DataLink><a href={detail.api} target="_blank" rel="noreferrer noopener">{detail.api}</a></DataLink>
                          : null
                        }
                    </div>
                  </div>
                </div>
                <div className="prspace" />
                <br />
                <div className="prDatasetSummaryContainer" id="dataset_summaries">
                  <DatasetsSummary>
                    <SummaryIcon>
                      <img src={datasetsIcon} alt="datasets" />
                    </SummaryIcon>
                    <Link to={`/resource/${detail.data_resource_id}`}>
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
        <DatasetSummaryContainer>
          {
            datasets.map((ds, idx) => {
              const key = `sr_${idx}`;
              const linkto = `/dataset/${ds.dataset_id}`;
              return (
                <DatasetCard key={key}>
                  <DatasetHeader>
                    <DatasetTitle>
                      <a href={linkto}>
                        {ds.dataset_name}
                      </a>
                    </DatasetTitle>
                  </DatasetHeader>
                  <DatasetDesc>
                    {ds.published_in
                      ? <div className="summaryDataElementLabel">Published In</div>
                      : null}
                    {
                      ds.published_in
                      ? <div className="summaryDataElementContent"><DataLink><a href={ds.published_in} target="_blank" rel="noreferrer noopener">{ds.published_in}</a></DataLink></div>
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
                                {/* )&#59;&nbsp; */}
                                {csidx === ds.case_sex.length - 1 ? ")" : "); "}
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
                                {/* )&#59;&nbsp; */}
                                {cadidx === ds.case_age_at_diagnosis.length - 1 ? ")" : "); "}
                              </span>
                            );
                          })
                          : null
                        }
                      </div>
                      <br />
                  </DatasetDesc>
                  <SummaryDatasetType>
                    <span>{ds.primary_dataset_scope}</span>
                  </SummaryDatasetType>
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