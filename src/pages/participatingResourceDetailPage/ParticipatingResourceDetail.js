import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import ReactHtmlParser from 'html-react-parser';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Popover } from 'bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import DataResourceIcons from '../../components/DataResourceIcons';
import datasetsIcon from "../../assets/img/datasets_icon.svg";
import headerExternalIcon from "../../assets/img/resource-header.svg";
import externalIcon from "../../assets/img/resource.svg";
import externalIconGreen from "../../assets/img/dataset-body.svg";
import './participatingResourceDetailPage.css';

const ParticipatingResourceResultContainer = styled.div`
  margin: 0 auto;
  width: 1200px;
`;

const ParticipatingResourceGridContainer = styled.div`
  // margin: 100px 0 100px 0;
  border-top: 1px solid #BFD3E1;
`;

// const SiteIcon = styled.div`
//   font-weight: bold;
//   // color: #07468a;
//   font-size: 1.2rem;
//   background-image: url(${headerExternalIcon});
//   background-repeat: no-repeat;
//   background-size: 35px 35px;
//   width: 35px;
//   height: 35px;
//   margin-left: -10px;
//   margin-top: -5px;
//   // display: flex;
//   // display: inline flex;
//   margin-bottom: -30px;
// `;

const HeaderLinks = styled.div`
  a[target="_blank"] {
    background: url(${headerExternalIcon}) right center no-repeat;
    padding-right: 30px;
    // margin-left: -5px;
    background-size: 32px;
    display: inline-table;
  }
`;

const ResourceBody = styled.div`
  a[target="_blank"] {
    color: #00875E;
    background: url(${externalIcon}) right center no-repeat;
    padding-right: 30px;
    // margin-left: -5px;
    background-size: 32px;
    // display: inline-table;
  }

  .prAboutResourceContent {
    a[target="_blank"] {
      color: #00a272;
      background: url(${externalIconGreen}) right center no-repeat;
      padding-right: 30px;
      background-size: 32px;
    }
  }
  .datasetDesLinks {
    margin-top: 10px;
    color: #00a272;
    text-transform: none;
    max-width: 95%;
    word-break: break-all;
  }
`;

const DatasetSummaryContainer = styled.div`
  // width: 100%;
  // display: grid;
  margin: 0 auto;
  width: 1120px;
  margin-bottom: 80px;

  a[target="_blank"] {
    color: #00875E;
    background: url(${externalIcon}) right top no-repeat;
    // padding-left: 30px;
    padding-right: 30px;
    background-size: 32px;
    display: inline-table;
  }
`;

const DataLink = styled.li`
  text-decoration: none;
  list-style-type: none;
  display: inline;
`;

const ExternalLink = styled.li`
  display: flex;
  // display: inline;
`;

const DatasetType = styled.div`
  // width: 90%;
  text-align: center;
  margin-left: 972px;
  margin-top: -36px;
  text-transform: uppercase;
  font-size: 11px;
  font-family: Inter;

  span {
    color: #FFF;
    text-align: right;
    font-family: Poppins;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    text-transform: capitalize;
    background-color: transparent;
    border-radius: 20px;
    border: 1px solid #FFFFFF;
    padding: 5px 10px;
    line-height: 52px;
  }

  a {
    color: #212529;
    text-decoration: none;
  }
`;

const SummaryDatasetType = styled.div`
  width: 98%;
  text-align: right;
  text-transform: uppercase;
  font-size: 11px;
  font-family: Inter;

  span {
    color: #108461;
    text-align: right;
    font-family: Poppins;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 19.31px; /* 148.538% */
    text-transform: capitalize;
    background-color: transparent;
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
  background-image: linear-gradient(to right, #25b39a ,#0c3561); 
  border-radius: 5px;
  font-size: 27px;
  font-family: Inter;

  span {
    color: white;
    margin-left: 100px;
    text-decoration: inherit;
  }
`;

const SummaryIcon = styled.div`
  position: absolute;
  bottom: 10px;
  left: 20px;
  color: #004187;
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
  height: 40px;
`;

const DatasetTitle = styled.div`
  // width: 85%;
  color: #004187;
  // font-weight: 600;
  font-family: Lato;
  // font-size: 1.3rem;
  font-size: 23px;
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
  word-wrap: break-word;
  hyphens: auto;
  line-height: 32px;
  inline-size: 1000px;
`;

const ParticipatingResourceDetail = ({
  detail,
  datasets,
  onPageLoadDataresourceDetail,
  onPageLoadDataresourceDetailDatasets,
  onLoadGlossaryTerms,
  glossaryTerms,
}) => {
  const { id } = useParams();
  const [open, setOpen] = useState(true);
  let dataContentTypes = detail.data_content_type === undefined || detail.data_content_type === null ? "" : detail.data_content_type;
  dataContentTypes = dataContentTypes.split(',').sort().join(', ');
  let resourseLinks = detail.resource_uri === undefined || detail.resource_uri === null ? "" : detail.resource_uri;
  if (detail.resource_uri) { resourseLinks = resourseLinks.split(';'); }
  let pocLinks = detail.poc_email === undefined || detail.poc_email === null ? "" : detail.poc_email;
  if (detail.poc_email) { pocLinks = pocLinks.split(';'); }

  const getTooltipTermList = datasets.map((dt) => {
    return dt.primary_dataset_scope;
  });

  const initializePopover = () => {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map((popoverTriggerEl) => {
      return new Popover(popoverTriggerEl);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!detail.data_resource_id || detail.data_resource_id !== id) {
      onPageLoadDataresourceDetail(id).catch(error => {
        throw new Error(`Loading participating resource detail page failed ${error}`);
      });

      onPageLoadDataresourceDetailDatasets(id).catch(error => {
        throw new Error(`Loading participating resource detail datasets failed ${error}`);
      });
    }
  }, [id]);

  useEffect(() => {
    initializePopover();
  }, [detail, datasets, glossaryTerms]);

  useEffect(() => {
    if (detail && datasets) {
      const termSet = [...new Set(getTooltipTermList)].filter((term) => !(term in glossaryTerms));
      if (!(detail.resource_type in glossaryTerms)) {
        termSet.push(detail.resource_type);
      }
      const termPara = {termNames: termSet};
      if (termSet.length > 0) {
        onLoadGlossaryTerms(termPara).catch(error => {
          throw new Error(`Loading Glossary Terms from url query failed: ${error}`);
        });
      }
    }
  }, [detail, datasets]);

  return (
    <>
        <ParticipatingResourceResultContainer>
        {
            detail && (
              <div className="prContainer">
                <div className="prBreadcrumbContainer">
                  <ul className="breadcrumb">
                      <li><a href="/">Home</a></li>
                      <li><a href="/participatingresources">Participating Resources</a></li>
                      <li><Link to={`/resource/${detail.data_resource_id}`}>{detail.data_resource_id}</Link></li>
                  </ul>
                </div>
                <div className="prDetailHeaderContainer">
                  <div className="prDetailHeaderLabel">{detail.resource_name}</div>
                  <div className="prIcon">
                    {detail.data_resource_id ? <DataResourceIcons participatingResource={detail.data_resource_id} type="white" /> : null}
                  </div>
                  <span className="badge"><i className="far fa-file-alt" /></span>
                  <span className="badgeCount">{detail.datasets_total}</span>
                  <HeaderLinks>
                  <div className="prDetailHeaderContent">
                    {/* <SiteIcon /> */}
                    {resourseLinks[0] ? <ExternalLink><a className="prDetailExternalLink" href={resourseLinks[0]} target="_blank" rel="noreferrer noopener">{resourseLinks[0]}</a></ExternalLink> : null}
                    {resourseLinks[1] ? <ExternalLink><a className="prDetailExternalLink" href={resourseLinks[1]} target="_blank" rel="noreferrer noopener">{resourseLinks[1]}</a></ExternalLink> : null}
                    {resourseLinks[2] ? <ExternalLink><a className="prDetailExternalLink" href={resourseLinks[2]} target="_blank" rel="noreferrer noopener">{resourseLinks[2]}</a></ExternalLink> : null}
                  </div>
                  </HeaderLinks>
                  <HeaderLinks>
                  <div className="prDetailHeaderContent">
                    Point of Contact: &nbsp;
                    <span className="prDetailHeaderText">
                      {detail.poc ? detail.poc : null}
                      {detail.poc ? ', ' : null}
                      &nbsp;
                      {/* {detail.poc_email ? <DataLink><a className="prDetailHeaderLink" href={`mailto:${detail.poc_email}`}>{detail.poc_email}</a></DataLink> : null} */}
                      {pocLinks[0] && pocLinks[0].includes("@") ? <DataLink><a className="prDetailHeaderLink" href={`mailto:${pocLinks[0]}`}>{pocLinks[0]}</a></DataLink> : <DataLink><a className="prDetailHeaderLink" href={pocLinks[0]} target="_blank" rel="noreferrer noopener">{pocLinks[0]}</a></DataLink>}
                      {pocLinks[1] ? ', ' : null}
                      {pocLinks[1] && pocLinks[1].includes("@") ? <DataLink><a className="prDetailHeaderLink" href={`mailto:${pocLinks[1]}`}>{pocLinks[1]}</a></DataLink> : <DataLink><a className="prDetailHeaderLink" href={pocLinks[1]} target="_blank" rel="noreferrer noopener">{pocLinks[1]}</a></DataLink>}
                      {pocLinks[2] ? ', ' : null}
                      {pocLinks[2] && pocLinks[2].includes("@") ? <DataLink><a className="prDetailHeaderLink" href={`mailto:${pocLinks[2]}`}>{pocLinks[2]}</a></DataLink> : <DataLink><a className="prDetailHeaderLink" href={pocLinks[2]} target="_blank" rel="noreferrer noopener">{pocLinks[2]}</a></DataLink>}
                    </span>
                  </div>
                  </HeaderLinks>
                  <DatasetType>
                    <span data-bs-custom-class="custom-popover" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content={detail.resource_type && glossaryTerms[detail.resource_type]}>
                      {detail.resource_type}
                    </span>
                  </DatasetType>
                </div>
                <br />
              </div>
            )
        }
        </ParticipatingResourceResultContainer>
        <ParticipatingResourceGridContainer />
        <ParticipatingResourceResultContainer>
        {
            detail && (
              <ResourceBody>
              <div className="prContainer">
                <div className="prAboutContentContainer">
                  <div className="prAboutResourceContainer">
                    <div className="accordion-item-pr">
                      <h2 className="accordion-header-pr">
                        <div aria-hidden="true" onClick={() => setOpen(!open)} className={`accordion-button-pr accordion-button-ccdc-pr ${open ? "" : "collapsed"}`}>
                          About This Resource
                        </div>
                      </h2>
                      <Collapse in={open}>
                        <div id="collapse1">
                          <div className="prAboutResourceContent">
                            {detail.description && ReactHtmlParser(detail.description)}
                          </div>
                          <div className="prResourceToolsContainer">
                          <div className="prCoreDataLabel">Resource Description</div>
                          <div className="prDataElementLabel">Resource Type</div>
                          <div className="prDataElementContent">{detail.resource_type}</div>
                          <div className="prDataElementLabel">Specialization</div>
                          <div className="prDataElementContent">{detail.pediatric_specific > 0 ? "Pediatric" : "Mixed Adult and Pediatric"}</div>
                          <br />
                          <div className="prDataElementLabel">Data Update Date</div>
                          {detail.data_update_date ? <div className="prDataElementContent">{detail.data_update_date}</div> : null}
                          </div>
                          <div className="prDataAccessContainer">
                            <div className="prAdditionalDataLabel">Data Content Type</div>
                              <br />
                              {dataContentTypes}
                          </div>
                          <div className="prResourceToolsContainer">
                            <div className="prCoreDataLabel">Resource Tools</div>
                            <div>
                              <div className="prDataElementLabel">Visualization Tools</div>
                              <div className="prDataElementContent">{detail.visualization > 0 ? 'YES' : ''}</div>
                            </div>
                            <div>
                              <div className="prDataElementLabel">Analytic Tools</div>
                              <div className="prDataElementContent">{detail.analytics > 0 ? 'YES' : ''}</div>
                            </div>
                          </div>
                          <div className="prDataAccessContainer">
                            <div className="prAdditionalDataLabel">Data Access</div>
                            {/* <div className="prDataElementLabel">API (Internal)</div> */}
                            <br />
                              {
                                detail.api
                                ? detail.api.replace(';', ',').split(',').map((item, idx) => {
                                  const key = `sort_${idx}`;
                                  let newItem = item.trim();
                                  if (!newItem.startsWith("http")) {
                                    newItem = "".concat("https://", newItem);
                                  }
                                  return (
                                    <div key={key}><a href={newItem} target="_blank" rel="noreferrer noopener">{newItem}</a></div>
                                  );
                                })
                                : null
                              }
                          </div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </div>
              </ResourceBody>
            )
        }
        </ParticipatingResourceResultContainer>
        <ParticipatingResourceGridContainer />
        <ParticipatingResourceResultContainer>
        {
            detail && (
              <div className="prContainer">
                <br />
                <div className="prDatasetSummaryContainer" id="dataset_summaries">
                  <DatasetsSummary>
                    <SummaryIcon>
                      <img src={datasetsIcon} alt="datasets" />
                    </SummaryIcon>
                    <span>
                      DATASET SUMMARIES (
                      <span id="dataset_summaries_detail_count" style={{marginLeft: 0}}>{detail.datasets_total}</span>
                      )
                    </span>
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
                        {ds.dataset_name.length > 90 ? `${ds.dataset_name.substring(0, 90)}...` : ds.dataset_name}
                      </a>
                    </DatasetTitle>
                  </DatasetHeader>
                  <DatasetDesc>
                      {ds.case_disease_diagnosis ? <div className="summaryDataElementLabel">Case Disease Diagnosis</div> : null}
                      <div className="summaryDataElementContent">
                        {
                          ds.case_disease_diagnosis
                          ? ds.case_disease_diagnosis.slice(0, 10).map((cdd, cddidx) => {
                            const cddkey = `cdd_${cddidx}`;
                            return (
                              <span key={cddkey} className="itemSpan">
                                {cdd.n ? cdd.n : null}
                                &nbsp;(
                                {cdd.v ? cdd.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                {cddidx < 9 && cddidx !== ds.case_disease_diagnosis.length - 1 ? "); " : null}
                                {cddidx === 9 && cddidx !== ds.case_disease_diagnosis.length - 1 ? ") ..." : null}
                                {(cddidx < 9 || cddidx === 9) && cddidx === ds.case_disease_diagnosis.length - 1 ? ")" : null}
                              </span>
                            );
                          })
                          : null
                        }
                      </div>
                    {
                      ds.case_disease_diagnosis
                      ? <br />
                      : null
                    }
                    {ds.case_id
                      ? <div className="summaryDataElementLabel">Number of Cases</div>
                      : null}
                    {
                      ds.case_id
                      ? <div className="summaryDataElementContent">{ds.case_id.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                      : null
                    }
                    {
                      ds.case_id
                      ? <br />
                      : null
                    }
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
                                {cs.n ? cs.n : null}
                                &nbsp;(
                                {cs.v ? cs.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                {/* )&#59;&nbsp; */}
                                {csidx === ds.case_sex.length - 1 ? ")" : "); "}
                              </span>
                            );
                          })
                          : null
                        }
                      </div>
                    {
                      ds.case_sex
                      ? <br />
                      : null
                    }
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
                                {cad.n ? cad.n : null}
                                &nbsp;(
                                {cad.v ? cad.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                {/* )&#59;&nbsp; */}
                                {cadidx === ds.case_age_at_diagnosis.length - 1 ? ")" : "); "}
                              </span>
                            );
                          })
                          : null
                        }
                      </div>
                    {
                      ds.case_age_at_diagnosis
                      ? <br />
                      : null
                    }
                    {ds.published_in ? <div className="summaryDataElementLabel">Published In</div> : null}
                    {
                      ds.published_in && ds.published_in.split(";").map((link, linkidx) => {
                        const newlink = link.trim();
                        const linkkey = `link_${linkidx}`;
                        return (
                          <div key={linkkey} className={linkidx === 0 ? "summaryDataElementPublished" : null}><DataLink><a href={newlink} target="_blank" rel="noreferrer noopener">{newlink}</a></DataLink></div>
                        );
                      })
                    }
                  </DatasetDesc>
                  <SummaryDatasetType>
                    <span data-bs-custom-class="custom-popover" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content={glossaryTerms[ds.primary_dataset_scope]}>
                      {ds.primary_dataset_scope}
                    </span>
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
  onLoadGlossaryTerms: PropTypes.func.isRequired,
  glossaryTerms: PropTypes.object.isRequired,
};

export default ParticipatingResourceDetail;