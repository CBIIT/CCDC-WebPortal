import React, {useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DataResourceIcons from '../../components/DataResourceIcons';
import './datasetDetailPage.css';

const DatasetResultContainer = styled.div`
  margin: 0 auto;
  width: 1200px;
`;

const DatasetDetail = ({
  details,
  onPageLoadDatasetDetail,
}) => {
  const { id } = useParams();
  const content = details[id];

  useEffect(() => {
    if (!content) {
      onPageLoadDatasetDetail(id).catch(error => {
        throw new Error(`Loading dataset detail page failed ${error}`);
      });
    }
  }, []);

  return (
    <>
        <DatasetResultContainer>
        {
            content && (
              <div className="datasetContainer">
                <div className="datasetBreadcrumbContainer">
                  <ul className="breadcrumb">
                      <li><a href="/">Home</a></li>
                      <li><a href="/search">Search Catalog</a></li>
                      <li><Link to={`/dataset/${content.dataset_id}`}>{content.dataset_name}</Link></li>
                  </ul>
                </div>
                <div className="datasetDetailHeaderContainer">
                  <div className="datasetDetailHeaderLabel">{content.dataset_name}</div>
                  <div className="datasetIcon">
                    <DataResourceIcons participatingResource={content.data_resource_id} />
                  </div>
                  <button type="button" className="datasetTypeButton btn">
                    {content.primary_dataset_scope}
                  </button>
                  <div className="datasetDetailHeaderContent">
                    Data Resource: &nbsp;
                    <span className="datasetDetailHeaderText">{content.data_resource_id}</span>
                  </div>
                  <div className="datasetDetailHeaderContent">
                    Point of Contact: &nbsp;
                    <span className="datasetDetailHeaderText">
                      {content.poc}
                      , &nbsp;
                      {content.poc_email}
                    </span>
                  </div>
                </div>
                <div className="aboutContentContainer">
                  <div className="aboutDatasetContainer">
                    <div className="aboutDatasetLabel">About This Dataset</div>
                    <div className="coreDataContainer">
                      <div className="coreDataLabel">Core Data Elements</div>
                      {/* <div className="dataElementLabel">Case Age</div> */}
                        {content.case_age_at_diagnosis
                          ? <div className="dataElementLabel">Case Age</div>
                          : null}
                      <div className="dataElementContent">
                        {
                          content.case_age_at_diagnosis
                          ? content.case_age_at_diagnosis.map((cad, cadidx) => {
                            const cadkey = `cad_${cadidx}`;
                            return (
                              <span key={cadkey} className="itemSpan">
                                {cad.n}
                                &#59; &nbsp;
                              </span>
                            );
                          })
                          : null
                        }
                      </div>
                        {content.case_ethnicity
                          ? <div className="dataElementLabel">Case Ethnicity</div>
                          : null}
                      <div className="dataElementContent">
                        {
                          content.case_ethnicity
                          ? content.case_ethnicity.map((ce, ceidx) => {
                            const cekey = `ce_${ceidx}`;
                            return (
                              <span key={cekey} className="itemSpan">
                                {ce.n}
                                &#59; &nbsp;
                              </span>
                            );
                          })
                          : null
                        }
                      </div>
                        {content.case_ethnicity
                          ? <div className="dataElementLabel">Case Disease Diagnosis</div>
                          : null}
                      <div className="dataElementContent">
                        {
                          content.case_disease_diagnosis
                          ? content.case_disease_diagnosis.map((cdd, cddidx) => {
                            const cddkey = `cdd_${cddidx}`;
                            return (
                              <span key={cddkey} className="itemSpan">
                                {cdd.n}
                                &#59; &nbsp;
                              </span>
                            );
                          })
                          : null
                        }
                      </div>
                      {/* <div className="dataElementLabel">Sample Assay Method</div> */}
                        {content.sample_assay_method
                          ? <div className="dataElementLabel">Sample Assay Method</div>
                          : null}
                      <div className="dataElementContent">
                        {
                          content.sample_assay_method
                          ? content.sample_assay_method.map((sam, samidx) => {
                            const samkey = `sam_${samidx}`;
                            return (
                              <span key={samkey} className="itemSpan">
                                {sam.n}
                                &#59; &nbsp;
                              </span>
                            );
                          })
                          : null
                        }
                      </div>
                        {content.case_race
                          ? <div className="dataElementLabel">Case Race</div>
                          : null}
                      <div className="dataElementContent">
                        {
                          content.case_race
                          ? content.case_race.map((cr, cridx) => {
                            const crkey = `cr_${cridx}`;
                            return (
                              <span key={crkey} className="itemSpan">
                                {cr.n}
                                &#59; &nbsp;
                              </span>
                            );
                          })
                          : null
                        }
                      </div>
                        {content.case_sex
                          ? <div className="dataElementLabel">Case Sex</div>
                          : null}
                      <div className="dataElementContent">
                        {
                          content.case_sex
                          ? content.case_sex.map((cs, csidx) => {
                            const cskey = `cdd_${csidx}`;
                            return (
                              <span key={cskey} className="itemSpan">
                                {cs.n}
                                &#59; &nbsp;
                              </span>
                            );
                          })
                          : null
                        }
                      </div>
                        {content.case_id
                          ? <div className="dataElementLabel">Number of Cases</div>
                          : null}
                        {
                          content.case_id
                          ? content.case_id
                          : null
                        }
                      {/* <div className="dataElementLabel">Number of Cases</div>
                        {content.case_id} */}
                        {content.sample_id
                          ? <div className="dataElementLabel">Number of Samples</div>
                          : null}
                        {
                          content.sample_id
                          ? content.sample_id
                          : null
                        }
                      {/* <div className="dataElementLabel">Number of Samples</div>
                        {content.sample_id} */}
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
            )
        }
        </DatasetResultContainer>
    </>
  );
};

DatasetDetail.propTypes = {
  details: PropTypes.object.isRequired,
  onPageLoadDatasetDetail: PropTypes.func.isRequired,
};

export default DatasetDetail;