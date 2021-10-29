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
                      {content.case_age
                          ? <div className="dataElementLabel">Case Age</div>
                          : null}
                        <div className="dataElementContent">
                          {
                            content.case_age
                            ? content.case_age.map((ca, caidx) => {
                              const cakey = `ca_${caidx}`;
                              return (
                                <span key={cakey} className="itemSpan">
                                  {ca.n}
                                  &nbsp;(
                                  {ca.v}
                                  )&#59; &nbsp;
                                </span>
                              );
                            })
                            : null
                          }
                        </div>
                        {content.case_age_at_diagnosis
                          ? <div className="dataElementLabel">Case Age At Diagnosis</div>
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
                        {content.case_age_at_trial
                          ? <div className="dataElementLabel">Case Age At Trial</div>
                          : null}
                        <div className="dataElementContent">
                          {
                            content.case_age_at_trial
                            ? content.case_age_at_trial.map((caat, caatidx) => {
                              const caatkey = `caat_${caatidx}`;
                              return (
                                <span key={caatkey} className="itemSpan">
                                  {caat.n}
                                  &nbsp;(
                                  {caat.v}
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
                        {content.case_disease_diagnosis
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
                        {content.case_sex_at_birth
                          ? <div className="dataElementLabel">Case Sex At Birth</div>
                          : null}
                        <div className="dataElementContent">
                          {
                            content.case_sex_at_birth
                            ? content.case_sex_at_birth.map((csab, csabidx) => {
                              const csabkey = `csab_${csabidx}`;
                              return (
                                <span key={csabkey} className="itemSpan">
                                  {csab.n}
                                  &nbsp;(
                                  {csab.v}
                                  )&#59; &nbsp;
                                </span>
                              );
                            })
                            : null
                          }
                        </div>
                        {content.case_gender
                          ? <div className="dataElementLabel">Case Gender</div>
                          : null}
                        <div className="dataElementContent">
                          {
                            content.case_gender
                            ? content.case_gender.map((cg, cgidx) => {
                              const cgkey = `cg_${cgidx}`;
                              return (
                                <span key={cgkey} className="itemSpan">
                                  {cg.n}
                                  &nbsp;(
                                  {cg.v}
                                  )&#59; &nbsp;
                                </span>
                              );
                            })
                            : null
                          }
                        </div>
                        {content.case_proband
                          ? <div className="dataElementLabel">Case Proband</div>
                          : null}
                        <div className="dataElementContent">
                          {
                            content.case_proband
                            ? content.case_proband.map((cp, cpidx) => {
                              const cpkey = `cp_${cpidx}`;
                              return (
                                <span key={cpkey} className="itemSpan">
                                  {cp.n}
                                  &nbsp;(
                                  {cp.v}
                                  )&#59; &nbsp;
                                </span>
                              );
                            })
                            : null
                          }
                        </div>
                        {content.case_id
                          ? <div className="dataElementLabel">Case ID</div>
                          : null}
                        {
                          content.case_id
                          ? content.case_id
                          : null
                        }
                        {/* <div className="dataElementLabel">Number of Cases</div>
                        {content.case_id} */}
                        {content.sample_id
                          ? <div className="dataElementLabel">Sample ID</div>
                          : null}
                        {
                          content.sample_id
                          ? content.sample_id
                          : null
                        }
                        {content.program_name
                          ? <div className="dataElementLabel">Program Name</div>
                          : null}
                        {
                          content.program_name
                          ? content.program_name
                          : null
                        }
                        {content.project_name
                          ? <div className="dataElementLabel">Project Name</div>
                          : null}
                        {
                          content.project_name
                          ? content.project_name
                          : null
                        }
                        {content.program_id
                          ? <div className="dataElementLabel">Program ID</div>
                          : null}
                        {
                          content.program_id
                          ? content.program_id
                          : null
                        }
                        {content.donor_age
                          ? <div className="dataElementLabel">Donor Age</div>
                          : null}
                        {
                          content.donor_age
                          ? content.donor_age
                          : null
                        }
                        {content.donor_disease
                          ? <div className="dataElementLabel">Donor Disease</div>
                          : null}
                        {
                          content.donor_disease
                          ? content.donor_disease
                          : null
                        }
                        {content.donor_sex
                          ? <div className="dataElementLabel">Donor Sex</div>
                          : null}
                        {
                          content.donor_sex
                          ? content.donor_sex
                          : null
                        }
                        {content.donor_id
                          ? <div className="dataElementLabel">Donor ID</div>
                          : null}
                        {
                          content.donor_id
                          ? content.donor_id
                          : null
                        }
                        {content.cell_line_id
                          ? <div className="dataElementLabel">Cell Line ID</div>
                          : null}
                        {
                          content.cell_line_id
                          ? content.cell_line_id
                          : null
                        }
                        {content.sample_repository_name
                          ? <div className="dataElementLabel">Sample Repository Name</div>
                          : null}
                        <div className="dataElementContent">
                          {
                            content.sample_repository_name
                            ? content.sample_repository_name.map((srn, srnidx) => {
                              const srnkey = `srn_${srnidx}`;
                              return (
                                <span key={srnkey} className="itemSpan">
                                  {srn.n}
                                  &nbsp;(
                                  {srn.v}
                                  )&#59; &nbsp;
                                </span>
                              );
                            })
                            : null
                          }
                        </div>
                        {content.sample_analyte_type
                          ? <div className="dataElementLabel">Sample Analyte Type</div>
                          : null}
                        <div className="dataElementContent">
                          {
                            content.sample_analyte_type
                            ? content.sample_analyte_type.map((sat, satidx) => {
                              const satkey = `sat_${satidx}`;
                              return (
                                <span key={satkey} className="itemSpan">
                                  {sat.n}
                                  &nbsp;(
                                  {sat.v}
                                  )&#59; &nbsp;
                                </span>
                              );
                            })
                            : null
                          }
                        </div>
                        {content.sample_anatomic_site
                          ? <div className="dataElementLabel">Sample Anatomic Type</div>
                          : null}
                        <div className="dataElementContent">
                          {
                            content.sample_anatomic_site
                            ? content.sample_anatomic_site.map((sat, satidx) => {
                              const satkey = `sat_${satidx}`;
                              return (
                                <span key={satkey} className="itemSpan">
                                  {sat.n}
                                  &nbsp;(
                                  {sat.v}
                                  )&#59; &nbsp;
                                </span>
                              );
                            })
                            : null
                          }
                        </div>
                        {content.sample_composition_type
                          ? <div className="dataElementLabel">Sample Composition Type</div>
                          : null}
                        <div className="dataElementContent">
                          {
                            content.sample_composition_type
                            ? content.sample_composition_type.map((sct, sctidx) => {
                              const sctkey = `sct_${sctidx}`;
                              return (
                                <span key={sctkey} className="itemSpan">
                                  {sct.n}
                                  &nbsp;(
                                  {sct.v}
                                  )&#59; &nbsp;
                                </span>
                              );
                            })
                            : null
                          }
                        </div>
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
                        {content.case_treatment_outcome
                          ? <div className="dataElementLabel">Case Treatment Outcome</div>
                          : null}
                        <div className="dataElementContent">
                          {
                            content.case_treatment_outcome
                            ? content.case_treatment_outcome.map((cto, ctoidx) => {
                              const ctokey = `cto_${ctoidx}`;
                              return (
                                <span key={ctokey} className="itemSpan">
                                  {cto.n}
                                  &nbsp;(
                                  {cto.v}
                                  )&#59; &nbsp;
                                </span>
                              );
                            })
                            : null
                          }
                        </div>
                        {content.case_tumor_site
                          ? <div className="dataElementLabel">Case Tumor Site</div>
                          : null}
                        <div className="dataElementContent">
                          {
                            content.case_tumor_site
                            ? content.case_tumor_site.map((cts, ctsidx) => {
                              const ctskey = `cts_${ctsidx}`;
                              return (
                                <span key={ctskey} className="itemSpan">
                                  {cts.n}
                                  &nbsp;(
                                  {cts.v}
                                  )&#59; &nbsp;
                                </span>
                              );
                            })
                            : null
                          }
                        </div>
                        {content.sample_is_normal
                          ? <div className="dataElementLabel">Sample Is Normal</div>
                          : null}
                        <div className="dataElementContent">
                          {
                            content.sample_is_normal
                            ? content.sample_is_normal.map((sin, sinidx) => {
                              const sinkey = `sin_${sinidx}`;
                              return (
                                <span key={sinkey} className="itemSpan">
                                  {sin.n > 0 ? 'YES ' : 'NO '}
                                </span>
                              );
                            })
                            : null
                          }
                        </div>
                        {content.sample_is_xenograft
                          ? <div className="dataElementLabel">Sample Is Xenograft</div>
                          : null}
                        <div className="dataElementContent">
                          {
                            content.sample_is_xenograft
                            ? content.sample_is_xenograft.map((six, sixidx) => {
                              const sixkey = `six_${sixidx}`;
                              return (
                                <span key={sixkey} className="itemSpan">
                                  {six.n > 0 ? 'YES' : 'NO'}
                                </span>
                              );
                            })
                            : null
                          }
                        </div>
                      {/* <div className="dataElementLabel">Number of Samples</div>
                        {content.sample_id} */}
                    </div>
                    <div className="additionalDataContainer">
                      <div className="additionalDataLabel">Additional Data Elements</div>
                        {content.projects
                          ? <div className="dataElementLabel">Projects</div>
                          : null}
                        <div className="dataElementContent">
                          {
                            content.projects
                            ? content.projects.map((pro, proidx) => {
                              const prokey = `pro_${proidx}`;
                              return (
                                <span key={prokey} className="itemSpan">
                                  {pro.p_k}
                                  , &nbsp;
                                  {pro.p_v.map((prov, providx) => {
                                    const provkey = `prov_${providx}`;
                                    return (
                                      <span key={provkey} className="itemSpan">
                                        {prov.k}
                                        &nbsp;(
                                        {prov.v}
                                        )&#59; &nbsp;
                                      </span>
                                    );
                                  })}
                                </span>
                              );
                            })
                            : null
                          }
                        </div>
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
                                        &nbsp;(
                                        {adee.v}
                                        )&#59; &nbsp;
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
                  <br />
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