import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Popover } from 'bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DataResourceIcons from '../../components/DataResourceIcons';
import headerExternalIcon from "../../assets/img/dataset-header.svg";
import externalIcon from "../../assets/img/dataset-body.svg";
import './datasetDetailPage.css';
import DonutChart from '../../components/common/DonutChart';
import Histogram from '../../components/common/Histogram';

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
  }

  .datasetDesLinks {
    margin-top: 10px;
    color: #00a272;
    text-transform: none;
    max-width: 95%;
    word-break: break-all;
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

  a {
    color: #212529;
    text-decoration: none;
  }
`;

const GraphicsContainer = styled.div`
  width: 100%;

  .show > .customizedToggle  {
    color: #b98e2f;
    background-color: transparent;
    border-color: transparent;
    box-shadow: transparent;
  }

  .show > .customizedToggle:focus  {
    box-shadow: none;
  }

  .customizedToggle:focus  {
    box-shadow: none;
  }

  .dropdown {
    position: inherit;
  }

  .customizedToggle {
    padding: 5px 5px 5px 5px;
    margin-top: 10px;
    color: #b98e2f;
    font-size: 16px;
    font-family: Lato;
    text-transform: uppercase;
    background-color: transparent;
    border-color: transparent;
  }

  .customizedToggle::before {
    display: inline-block;
    margin-right: 17px;
    margin-bottom: -2.5px;
    vertical-align: 0.255em;
    content: "";
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
    color: #7A9ABD;
    font-size: 23px;
  }

  .show > .customizedToggle::before {
    border-bottom: 0.3em solid;
    border-top: 0;
  }

  .customizedToggle::after {
    display: none;
  }

  .dropdownElementLabel {
    padding: 5px 5px 5px 5px;
    color: #b98e2f;
    font-size: 16px;
    font-family: Lato;
    text-transform: uppercase;
  }

  .dropdownElementLabel:hover {
    color: black;
    background-color: #F3F3F3;
  }

  .customizedDropdownMenu {
    background-color: #F3F3F3;
    padding: 5px 30px;
    box-shadow: 5px 10px 18px #888888;
    z-index: 99;
  }

  .chartContainer {
    padding: 25px 0px;
  }
`;

const sortingAdditionalElement = (content) => {
  const idArray = [];
  const result = [];
  if (content === undefined) {
    return [];
  }
  if (content.published_in) {
    result.push("PUBLISHED IN");
  }
  if (content.projects) {
    result.push("PROJECTS");
  }
  if (content.additional) {
    content.additional.forEach((ade) => {
      if (ade.attr_name === 'Clinical Trial Identifier' || ade.attr_name === 'dbGaP Study Identifier' || ade.attr_name === 'GEO Study Identifier' || ade.attr_name === 'SRA Study Identifier') {
        idArray.push(ade.attr_name.toUpperCase());
      } else {
        result.push(ade.attr_name.toUpperCase());
      }
    });
  }
  return idArray.sort().concat(result.sort());
};

const DatasetDetail = ({
  details,
  onPageLoadDatasetDetail,
}) => {
  const { id } = useParams();
  const content = details[id];
  const tooltips = {
    Aliquot: "Pertaining to a portion of the whole; any one of two or more samples of something, of the same volume or weight. [NCIt C25414]",
    "Analytic Tool": "Any platform, methodology, framework or other software designed for the use of and interpretation of biomedical research data.",
    Assay: "An examination or analysis of material, or of its prior assay, to determine the material's features or components.",
    Case: "A collection of data related to a specific individual in the context of a specific project.",
    "Cell Line": "A cell culture developed from a single cell or group of similar cells and therefore consisting of cells with a uniform genetic makeup that can be reproduced for various types of research. A cell line is different than a tissue sample in that it is grown as a culture of identical cells and can be reproduced indefinitely.",
    Collection: "A group of datasets collected together for any reason by an organization of researchers, stewards, or stakeholders either pertaining to a common theme or for a common purpose. For example, the Treehouse Childhood Cancer Initiative maintains a collection of cell line data as part of their repository of pediatric cancer genomic data.",
    Biorepository: "A biorepository is a facility that acts as a library for biospecimens, allowing the biospecimens to be available for use in future research. A biospecimen may be from people, animals, or other living organisms. A biorepository will be involved in collecting, cataloguing, and storing biospecimens. The biorepository will also be involved in managing access to and distributing biospecimens to researchers. Some biorepositories store medical information associated with biospecimens.",
    Donor: "A donor is an individual (either human or animal) from which tissue for grafting, tissue for creating a cell line, or tumor sample for studying was taken. In these contexts the datasets are not associated with clinical or project cases. Minimal information about a donor helps describe the grafted tissue, the cell line, or the tumor sample.",
    Knowledgebase: "Biomedical knowledgebases extract, accumulate, organize, annotate, and link the growing body of information that is related to and relies on core datasets.",
    Program: "A coherent assembly of plans, project activities, and supporting resources contained within an administrative framework, the purpose of which is to implement an organization's mission or some specific program-related aspect of that mission.",
    Project: "Any specifically defined piece of work that is undertaken or attempted to meet the goals of a program and that involves one or more case studies. Also known as a Study or Trial.",
    Sample: "Material taken from a biological entity for testing, diagnostic, propagation, treatment or research purposes, including a sample obtained from a living organism or taken from the biological object after halting of all its life functions. A sample, also known as a biospecimen, can contain one or more components including but not limited to cellular molecules, cells, tissues, organs, body fluids, embryos, and body excretory products. {Based on the GDC definition of Sample. (https://docs.gdc.cancer.gov/Data_Dictionary/viewer/#?view=table-definition-view&id=sample)}",
    Xenograft: "Cells, tissues, or organs from a donor that are transplanted into a recipient of another species.",
    "primary dataset scope": "primary dataset scope"
  };
  const coreDataElementsAll = ['case_sex', 'case_gender', 'case_age', 'case_age_at_diagnosis', 'case_race', 'case_ethnicity', 'case_disease_diagnosis', 'case_tumor_site', 'case_treatment_administered', 'case_treatment_outcome', 'sample_assay_method', 'sample_analyte_type', 'sample_anatomic_site', 'sample_composition_type', 'sample_is_normal', 'sample_is_xenograft'];
  const [coreDataElementsMap, setCoreDataElementsMap] = useState(new Map());
  const [selectedKey, setSelectedKey] = useState("");
  const [datasetDes, setDatasetDes] = useState([]);
  const additionalDict = {};
  if (content && content.additional) {
    content.additional.forEach((adt) => {
      additionalDict[adt.attr_name.toUpperCase()] = adt.attr_set;
    });
  }
  let pocLinks = !content || content.poc_email === undefined || content.poc_email === null ? "" : content.poc_email;
  if (pocLinks) { pocLinks = pocLinks.split(';'); }
  const sortedAdditonals = sortingAdditionalElement(content);
  const grantIDs = [];
  const grantNames = [];
  const grants = new Map();
  const geoStudyIdArr = [];
  const dataRepositoryArr = [];
  const sraIdArr = [];
  const clinicalArr = [];
  const dbgapStudyIdArr = [];
  if (sortedAdditonals) {
    if (sortedAdditonals.includes("GRANT ID")) {
      additionalDict["GRANT ID"].forEach((item, i) => {
        grantIDs[i] = item.k;
      });
    }
    if (sortedAdditonals.includes("GRANT NAME")) {
      additionalDict["GRANT NAME"].forEach((item, i) => {
        grantNames[i] = item.k;
      });
    }
    for (let i = 0; i < grantIDs.length; i += 1) {
      if (grantNames[i] === null) {
        grants.set(grantIDs[i], "");
      }
      grants.set(grantIDs[i], grantNames[i]);
    }
    if (sortedAdditonals.includes("GEO STUDY IDENTIFIER")) {
      additionalDict["GEO STUDY IDENTIFIER"].forEach(geoStudyItem => {
        geoStudyIdArr.push(geoStudyItem.k);
      });
    }
    if (sortedAdditonals.includes("DATA REPOSITORY")) {
      additionalDict["DATA REPOSITORY"].forEach(dataRepositoryItem => {
        dataRepositoryArr.push(dataRepositoryItem.k);
      });
    }
    if (sortedAdditonals.includes("SRA STUDY IDENTIFIER")) {
      additionalDict["SRA STUDY IDENTIFIER"].forEach(sraItem => {
        sraIdArr.push(sraItem.k);
      });
    }
    if (sortedAdditonals.includes("CLINICAL TRIAL IDENTIFIER")) {
      additionalDict["CLINICAL TRIAL IDENTIFIER"].forEach(clinicalItem => {
        clinicalArr.push(clinicalItem.k);
      });
    }
    if (sortedAdditonals.includes("DBGAP STUDY IDENTIFIER")) {
      additionalDict["DBGAP STUDY IDENTIFIER"].forEach(dbgapItem => {
        dbgapStudyIdArr.push(dbgapItem.k);
      });
    }
  }

  const initializePopover = () => {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map((popoverTriggerEl) => {
      return new Popover(popoverTriggerEl);
    });
  };

  const generateChartData = (map) => {
    const chartData = [];
    let otherValue = 0;
    if (map.size <= 10) {
      map.forEach((value, key) => {
        const obj = {};
        obj.name = key;
        obj.value = value;
        chartData.push(obj);
      });
    } else {
      let i = 0;
      map.forEach((value, key) => {
        if (i < 9) {
          const obj = {};
          obj.name = key;
          obj.value = value;
          chartData.push(obj);
        } else {
          otherValue += value;
        }
        i += 1;
      });
      const obj = {};
      obj.name = "Other";
      obj.value = otherValue;
      chartData.push(obj);
    }
    return chartData;
  };

  const buildChartData = (element) => {
    const nameValueMap = new Map();
    let chartData = [];
    content[element].forEach((item) => {
      if (/^\d+$/.test(item.v)) {
        nameValueMap.set(item.n, item.v);
      }
    });
    const sortedMap = new Map([...nameValueMap.entries()].sort((a, b) => b[1] - a[1]));
    if (element === 'case_age' || element === 'case_age_at_diagnosis') {
      chartData = generateChartData(nameValueMap);
    } else {
      chartData = generateChartData(sortedMap);
    }
    return chartData;
  };

  const buildCoreDataElementsList = () => {
    const elementMap = new Map();
    coreDataElementsAll.forEach((element) => {
      if (content[element] !== undefined) {
        if (/^\d+$/.test(content[element][0].v)) {
          elementMap.set(element, buildChartData(element));
        }
      }
    });
    setCoreDataElementsMap(elementMap);
  };

  const buildDatasetDescArr = () => {
    const arr = content.desc.split("http");
    let newArr = [];
    if (arr.length > 1) {
      newArr.push(arr[0]);
      for (let i = 1; i < arr.length; i += 1) {
          const urlArr = arr[i].split(" ");
          const url = urlArr[0];
          const urlLastChar = url[url.length - 1];
          if (",;.()<>{}".includes(urlLastChar)) {
              const newUrl = "http".concat(url.substring(0, url.length - 1));
              newArr.push(newUrl);
              newArr.push(arr[i].split(url.substring(0, url.length - 1))[1]);
          } else {
            const newUrl = "http".concat(url);
            newArr.push(newUrl);
            if (urlArr.length !== 1) {
                newArr.push(arr[i].split(url)[1]);
            }
          }
      }
  } else {
      newArr = arr;
  }
    setDatasetDes(newArr);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!content) {
      onPageLoadDatasetDetail(id).catch(error => {
        throw new Error(`Loading dataset detail page failed ${error}`);
      });
    }
  }, []);

  useEffect(() => {
    initializePopover();
    if (content) {
      buildCoreDataElementsList();
      buildDatasetDescArr();
    }
  }, [content]);

  useEffect(() => {
    setSelectedKey(coreDataElementsMap.keys().next().value);
  }, [coreDataElementsMap]);

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
                  {content.dataset_name.length > 60 && content.dataset_name.length <= 65 ? <div className="datasetDetailHeaderLabelLong">{content.dataset_name}</div> : null}
                  {content.dataset_name.length > 65 && content.dataset_name.length <= 100 ? <div className="datasetDetailHeaderLabel2">{content.dataset_name}</div> : null}
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
                    <span>Point of Contact: &nbsp;</span>
                    <div className="datasetDetailHeaderText">
                      <span testid="poc_name">{content.poc ? content.poc : null}</span>
                      {content.poc ? ', ' : null}
                      &nbsp;
                      <div testid="poc_email">
                        {
                          pocLinks.map((pl, idx) => {
                            if (pl && pl.includes("@")) {
                              return (
                                <>
                                  <a className="datasetDetailHeaderLink" href={`mailto:${pl}`}>
                                      {pl}
                                  </a>
                                  {idx < pocLinks.length - 1 ? ", " : ""}
                                </>
                              );
                            }
                            return (
                              <>
                                <a className="datasetDetailHeaderLink" href={pl} target="_blank" rel="noreferrer noopener">
                                  {pl}
                                </a>
                                {idx < pocLinks.length - 1 ? ", " : ""}
                              </>
                            );
                          })
                        }
                      </div>
                    </div>
                  </div>
                  </HeaderLinks>
                  <ResourceType>
                    <span data-bs-custom-class="custom-popover" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content={tooltips[content.primary_dataset_scope]}>
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
                    {content.desc && (
                      <div className="aboutDatasetContent" testid="desc">
                        {
                          datasetDes.map((item, desidx) => {
                            const deskey = `des_${desidx}`;
                            return (
                              item.includes("http")
                              ? <a key={deskey} href={item} className="datasetDesLinks" target="_blank" rel="noreferrer noopener">{item}</a>
                              : <a key={deskey}>{item}</a>
                            );
                          })
                        }
                      </div>
                    )}
                    <div className="coreDataContainer">
                      <div className="coreDataLabel">Core Data Elements</div>
                      {/* <div className="dataElementLabel">Case Age</div> */}
                      {content.case_id
                        ? <div className="dataElementLabel">Number of Cases</div>
                        : null}
                      <span id="number_of_cases">
                        {
                          content.case_id
                          ? content.case_id.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : null
                        }
                      </span>
                      {content.case_sex
                          ? <div className="dataElementLabel">Case Sex</div>
                          : null}
                        <div className="dataElementContent" id="case_sex">
                          {
                            content.case_sex
                            ? content.case_sex.map((cs, csidx) => {
                              const n = `${cs.n} (`;
                              let v = cs.v ? cs.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += csidx === content.case_sex.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.case_sex_at_birth
                          ? <div className="dataElementLabel">Case Sex At Birth</div>
                          : null}
                        <div className="dataElementContent" id="case_sex_at_birth">
                          {
                            content.case_sex_at_birth
                            ? content.case_sex_at_birth.map((csab, csabidx) => {
                              const n = `${csab.n} (`;
                              let v = csab.v ? csab.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += csabidx === content.case_sex_at_birth.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.case_gender
                          ? <div className="dataElementLabel">Case Gender</div>
                          : null}
                        <div className="dataElementContent" id="case_gender">
                          {
                            content.case_gender
                            ? content.case_gender.map((cg, cgidx) => {
                              const n = `${cg.n} (`;
                              let v = cg.v ? cg.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += cgidx === content.case_gender.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.case_age
                          ? <div className="dataElementLabel">Case Age</div>
                          : null}
                        <div className="dataElementContent" id="case_age">
                          {
                            content.case_age
                            ? content.case_age.map((ca, caidx) => {
                              const n = `${ca.n} (`;
                              let v = ca.v ? ca.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += caidx === content.case_age.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.case_age_at_diagnosis
                          ? <div className="dataElementLabel">Case Age At Diagnosis</div>
                          : null}
                        <div className="dataElementContent" id="case_age_at_diagnosis">
                          {
                            content.case_age_at_diagnosis
                            ? content.case_age_at_diagnosis.map((cad, cadidx) => {
                              const n = `${cad.n} (`;
                              let v = cad.v ? cad.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += cadidx === content.case_age_at_diagnosis.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.case_age_at_trial
                          ? <div className="dataElementLabel">Case Age At Trial</div>
                          : null}
                        <div className="dataElementContent" id="case_age_at_trial">
                          {
                            content.case_age_at_trial
                            ? content.case_age_at_trial.map((caat, caatidx) => {
                              const n = `${caat.n} (`;
                              let v = caat.v ? caat.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += caatidx === content.case_age_at_trial.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.case_race
                          ? <div className="dataElementLabel">Case Race</div>
                          : null}
                        <div className="dataElementContent" id="case_race">
                          {
                            content.case_race
                            ? content.case_race.map((cr, cridx) => {
                              const n = `${cr.n} (`;
                              let v = cr.v ? cr.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += cridx === content.case_race.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.case_ethnicity
                          ? <div className="dataElementLabel">Case Ethnicity</div>
                          : null}
                        <div className="dataElementContent" id="case_ethnicity">
                          {
                            content.case_ethnicity
                            ? content.case_ethnicity.map((ce, ceidx) => {
                              const n = `${ce.n} (`;
                              let v = ce.v ? ce.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += ceidx === content.case_ethnicity.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.case_disease_diagnosis
                          ? <div className="dataElementLabel">Case Disease Diagnosis</div>
                          : null}
                        <div className="dataElementContent" id="case_disease_diagnosis">
                          {
                            content.case_disease_diagnosis
                            ? content.case_disease_diagnosis.map((cdd, cddidx) => {
                              const n = `${cdd.n} (`;
                              let v = cdd.v ? cdd.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += cddidx === content.case_disease_diagnosis.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.case_tumor_site
                          ? <div className="dataElementLabel">Case Tumor Site</div>
                          : null}
                        <div className="dataElementContent" id="case_tumor_site">
                          {
                            content.case_tumor_site
                            ? content.case_tumor_site.map((cts, ctsidx) => {
                              const n = `${cts.n} (`;
                              let v = cts.v ? cts.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += ctsidx === content.case_tumor_site.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.case_treatment_administered
                          ? <div className="dataElementLabel">Case Treatment Administered</div>
                          : null}
                        <div className="dataElementContent" id="case_treatment_administered">
                          {
                            content.case_treatment_administered
                            ? content.case_treatment_administered.map((cta, ctaidx) => {
                              const n = `${cta.n} (`;
                              let v = cta.v ? cta.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += ctaidx === content.case_treatment_administered.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.case_treatment_outcome
                          ? <div className="dataElementLabel">Case Treatment Outcome</div>
                          : null}
                        <div className="dataElementContent" id="case_treatment_outcome">
                          {
                            content.case_treatment_outcome
                            ? content.case_treatment_outcome.map((cto, ctoidx) => {
                              const n = `${cto.n} (`;
                              let v = cto.v ? cto.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += ctoidx === content.case_treatment_outcome.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.case_proband
                          ? <div className="dataElementLabel">Case Proband</div>
                          : null}
                        <div className="dataElementContent" id="case_proband">
                          {
                            content.case_proband
                            ? content.case_proband.map((cp, cpidx) => {
                              const n = `${cp.n} (`;
                              let v = cp.v ? cp.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += cpidx === content.case_proband.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.sample_id
                          ? <div className="dataElementLabel">Number of Samples</div>
                          : null}
                        <span id="number_of_samples">
                        {
                          content.sample_id
                          ? content.sample_id.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : null
                        }
                        </span>
                        {content.program_name
                          ? <div className="dataElementLabel">Program Name</div>
                          : null}
                        <span id="program_name">
                        {
                          content.program_name
                          ? content.program_name
                          : null
                        }
                        </span>
                        {content.program_id
                          ? <div className="dataElementLabel">Program ID</div>
                          : null}
                        <span id="program_id">
                        {
                          content.program_id
                          ? content.program_id
                          : null
                        }
                        </span>
                        {content.donor_age
                          ? <div className="dataElementLabel">Donor Age</div>
                          : null}
                        <span id="donor_age">
                        {
                          content.donor_age
                          ? content.donor_age
                          : null
                        }
                        </span>
                        {content.donor_disease
                          ? <div className="dataElementLabel">Donor Disease</div>
                          : null}
                        <span id="donor_disease">
                        {
                          content.donor_disease
                          ? content.donor_disease
                          : null
                        }
                        </span>
                        {content.donor_sex
                          ? <div className="dataElementLabel">Donor Sex</div>
                          : null}
                        <span id="donor_sex">
                        {
                          content.donor_sex
                          ? content.donor_sex
                          : null
                        }
                        </span>
                        {content.donor_id
                          ? <div className="dataElementLabel">Donor ID</div>
                          : null}
                        <span id="donor_id">
                        {
                          content.donor_id
                          ? content.donor_id
                          : null
                        }
                        </span>
                        {content.cell_line_id
                          ? <div className="dataElementLabel">Cell Line ID</div>
                          : null}
                        <span id="cell_line_id">
                        {
                          content.cell_line_id
                          ? content.cell_line_id
                          : null
                        }
                        </span>
                        {content.sample_repository_name
                          ? <div className="dataElementLabel">Sample Repository Name</div>
                          : null}
                        <div className="dataElementContent" id="sample_repository_name">
                          {
                            content.sample_repository_name
                            ? content.sample_repository_name.map((srn, srnidx) => {
                              const n = `${srn.n}`;
                              const v = srnidx === content.sample_repository_name.length - 1 ? "" : "; ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {/* <div className="dataElementLabel">Sample Assay Method</div> */}
                        {content.sample_assay_method
                          ? <div className="dataElementLabel">Sample Assay Method</div>
                          : null}
                        <div className="dataElementContent" id="sample_assay_method">
                          {
                            content.sample_assay_method
                            ? content.sample_assay_method.map((sam, samidx) => {
                              const n = `${sam.n} (`;
                              let v = sam.v ? sam.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += samidx === content.sample_assay_method.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.sample_analyte_type
                          ? <div className="dataElementLabel">Sample Analyte Type</div>
                          : null}
                        <div className="dataElementContent" id="sample_analyte_type">
                          {
                            content.sample_analyte_type
                            ? content.sample_analyte_type.map((sat, satidx) => {
                              const n = `${sat.n} (`;
                              let v = sat.v ? sat.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += satidx === content.sample_analyte_type.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.sample_anatomic_site
                          ? <div className="dataElementLabel">Sample Anatomic Site</div>
                          : null}
                        <div className="dataElementContent" id="sample_anatomic_site">
                          {
                            content.sample_anatomic_site
                            ? content.sample_anatomic_site.map((sat, satidx) => {
                              const n = `${sat.n} (`;
                              let v = sat.v ? sat.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += satidx === content.sample_anatomic_site.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.sample_composition_type
                          ? <div className="dataElementLabel">Sample Composition Type</div>
                          : null}
                        <div className="dataElementContent" id="sample_composition_type">
                          {
                            content.sample_composition_type
                            ? content.sample_composition_type.map((sct, sctidx) => {
                              const n = `${sct.n} (`;
                              let v = sct.v ? sct.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += sctidx === content.sample_composition_type.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.sample_is_normal
                          ? <div className="dataElementLabel">Sample Is Normal</div>
                          : null}
                        <div className="dataElementContent" id="sample_is_normal">
                          {
                            content.sample_is_normal
                            ? content.sample_is_normal.map((sin, sinidx) => {
                              const n = `${sin.n} (`;
                              let v = sin.v ? sin.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += sinidx === content.sample_is_normal.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.sample_is_xenograft
                          ? <div className="dataElementLabel">Sample Is Xenograft</div>
                          : null}
                        <div className="dataElementContent" id="sample_is_xenograft">
                          {
                            content.sample_is_xenograft
                            ? content.sample_is_xenograft.map((six, sixidx) => {
                              const n = `${six.n} (`;
                              let v = six.v ? six.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += sixidx === content.sample_is_xenograft.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                    </div>
                    <div className="additionalDataContainer">
                      <div className="additionalDataLabel">Additional Data Elements</div>
                        {
                          sortedAdditonals.map((ad, adIdx) => {
                            const adkey = `ad_${adIdx}`;
                            if (ad === "PUBLISHED IN") {
                              let publishedLinks = content.published_in === undefined || content.published_in === null ? "" : content.published_in;
                              if (content.published_in) {
                                publishedLinks = publishedLinks.split(';');
                                publishedLinks.sort((a, b) => {
                                  const la = a.trim().toLowerCase();
                                  const lb = b.trim().toLowerCase();
                                  return la < lb ? -1 : 1;
                                });
                              }
                              return (
                                <>
                                  <div className="dataElementLabel">Published In</div>
                                  <div className="dataElementContentPublished" testid="published_in">
                                    { publishedLinks ? publishedLinks.map((item, idx) => {
                                      const key = `sort_${idx}`;
                                      return (
                                        <div key={key}><a href={item} className="dataElementContentPublished" target="_blank" rel="noreferrer noopener">{item}</a></div>
                                      );
                                    }) : null}
                                  </div>
                                  <span id="published_in">{content.published_in}</span>
                                </>
                              );
                            }
                            if (ad === "PROJECTS") {
                              return (
                                <>
                                  <div className="dataElementLabel">Projects</div>
                                  <div className="dataElementContent" id="projects">
                                    {
                                      content.projects.map((pro, proidx) => {
                                        const prokey = `pro_${proidx}`;
                                        return (
                                          <span key={prokey} className="itemSpan">
                                            {pro.p_k}
                                            &nbsp;
                                            {pro.p_v.map((prov, providx) => {
                                              const provkey = `prov_${providx}`;
                                              return (
                                                <span key={provkey} className="itemSpan">
                                                  (
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
                            if (ad === "GRANT ID") {
                              return (
                                <>
                                  <div className="dataElementLabel">Grant Information</div>
                                  <div className="grantInfoContainer" id="grant_information">
                                    {grantIDs.sort().map((item) => {
                                      return (
                                        <table className="table table-borderless">
                                          <tbody>
                                            <tr>
                                              <td width="210px" style={{paddingLeft: "0px"}}>
                                                <div>
                                                {
                                                  item.split(',').join(",\n")
                                                }
                                                </div>
                                              </td>
                                              <td><div className="grantNameDataContainer">{grants.get(item)}</div></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      );
                                    })}
                                  </div>
                                </>
                              );
                            }
                            if (ad === "DBGAP STUDY IDENTIFIER") {
                              const html = dbgapStudyIdArr.map((dbgapId, idx) => {
                                const dbgapkey = `dbgap_${idx}`;
                                const dbgapLink = ''.concat('https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=', dbgapId);
                                return (
                                  <div className="additionalDataContent" key={dbgapkey}>
                                    <a href={dbgapLink} className="additionalDataLinks" target="_blank" rel="noreferrer noopener">{dbgapId}</a>
                                  </div>
                                );
                              });
                              return (
                                <>
                                  <div className="dataElementLabel">DBGAP STUDY IDENTIFIER</div>
                                  <div testid="dbgap_study_identifier">{html}</div>
                                </>
                              );
                            }
                            if (ad === "GEO STUDY IDENTIFIER") {
                              const html = geoStudyIdArr.map((geoId, idx) => {
                                const geokey = `geo_${idx}`;
                                const geoLink = ''.concat('https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=', geoId);
                                return (
                                  <div className="additionalDataContent" key={geokey}>
                                    <a href={geoLink} className="additionalDataLinks" target="_blank" rel="noreferrer noopener">{geoId}</a>
                                  </div>
                                );
                              });
                              return (
                                <>
                                  <div className="dataElementLabel">GEO STUDY IDENTIFIER</div>
                                  <span id="geo_study_identifier" style={{ position: 'absolute', visibility: 'hidden'}}>{geoStudyIdArr.join(' ')}</span>
                                  <div>{html}</div>
                                </>
                              );
                            }
                            if (ad === "DATA REPOSITORY") {
                              const html = dataRepositoryArr.map((repositoryItem, idx) => {
                                const repositorykey = `repository_${idx}`;
                                return (
                                  <div className="additionalDataContent" key={repositorykey}>
                                    <a href={repositoryItem} className="additionalDataLinks" target="_blank" rel="noreferrer noopener">{repositoryItem}</a>
                                  </div>
                                );
                              });
                              return (
                                <>
                                  <div className="dataElementLabel">DATA REPOSITORY</div>
                                  <div id="data_repository">{html}</div>
                                </>
                              );
                            }
                            if (ad === "SRA STUDY IDENTIFIER") {
                              const html = sraIdArr.map((sraId, idx) => {
                                const srakey = `sra_${idx}`;
                                const sraLink = ''.concat('https://trace.ncbi.nlm.nih.gov/Traces/?view=study&acc=', sraId);
                                return (
                                  <div className="additionalDataContent" key={srakey}>
                                    <a href={sraLink} className="additionalDataLinks" target="_blank" rel="noreferrer noopener">{sraId}</a>
                                  </div>
                                );
                              });
                              return (
                                <>
                                  <div className="dataElementLabel">SRA STUDY IDENTIFIER</div>
                                  <span id="sra_study_identifier" style={{ position: 'absolute', visibility: 'hidden'}}>{sraIdArr.join(' ')}</span>
                                  <div>{html}</div>
                                </>
                              );
                            }
                            if (ad === "CLINICAL TRIAL IDENTIFIER") {
                              const html = clinicalArr.map((clinicalId, idx) => {
                                const clinicalkey = `clinical_${idx}`;
                                const clinicalLink = ''.concat('https://clinicaltrials.gov/ct2/show/', clinicalId);
                                return (
                                  <div className="additionalDataContent" key={clinicalkey}>
                                    <a href={clinicalLink} className="additionalDataLinks" target="_blank" rel="noreferrer noopener">{clinicalId}</a>
                                  </div>
                                );
                              });
                              return (
                                <>
                                  <div className="dataElementLabel">CLINICAL TRIAL IDENTIFIER</div>
                                  <span id="clinical_trail_identifier" style={{ position: 'absolute', visibility: 'hidden'}}>{clinicalArr.join(' ')}</span>
                                  <div>{html}</div>
                                </>
                              );
                            }
                            return (
                              <div id={ad.toLocaleLowerCase().split(' ').join('_')}>
                                <div key={adkey} className="dataElementLabel">
                                  {ad === "GRANT ID" || ad === "GRANT NAME" ? null : ad}
                                  {ad === "GRANT ID" || ad === "GRANT NAME" ? null : <br />}
                                  {additionalDict[ad].map((adee, adeeidx) => {
                                    if (ad !== "GRANT ID" && ad !== "GRANT NAME") {
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
                        {coreDataElementsMap.size > 0 && (
                          <GraphicsContainer>
                            <div className="coreDataLabel" style={{marginTop: '12px'}}>Charts</div>
                            <div onKeyDown={e => e.stopPropagation()} aria-hidden="true">
                              <Dropdown>
                                {
                                  selectedKey
                                  && (
                                  <Dropdown.Toggle variant="light" className="customizedToggle">
                                    {selectedKey.split('_').join(' ')}
                                  </Dropdown.Toggle>
                                  )
                                }
                                <Dropdown.Menu className="customizedDropdownMenu" flip={false}>
                                {
                                  Array.from(coreDataElementsMap.keys()).map((key, idx) => {
                                    const dropdownKey = `dropdown_${idx}`;
                                    return (
                                      key !== selectedKey && <Dropdown.Item key={dropdownKey} className="dropdownElementLabel" onClick={() => setSelectedKey(key)}>{key.split('_').join(' ')}</Dropdown.Item>
                                    );
                                  })
                                }
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                            {
                              coreDataElementsMap.get(selectedKey)
                              && (
                                <div className="dataElementContent">
                                {
                                  coreDataElementsMap.get(selectedKey).map((item, idx) => {
                                    const coreDataKey = `coreDataKey_${idx}`;
                                    return (
                                      <span key={coreDataKey} className="itemSpan">
                                        {item.name}
                                        &nbsp;(
                                        {item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        {idx === coreDataElementsMap.get(selectedKey).length - 1 ? ")" : "); "}
                                      </span>
                                    );
                                  })
                                }
                                </div>
                              )
                            }
                            <div className="chartContainer">
                            {
                              (selectedKey === 'case_age' || selectedKey === 'case_age_at_diagnosis')
                              ? (coreDataElementsMap.get(selectedKey) && <Histogram key={selectedKey} data={coreDataElementsMap.get(selectedKey)} />)
                              : (
                                coreDataElementsMap.get(selectedKey)
                                && (
                                    <DonutChart
                                      key={selectedKey}
                                      data={coreDataElementsMap.get(selectedKey)}
                                      innerRadiusP={65}
                                      outerRadiusP={115}
                                      paddingSpace={coreDataElementsMap.get(selectedKey).length === 1 ? 0 : 0.5}
                                      textColor="black"
                                    />
                                  )
                                )
                            }
                            </div>
                          </GraphicsContainer>
                        )}
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