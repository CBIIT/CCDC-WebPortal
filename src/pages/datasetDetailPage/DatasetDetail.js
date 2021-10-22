import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DataResourceIcons from '../../components/DataResourceIcons';
import './datasetDetailPage.css';

const DatasetResultContainer = styled.div`
  margin: 0 auto;
  width: 1200px;
  // display: grid;
`;

const path = window.location.pathname;
const page = path.split("/").pop();
// console.log(page);

const DatasetDetail = ({
  resultList,
//   onPageLoadSearchResults,
}) => {
  useEffect(() => {
    if (resultList.length === 0) {
    //   onPageLoadSearchResults().catch(error => {
    //     throw new Error(`Loading search catalog page datasets failed ${error}`);
    //   });
    }
  }, []);

  return (
    <>
        <DatasetResultContainer>
        {
            resultList.map((rst, idx) => {
                const key = `sr${idx}`;
                if (rst.content.dataset_id === page) {
                  return (
                    <div key={key} className="datasetContainer">
                      <div className="datasetBreadcrumbContainer">
                        <ul className="breadcrumb">
                            <li><a href="/">Home</a></li>
                            <li><a href="/search">Search Catalog</a></li>
                            <li><Link to={`/dataset/${rst.content.dataset_id}`}>{rst.content.dataset_name}</Link></li>
                            {/* <li><a href="/dataset">{rst.content.dataset_id}</a></li> */}
                        </ul>
                      </div>
                      <div className="datasetDetailHeaderContainer">
                        <div className="datasetDetailHeaderLabel">{rst.content.dataset_name}</div>
                        <div className="datasetIcon">
                          <DataResourceIcons participatingResource={rst.data_resource_id} />
                        </div>
                        <button type="button" className="datasetTypeButton btn">
                          <span>{rst.content.desc}</span>
                        </button>
                        <div className="datasetDetailHeaderContent">
                          Data Resource: &nbsp;
                          <span className="datasetDetailHeaderText">{rst.content.data_resource_id}</span>
                        </div>
                        <div className="datasetDetailHeaderContent">
                          Point of Contact: &nbsp;
                          <span className="datasetDetailHeaderText">
                            {rst.content.primary_dataset_scope}
                            , &nbsp;
                            {rst.content.poc}
                            &nbsp;
                          </span>
                        </div>
                      </div>
                      <div className="aboutContentContainer">
                        <div className="aboutDatasetContainer">
                          <div className="aboutDatasetLabel">About This Dataset</div>
                          <div className="coreDataContainer">
                            <div className="coreDataLabel">Core Data Elements</div>
                            <div className="dataElementLabel">Case Age</div>
                              {
                                rst.content.case_age_at_diagnosis.map((cad, cadidx) => {
                                  const cadkey = `cad_${cadidx}`;
                                  return (
                                    <span key={cadkey} className="itemSpan">
                                      {cad.n}
                                      &#59; &nbsp;
                                    </span>
                                  );
                                })
                              }
                            <div className="dataElementLabel">Case Ethnicity</div>
                              {
                                rst.content.case_ethnicity.map((ce, ceidx) => {
                                  const cekey = `ce_${ceidx}`;
                                  return (
                                    <span key={cekey} className="itemSpan">
                                      {ce.n}
                                      &#59; &nbsp;
                                    </span>
                                  );
                                })
                              }
                            <div className="dataElementLabel">Case Disease Diagnosis</div>
                              {
                                rst.content.case_disease_diagnosis.map((cdd, cddidx) => {
                                  const cddkey = `cdd_${cddidx}`;
                                  return (
                                    <span key={cddkey} className="itemSpan">
                                      {cdd.n}
                                      &#59; &nbsp;
                                    </span>
                                  );
                                })
                              }
                            <div className="dataElementLabel">Sample Assay Method</div>
                              {/* {
                                rst.content.sample_assay_method.map((sam, samidx) => {
                                  const samkey = `sam_${samidx}`;
                                  return (
                                    <span key={samkey} className="itemSpan">
                                      {sam.n}
                                      &#59; &nbsp;
                                    </span>
                                  );
                                })
                              } */}
                            <div className="dataElementLabel">Case Race</div>
                              {
                                rst.content.case_race.map((cr, cridx) => {
                                  const crkey = `cr_${cridx}`;
                                  return (
                                    <span key={crkey} className="itemSpan">
                                      {cr.n}
                                      &#59; &nbsp;
                                    </span>
                                  );
                                })
                              }
                            <div className="dataElementLabel">Case Sex</div>
                              {
                                rst.content.case_sex.map((cs, csidx) => {
                                  const cskey = `cdd_${csidx}`;
                                  return (
                                    <span key={cskey} className="itemSpan">
                                      {cs.n}
                                      &#59; &nbsp;
                                    </span>
                                  );
                                })
                              }
                            <div className="dataElementLabel">Number of Cases</div>
                              {rst.content.case_id}
                            <div className="dataElementLabel">Number of Samples</div>
                              {rst.content.sample_id}
                          </div>
                          <div className="additionalDataContainer">
                            <div className="additionalDataLabel">Additional Data Elements</div>
                            <div className="dataElementLabel">File Type</div>
                              Unknown
                            <div className="dataElementLabel">Sample Type</div>
                              Unknown
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return (null);
            })
        }
        </DatasetResultContainer>
    </>
  );
};

DatasetDetail.propTypes = {
  resultList: PropTypes.array.isRequired,
//   onPageLoadSearchResults: PropTypes.func.isRequired,
};

export default DatasetDetail;