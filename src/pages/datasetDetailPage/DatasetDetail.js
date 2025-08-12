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
    color: #0B835F;
    text-transform: none;
    max-width: 95%;
    word-break: break-all;
  }

  .tablecell {
    width: 210px;
    paddingLeft: 0px;
    background: transparent;
  }

  .tabelcellRight {
    background: transparent;
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
  onLoadGlossaryTerms,
  glossaryTerms,
}) => {
  const { id } = useParams();
  const content = details[id];
  const coreDataElementsAll = ['case_sex', 'case_gender', 'case_age', 'case_age_at_diagnosis', 'case_race', 'case_ethnicity', 'case_disease_diagnosis', 'case_proband', 'case_tumor_site', 'case_treatment_administered', 'case_treatment_outcome', 'sample_assay_method', 'sample_analyte_type', 'sample_anatomic_site', 'sample_composition_type', 'sample_is_cell_line', 'sample_is_normal', 'sample_is_xenograft'];
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
  const availableFileArr = [];
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
    if (sortedAdditonals.includes("AVAILABLE FILES")) {
      additionalDict["AVAILABLE FILES"].forEach(dbgapItem => {
        availableFileArr.push(dbgapItem.k);
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
      // if term is not in glossaryTerms in redux, call api
      if (!(content.primary_dataset_scope in glossaryTerms)) {
        const termPara = {termNames: [content.primary_dataset_scope]};
        onLoadGlossaryTerms(termPara).catch(error => {
          throw new Error(`Loading Glossary Terms from url query failed: ${error}`);
        });
      }
    }
  }, [content]);

  useEffect(() => {
    setSelectedKey(coreDataElementsMap.keys().next().value);
  }, [coreDataElementsMap]);

  useEffect(() => {
    initializePopover();
  }, [content, glossaryTerms]);

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
                  {content.dataset_name.length > 0 && content.dataset_name.length <= 60 ? <h1 className="datasetDetailHeaderLabel">{content.dataset_name}</h1> : null}
                  {content.dataset_name.length > 60 && content.dataset_name.length <= 65 ? <h1 className="datasetDetailHeaderLabelLong">{content.dataset_name}</h1> : null}
                  {content.dataset_name.length > 65 && content.dataset_name.length <= 100 ? <h1 className="datasetDetailHeaderLabel2">{content.dataset_name}</h1> : null}
                  {content.dataset_name.length > 100 && content.dataset_name.length <= 170 ? <h1 className="datasetDetailHeaderLabel3">{content.dataset_name}</h1> : null}
                  {content.dataset_name.length > 170 ? <h1 className="datasetDetailHeaderLabel4">{content.dataset_name}</h1> : null}
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
                    <span data-bs-custom-class="custom-popover" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content={glossaryTerms[content.primary_dataset_scope]}>
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
                    <h2 className="aboutDatasetLabel">About This Dataset</h2>
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
                      <h3 className="coreDataLabel">Core Data Elements</h3>
                      {/* <div className="dataElementLabel">Case Age</div> */}
                      {content.case_id
                        ? <h4 className="dataElementLabel">Number of Cases</h4>
                        : null}
                      <span id="number_of_cases">
                        {
                          content.case_id
                          ? content.case_id.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : null
                        }
                      </span>
                      {content.case_sex
                          ? <h4 className="dataElementLabel">Case Sex</h4>
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
                          ? <h4 className="dataElementLabel">Case Sex At Birth</h4>
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
                        {/* {content.case_gender
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
                        </div> */}
                        {content.case_age
                          ? <h4 className="dataElementLabel">Case Age</h4>
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
                          ? <h4 className="dataElementLabel">Case Age At Diagnosis</h4>
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
                          ? <h4 className="dataElementLabel">Case Age At Trial</h4>
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
                          ? <h4 className="dataElementLabel">Case Race</h4>
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
                          ? <h4 className="dataElementLabel">Case Ethnicity</h4>
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
                          ? <h4 className="dataElementLabel">Case Disease Diagnosis</h4>
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
                          ? <h4 className="dataElementLabel">Case Tumor Site</h4>
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
                          ? <h4 className="dataElementLabel">Case Treatment Administered</h4>
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
                          ? <h4 className="dataElementLabel">Case Treatment Outcome</h4>
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
                          ? <h4 className="dataElementLabel">Case Proband</h4>
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
                          ? <h4 className="dataElementLabel">Number of Samples</h4>
                          : null}
                        <span id="number_of_samples">
                        {
                          content.sample_id
                          ? content.sample_id.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : null
                        }
                        </span>
                        {content.program_name
                          ? <h4 className="dataElementLabel">Program Name</h4>
                          : null}
                        <span id="program_name">
                        {
                          content.program_name
                          ? content.program_name
                          : null
                        }
                        </span>
                        {content.program_id
                          ? <h4 className="dataElementLabel">Program ID</h4>
                          : null}
                        <span id="program_id">
                        {
                          content.program_id
                          ? content.program_id
                          : null
                        }
                        </span>
                        {content.donor_age
                          ? <h4 className="dataElementLabel">Donor Age</h4>
                          : null}
                        <span id="donor_age">
                        {
                          content.donor_age
                          ? content.donor_age
                          : null
                        }
                        </span>
                        {content.donor_disease
                          ? <h4 className="dataElementLabel">Donor Disease</h4>
                          : null}
                        <span id="donor_disease">
                        {
                          content.donor_disease
                          ? content.donor_disease
                          : null
                        }
                        </span>
                        {content.donor_sex
                          ? <h4 className="dataElementLabel">Donor Sex</h4>
                          : null}
                        <span id="donor_sex">
                        {
                          content.donor_sex
                          ? content.donor_sex
                          : null
                        }
                        </span>
                        {content.donor_id
                          ? <h4 className="dataElementLabel">Donor ID</h4>
                          : null}
                        <span id="donor_id">
                        {
                          content.donor_id
                          ? content.donor_id
                          : null
                        }
                        </span>
                        {content.cell_line_id
                          ? <h4 className="dataElementLabel">Cell Line ID</h4>
                          : null}
                        <span id="cell_line_id">
                        {
                          content.cell_line_id
                          ? content.cell_line_id
                          : null
                        }
                        </span>
                        {content.sample_repository_name
                          ? <h4 className="dataElementLabel">Sample Repository Name</h4>
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
                          ? <h4 className="dataElementLabel">Sample Assay Method</h4>
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
                          ? <h4 className="dataElementLabel">Sample Analyte Type</h4>
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
                          ? <h4 className="dataElementLabel">Sample Anatomic Site</h4>
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
                          ? <h4 className="dataElementLabel">Sample Composition Type</h4>
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
                        {content.sample_is_cell_line
                          ? <h4 className="dataElementLabel">Sample Is Cell Line</h4>
                          : null}
                        <div className="dataElementContent" id="sample_is_cell_line">
                          {
                            content.sample_is_cell_line
                            ? content.sample_is_cell_line.map((sin, sinidx) => {
                              const n = `${sin.n} (`;
                              let v = sin.v ? sin.v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "";
                              v += sinidx === content.sample_is_cell_line.length - 1 ? ")" : "); ";
                              return n + v;
                            })
                            : null
                          }
                        </div>
                        {content.sample_is_normal
                          ? <h4 className="dataElementLabel">Sample Is Normal</h4>
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
                          ? <h4 className="dataElementLabel">Sample Is Xenograft</h4>
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
                                  <h4 className="dataElementLabel">Published In</h4>
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
                                  <h4 className="dataElementLabel">Projects</h4>
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
                                  <h4 className="dataElementLabel">Grant Information</h4>
                                  <div className="grantInfoContainer" id="grant_information">
                                    {grantIDs.sort().map((item) => {
                                      return (
                                        <table className="table table-borderless">
                                          <tbody>
                                            <tr>
                                              <td className="tablecell">
                                                <div>
                                                {
                                                  item.split(',').join(",\n")
                                                }
                                                </div>
                                              </td>
                                              <td className="tabelcellRight"><div className="grantNameDataContainer">{grants.get(item)}</div></td>
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
                                  <h4 className="dataElementLabel">DBGAP STUDY IDENTIFIER</h4>
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
                                  <h4 className="dataElementLabel">GEO STUDY IDENTIFIER</h4>
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
                                  <h4 className="dataElementLabel">DATA REPOSITORY</h4>
                                  <div id="data_repository">{html}</div>
                                </>
                              );
                            }
                            if (ad === "AVAILABLE FILES") {
                              const html = availableFileArr.map((availableFileItem, idx) => {
                                const availablefilekey = `availablefile_${idx}`;
                                return (
                                  <div className="additionalDataContent" key={availablefilekey}>
                                    <a href={availableFileItem} className="additionalDataLinks" target="_blank" rel="noreferrer noopener">{availableFileItem}</a>
                                  </div>
                                );
                              });
                              return (
                                <>
                                  <h4 className="dataElementLabel">AVAILABLE FILES</h4>
                                  <div id="available_file">{html}</div>
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
                                  <h4 className="dataElementLabel">SRA STUDY IDENTIFIER</h4>
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
                                  <h4 className="dataElementLabel">CLINICAL TRIAL IDENTIFIER</h4>
                                  <span id="clinical_trail_identifier" style={{ position: 'absolute', visibility: 'hidden'}}>{clinicalArr.join(' ')}</span>
                                  <div>{html}</div>
                                </>
                              );
                            }
                            return (
                              <div id={ad.toLocaleLowerCase().split(' ').join('_')}>
                                <h4 key={adkey} className="dataElementLabel">
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
                                </h4>
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
  onLoadGlossaryTerms: PropTypes.func.isRequired,
  glossaryTerms: PropTypes.object.isRequired,
};

export default DatasetDetail;