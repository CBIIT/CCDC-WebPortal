import React, {useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DataResourceIcons from '../../components/DataResourceIcons';
import headerExternalIcon from "../../assets/img/dataset-header.svg";
import externalIcon from "../../assets/img/dataset-body.svg";
import './datasetDetailPage.css';

const DatasetResultContainer = styled.div`
  margin: 0 auto;
  width: 1200px;
  // overflow-x: hidden;
`;

const DatasetGridContainer = styled.div`
  // margin: 100px 0 100px 0;
  border-top: 1px solid #BFD3E1;
`;

const HeaderLinks = styled.div`
  a[target="_blank"] {
    background: url(${headerExternalIcon}) right center no-repeat;
    padding-right: 30px;
    background-size: 32px;
    display: inline-table;
  }
`;

const DatasetBody = styled.div`
  a[target="_blank"] {
    // color: #004187;
    background: url(${externalIcon}) right no-repeat;
    padding-right: 30px;
    background-size: 32px;
    // display: inline-table;
  }
`;

const ResourceType = styled.div`
  width: 96%;
  text-align: right;
  margin-top: -44px;
  text-transform: uppercase;
  font-size: 11px;
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

const sortingAdditionalElement = (content) => {
  if (content === undefined) {
    return [];
  }
  const result = [];
  if (content.published_in) {
    result.push("published in");
  }
  if (content.projects) {
    result.push("projects");
  }
  if (content.additional) {
    content.additional.forEach((ade) => {
      result.push(ade.attr_name.toLowerCase());
    });
  }
  return result.sort();
};

const DatasetDetail = ({
  details,
  onPageLoadDatasetDetail,
}) => {
  const { id } = useParams();
  const content = details[id];
  const tooltips = {
    Aliquot: "Pertaining to a portion of the whole; any one of two or more samples of something, of the same volume or weight. [NCIt C25414]",
    Assay: "An examination or analysis of material, or of its prior assay, to determine the material's features or components.",
    Case: "A collection of data related to a specific individual in the context of a specific project.",
    "Cell Line": "A cell culture developed from a single cell or group of similar cells and therefore consisting of cells with a uniform genetic makeup that can be reproduced for various types of research. A cell line is different than a tissue sample in that it is grown as a culture of identical cells and can be reproduced indefinitely.",
    Collection: "A group of datasets collected together for any reason by an organization of researchers, stewards, or stakeholders either pertaining to a common theme or for a common purpose. For example, the Treehouse Childhood Cancer Initiative maintains a collection of cell line data as part of their repository of pediatric cancer genomic data.",
    Donor: "A donor is an individual (either human or animal) from which tissue for grafting, tissue for creating a cell line, or tumor sample for studying was taken. In these contexts the datasets are not associated with clinical or project cases. Minimal information about a donor helps describe the grafted tissue, the cell line, or the tumor sample.",
    Knowledgebase: "Biomedical knowledgebases extract, accumulate, organize, annotate, and link the growing body of information that is related to and relies on core datasets.",
    Program: "A coherent assembly of plans, project activities, and supporting resources contained within an administrative framework, the purpose of which is to implement an organization's mission or some specific program-related aspect of that mission.",
    Project: "Any specifically defined piece of work that is undertaken or attempted to meet the goals of a program and that involves one or more case studies. Also known as a Study or Trial.",
    Sample: "Material taken from a biological entity for testing, diagnostic, propagation, treatment or research purposes, including a sample obtained from a living organism or taken from the biological object after halting of all its life functions. A sample, also known as a biospecimen, can contain one or more components including but not limited to cellular molecules, cells, tissues, organs, body fluids, embryos, and body excretory products. {Based on the GDC definition of Sample. (https://docs.gdc.cancer.gov/Data_Dictionary/viewer/#?view=table-definition-view&id=sample)}",
    Xenograft: "Cells, tissues, or organs from a donor that are transplanted into a recipient of another species.",
    "primary dataset scope": "primary dataset scope"
  };
  window.scrollTo(0, 0);
  const additionalDict = {};
  if (content && content.additional) {
    content.additional.forEach((adt) => {
      additionalDict[adt.attr_name.toLowerCase()] = adt.attr_set;
    });
  }
  let pocLinks = !content || content.poc_email === undefined || content.poc_email === null ? "" : content.poc_email;
  if (pocLinks) { pocLinks = pocLinks.split(';'); }
  const sortedAdditonals = sortingAdditionalElement(content);
  const grantIDs = [];
  const grantNames = [];
  const grants = new Map();
  if (sortedAdditonals) {
    sortedAdditonals.forEach((ad) => {
      if (ad.toUpperCase() === "GRANT ID") {
        additionalDict[ad].forEach((item, i) => {
          grantIDs[i] = item.k.substring(0, 13);
        });
      }
      if (ad.toUpperCase() === "GRANT NAME") {
        additionalDict[ad].forEach((item, i) => {
          grantNames[i] = item.k;
        });
      }
    });
  }
  for (let i = 0; i < grantIDs.length; i += 1) {
    if (grantNames[i] === null) {
      grants.set(grantIDs[i], grantNames[i - 1]);
    }
    grants.set(grantIDs[i], grantNames[i]);
  }
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
                      <li><Link to={`/dataset/${content.dataset_id}`}>{content.dataset_name.length > 130 ? `${content.dataset_name.substring(0, 130)}...` : content.dataset_name}</Link></li>
                  </ul>
                </div>
                <div className="datasetDetailHeaderContainer">
                  {content.dataset_name.length > 0 && content.dataset_name.length <= 60 ? <div className="datasetDetailHeaderLabel">{content.dataset_name}</div> : null}
                  {content.dataset_name.length > 60 && content.dataset_name.length <= 100 ? <div className="datasetDetailHeaderLabel2">{content.dataset_name}</div> : null}
                  {content.dataset_name.length > 100 && content.dataset_name.length <= 170 ? <div className="datasetDetailHeaderLabel3">{content.dataset_name}</div> : null}
                  {content.dataset_name.length > 170 ? <div className="datasetDetailHeaderLabel4">{content.dataset_name}</div> : null}
                  {/* <div className="datasetDetailHeaderLabel">{content.dataset_name.substring(0, 180)}</div> */}
                  <div className="datasetIcon">
                    {content.data_resource_id ? <DataResourceIcons participatingResource={content.data_resource_id} type="white" /> : null}
                  </div>
                  <div className="datasetDetailHeaderContent">
                    Data Resource: &nbsp;
                    <Link to={`/resource/${content.data_resource_id}`} className="datasetDetailHeaderLink">{content.data_resource_id}</Link>
                  </div>
                  <HeaderLinks>
                  <div className="datasetDetailHeaderContent">
                    Point of Contact: &nbsp;
                    <span className="datasetDetailHeaderText">
                      {content.poc ? content.poc : null}
                      {content.poc ? ', ' : null}
                      &nbsp;
                      {/* {content.poc_email ? <a href={`mailto:${content.poc_email}`} className="datasetDetailHeaderLink" target="_blank" rel="noreferrer noopener">{content.poc_email}</a> : null} */}
                      {pocLinks[0] && pocLinks[0].includes("@") ? <a className="datasetDetailHeaderLink" href={`mailto:${pocLinks[0]}`}>{pocLinks[0]}</a> : <a className="datasetDetailHeaderLink" href={pocLinks[0]} target="_blank" rel="noreferrer noopener">{pocLinks[0]}</a>}
                      {pocLinks[1] ? ', ' : null}
                      {pocLinks[1] && pocLinks[1].includes("@") ? <a className="datasetDetailHeaderLink" href={`mailto:${pocLinks[1]}`}>{pocLinks[1]}</a> : <a className="datasetDetailHeaderLink" href={pocLinks[1]} target="_blank" rel="noreferrer noopener">{pocLinks[1]}</a>}
                      {pocLinks[2] ? ', ' : null}
                      {pocLinks[2] && pocLinks[2].includes("@") ? <a className="datasetDetailHeaderLink" href={`mailto:${pocLinks[2]}`}>{pocLinks[2]}</a> : <a className="datasetDetailHeaderLink" href={pocLinks[2]} target="_blank" rel="noreferrer noopener">{pocLinks[2]}</a>}
                    </span>
                  </div>
                  </HeaderLinks>
                  <ResourceType>
                    <span
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title={tooltips[content.primary_dataset_scope]}
                    >
                      {content.primary_dataset_scope}
                    </span>
                  </ResourceType>
                </div>
                <br />
              </div>
            )
        }
        </DatasetResultContainer>
        <DatasetGridContainer />
        <DatasetResultContainer>
        {
            content && (
              <DatasetBody>
              <div className="datasetContainer">
                <div className="aboutContentContainer">
                  <div className="aboutDatasetContainer">
                    <div className="aboutDatasetLabel">About This Dataset</div>
                    <div className="aboutDatasetContent">{content.desc ? content.desc : null}</div>
                    <div className="coreDataContainer">
                      <div className="coreDataLabel">Core Data Elements</div>
                      {/* <div className="dataElementLabel">Case Age</div> */}
                      {content.case_id
                        ? <div className="dataElementLabel">Number of Cases</div>
                        : null}
                      {
                        content.case_id
                        ? content.case_id.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : null
                      }
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
                                  {cs.n ? cs.n : null}
                                  &nbsp;(
                                  {/* {" ("} */}
                                  {cs.v ? cs.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {/* )&#59;&nbsp; */}
                                  {csidx === content.case_sex.length - 1 ? ")" : "); "}
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
                                  {csab.n ? csab.n : null}
                                  &nbsp;(
                                  {csab.v ? csab.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {/* )&#59;&nbsp; */}
                                  {csabidx === content.case_sex_at_birth.length - 1 ? ")" : "); "}
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
                                  {cg.n ? cg.n : null}
                                  &nbsp;(
                                  {cg.v ? cg.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {/* )&#59;&nbsp; */}
                                  {cgidx === content.case_gender.length - 1 ? ")" : "); "}
                                </span>
                              );
                            })
                            : null
                          }
                        </div>
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
                                  {ca.n ? ca.n : null}
                                  &nbsp;(
                                  {ca.v ? ca.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {/* )&#59;&nbsp; */}
                                  {caidx === content.case_age.length - 1 ? ")" : "); "}
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
                                  {cad.n ? cad.n : null}
                                  &nbsp;(
                                  {cad.v ? cad.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {/* )&#59;&nbsp; */}
                                  {cadidx === content.case_age_at_diagnosis.length - 1 ? ")" : "); "}
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
                                  {caat.n ? caat.n : null}
                                  &nbsp;(
                                  {caat.v ? caat.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {/* )&#59;&nbsp; */}
                                  {caatidx === content.case_age_at_trial.length - 1 ? ")" : "); "}
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
                                  {cr.n ? cr.n : null}
                                  &nbsp;(
                                  {cr.v ? cr.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {/* )&#59;&nbsp; */}
                                  {cridx === content.case_race.length - 1 ? ")" : "); "}
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
                                  {ce.n ? ce.n : null}
                                  &nbsp;(
                                  {ce.v ? ce.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {/* )&#59;&nbsp; */}
                                  {ceidx === content.case_ethnicity.length - 1 ? ")" : "); "}
                                </span>
                              );
                            })
                            : null
                          }
                        </div>
                        {content.case_disease_diagnosis
                          ? <div className="dataElementLabel">Case Disease Diagnosis</div>
                          : null}
                        <div className="dataElementContentAllCaps">
                          {
                            content.case_disease_diagnosis
                            ? content.case_disease_diagnosis.map((cdd, cddidx) => {
                              const cddkey = `cdd_${cddidx}`;
                              return (
                                <span key={cddkey} className="itemSpan">
                                  {cdd.n ? cdd.n : null}
                                  &nbsp;(
                                  {cdd.v ? cdd.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {/* )&#59;&nbsp; */}
                                  {cddidx === content.case_disease_diagnosis.length - 1 ? ")" : "); "}
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
                                  {cts.n ? cts.n : null}
                                  &nbsp;(
                                  {cts.v ? cts.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {/* )&#59;&nbsp; */}
                                  {ctsidx === content.case_tumor_site.length - 1 ? ")" : "); "}
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
                                  {cta.n ? cta.n : null}
                                  &nbsp;(
                                  {cta.v ? cta.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {/* )&#59;&nbsp; */}
                                  {ctaidx === content.case_treatment_administered.length - 1 ? ")" : "); "}
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
                                  {cto.n ? cto.n : null}
                                  &nbsp;(
                                  {cto.v ? cto.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {/* )&#59;&nbsp; */}
                                  {ctoidx === content.case_treatment_outcome.length - 1 ? ")" : "); "}
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
                                  {cp.n ? cp.n : null}
                                  &nbsp;(
                                  {cp.v ? cp.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {/* )&#59;&nbsp; */}
                                  {cpidx === content.case_proband.length - 1 ? ")" : "); "}
                                </span>
                              );
                            })
                            : null
                          }
                        </div>
                        {content.sample_id
                          ? <div className="dataElementLabel">Number of Samples</div>
                          : null}
                        {
                          content.sample_id
                          ? content.sample_id.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
                                  {srn.n ? srn.n : null}
                                  {/* )&#59;&nbsp; */}
                                  {srnidx === content.sample_repository_name.length - 1 ? ")" : "); "}
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
                                  {sam.n ? sam.n : null}
                                  &nbsp;(
                                  {sam.v ? sam.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {/* )&#59;&nbsp; */}
                                  {samidx === content.sample_assay_method.length - 1 ? ")" : "); "}
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
                                  {sat.n ? sat.n : null}
                                  &nbsp;(
                                  {sat.v ? sat.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {/* )&#59;&nbsp; */}
                                  {satidx === content.sample_analyte_type.length - 1 ? ")" : "); "}
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
                                  {sat.n ? sat.n : null}
                                  &nbsp;(
                                  {sat.v ? sat.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {/* )&#59;&nbsp; */}
                                  {satidx === content.sample_anatomic_site.length - 1 ? ")" : "); "}
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
                                  {sct.n ? sct.n : null}
                                  &nbsp;(
                                  {sct.v ? sct.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {/* )&#59;&nbsp; */}
                                  {sctidx === content.sample_composition_type.length - 1 ? ")" : "); "}
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
                                  {/* {sin.n > 0 ? 'YES ' : 'NO '} */}
                                  {sin.n ? sin.n : null}
                                  &nbsp;(
                                  {sin.v ? sin.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {sinidx === content.sample_is_normal.length - 1 ? ")" : "); "}
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
                                  {/* {six.n > 0 ? 'YES' : 'NO'} */}
                                  {six.n ? six.n : null}
                                  &nbsp;(
                                  {six.v ? six.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}
                                  {sixidx === content.sample_is_xenograft.length - 1 ? ")" : "); "}
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
                        {
                          sortedAdditonals.map((ad, adIdx) => {
                            const adkey = `ad_${adIdx}`;
                            if (ad === "published in") {
                              let publishedLinks = content.published_in === undefined || content.published_in === null ? "" : content.published_in;
                              if (content.published_in) { publishedLinks = publishedLinks.split(';'); }
                              return (
                                <>
                                  <div className="dataElementLabel">Published In</div>
                                  <div className="dataElementContentPublished">
                                    {publishedLinks[0] ? <a href={publishedLinks[0]} className="dataElementContentPublished" target="_blank" rel="noreferrer noopener">{publishedLinks[0]}</a> : null}
                                    <div>{publishedLinks[1] ? <a href={publishedLinks[1]} className="dataElementContentPublished" target="_blank" rel="noreferrer noopener">{publishedLinks[1]}</a> : null}</div>
                                    <div>{publishedLinks[2] ? <a href={publishedLinks[2]} className="dataElementContentPublished" target="_blank" rel="noreferrer noopener">{`${publishedLinks[2]}`}</a> : null}</div>
                                    {/* <a href={content.published_in} target="_blank" rel="noreferrer noopener">{content.published_in}</a> */}
                                  </div>
                                </>
                              );
                            }
                            if (ad === "projects") {
                              return (
                                <>
                                  <div className="dataElementLabel">Projects</div>
                                  <div className="dataElementContent">
                                    {
                                      content.projects.map((pro, proidx) => {
                                        const prokey = `pro_${proidx}`;
                                        return (
                                          <span key={prokey} className="itemSpan">
                                            {pro.p_k}
                                            ,&nbsp;
                                            {pro.p_v.map((prov, providx) => {
                                              const provkey = `prov_${providx}`;
                                              return (
                                                <span key={provkey} className="itemSpan">
                                                  {prov.k}
                                                  &nbsp;(
                                                  {prov.v && prov.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                  {proidx === content.projects.length - 1 ? ")" : "); "}
                                                </span>
                                              );
                                            })}
                                          </span>
                                        );
                                      })
                                    }
                                  </div>
                                </>
                              );
                            }
                            if (ad.toUpperCase() === "GRANT ID") {
                              return (
                                <>
                                  <div className="dataElementLabel">Grant Information</div>
                                  <div>
                                    {grantIDs.map((item) => {
                                      return (
                                        <table className="table table-borderless">
                                          <tbody>
                                            <tr>
                                              {grants.get(item) ? <td><div className="grantIDDataContainer">{item}</div></td> : null}
                                              {grants.get(item) ? <td><div className="grantNameDataContainer">{grants.get(item)}</div></td> : null}
                                              {/* <td><div className="grantNameDataContainer">{grants.get(item)}</div></td> */}
                                              {/* <td>{item}</td> */}
                                              {/* <td>{grants.get(item)}</td> */}
                                            </tr>
                                          </tbody>
                                        </table>
                                      );
                                    })}
                                  </div>
                                </>
                              );
                            }
                            return (
                              <div>
                                <div key={adkey} className="dataElementLabel">
                                  {ad.toUpperCase() === "GRANT ID" || ad.toUpperCase() === "GRANT NAME" ? null : ad.toUpperCase()}
                                  {ad.toUpperCase() === "GRANT ID" || ad.toUpperCase() === "GRANT NAME" ? null : <br />}
                                  {additionalDict[ad].map((adee, adeeidx) => {
                                    if (ad.toUpperCase() !== "GRANT ID" && ad.toUpperCase() !== "GRANT NAME") {
                                      const adeekey = `adee_${adeeidx}`;
                                      let additonalText = adee.k === undefined ? "" : adee.k;
                                      if (adee.k) { additonalText = additonalText.split(';'); }
                                      return (
                                        <div key={adeekey} className="additionalDataContent">
                                          {additonalText[0] && ((additonalText[0].includes("https:")) || (additonalText[0].includes("http:"))) ? <div><a className="additionalDataLinks" href={additonalText[0]} target="_blank" rel="noreferrer noopener">{additonalText[0]}</a></div> : null}
                                          {additonalText[1] && ((additonalText[1].includes("https:")) || (additonalText[1].includes("http:"))) ? <div><a className="additionalDataLinks" href={additonalText[1]} target="_blank" rel="noreferrer noopener">{additonalText[1]}</a></div> : null}
                                          {additonalText[2] && ((additonalText[2].includes("https:")) || (additonalText[2].includes("http:"))) ? <a className="additionalDataLinks" href={additonalText[2]} target="_blank" rel="noreferrer noopener">{additonalText[2]}</a> : null}
                                          {(adee.k.includes("phs00")) ? <a className="additionalDataLinks" href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${adee.k}`} target="_blank" rel="noreferrer noopener">{adee.k}</a> : null}
                                          {(adee.k.includes("https:") || adee.k.includes("http:") || adee.k.includes("phs00")) ? null : adee.k}
                                          {adee.v === -1
                                            ? null
                                            : (
                                                <span key={adeekey} className="itemSpan">
                                                  &nbsp;(
                                                  {adee.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                  )&#59; &nbsp;
                                                </span>
                                              )}
                                        </div>
                                      );
                                    }
                                    return (
                                      null
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })
                        }
                    </div>
                  </div>
                  <br />
                </div>
              </div>
              </DatasetBody>
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