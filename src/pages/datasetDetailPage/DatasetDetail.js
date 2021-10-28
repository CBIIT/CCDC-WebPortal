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

const ResourceType = styled.div`
  width: 96%;
  text-align: right;
  margin-top: -30px;
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
                  {/* <ResourceType>
                    <span>{content.primary_dataset_scope}</span>
                  </ResourceType> */}
                  {/* <span className="datasetTypeButton">
                    {content.primary_dataset_scope}
                  </span> */}
                  <div className="datasetDetailHeaderContent">
                    Data Resource: &nbsp;
                    {/* <span className="datasetDetailHeaderText">{content.data_resource_id}</span> */}
                    <Link to={`/resource/${content.data_resource_id}`} className="datasetDetailHeaderLink">{content.data_resource_id}</Link>
                  </div>
                  <div className="datasetDetailHeaderContent">
                    Point of Contact: &nbsp;
                    <span className="datasetDetailHeaderText">
                      {content.poc}
                      , &nbsp;
                      <Link to={content.poc_email} className="datasetDetailHeaderLink">{content.poc_email}</Link>
                    </span>
                  </div>
                  <ResourceType>
                    <span>{content.primary_dataset_scope}</span>
                  </ResourceType>
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
                                  &nbsp;(
                                  {cad.v}
                                  )&#59; &nbsp;
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
                                  &nbsp;(
                                  {ce.v}
                                  )&#59; &nbsp;
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
                                  &nbsp;(
                                  {cdd.v}
                                  )&#59; &nbsp;
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
                                  &nbsp;(
                                  {sam.v}
                                  )&#59; &nbsp;
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
                                  &nbsp;(
                                  {cr.v}
                                  )&#59; &nbsp;
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
                      {content.case_treatment_administered
                          ? <div className="dataElementLabel">Case Treatment Administered</div>
                          : null}
                        <div className="dataElementContent">
                          {
                            content.case_treatment_administered
                            ? content.case_treatment_administered.map((cta, ctaidx) => {
                              const ctakey = `cta_${ctaidx}`;
                              return (
                                <span key={ctakey} className="itemSpan">
                                  {cta.n}
                                  &nbsp;(
                                  {cta.v}
                                  )&#59; &nbsp;
                                </span>
                              );
                            })
                            : null
                          }
                        </div>
                        {content.published_in
                          ? <div className="dataElementLabel">Published In</div>
                          : null}
                        {
                          content.published_in
                          ? <Link to={content.published_in}>{content.published_in}</Link>
                          : null
                        }
                      <div className="additionalDataContent">
                        <div>
                        {
                          content.additional
                          ? content.additional.map((ade, adeidx) => {
                            const adekey = `ade_${adeidx}`;
                            return (
                              <div key={adekey} className="dataElementLabel">
                                {ade.attr_name}
                                <br />
                                {ade.attr_set.map((adee, adeeidx) => {
                                  const adeekey = `adee_${adeeidx}`;
                                  return (
                                    <div key={adeekey} className="additionalDataContent">
                                      {adee.k}
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })
                          : null
                        }
                        </div>
                      </div>
                      {/* <div className="dataElementLabel">File Type</div>
                        Unknown
                      <div className="dataElementLabel">Sample Type</div>
                        Unknown &nbsp; */}
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