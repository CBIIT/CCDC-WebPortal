import React, { useEffect } from 'react';
import {
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Popover } from 'bootstrap';
import ReactHtmlParser from "html-react-parser";
import externalIcon from "../../../assets/img/resource.svg";
import dataResourceIcon from "../../../assets/img/DataResource.svg";

const SearchResultContainer = styled.div`
  width: 100%;
  padding-top: 10px;
  
  .messageContainer {
    padding: 0 0 10px 0;
    font-weight: bold;
  }

  .tableMessageContainer {
    padding: 10px 0 0 0;
    font-weight: bold;
  }

  .container {
    padding: 0;
    margin: 0 0 10px 0;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    font-size: 14px;
  }

  .container:hover {
    background-color: #f7f8fa;
  }

  .container a{
    color: #004187;
    text-decoration: none;
  }

  .container .headerRow {
    margin: 5px 5px 5px 0;
  }

  .container .headerRow .resultTitle {
    color: #046ab2;
    font-weight: bold;
    padding: 5px 0;
  }

  .headerRow .piBlock {
    text-align: right;
    padding: 0;
  }

  .headerRow .typeBlock {
    background-color: #dcdcdc;
    border-radius: 20px;
    padding: 5px 10px;
    float: right;
    position: relative;
  }
  
  .headerRow .typeBlock .tooltiptext {
    visibility: hidden;
    color: white;
    background-color: rgb(80, 80, 80);
    width: 300px;
    border: 1px solid #004187;
    border-radius: 6px;
    padding: 5px 5px 5px 5px;
    
    text-align: left;
    text-transform: none;
    font-size: 12px;
    line-height: normal;
  
    /* Position the tooltip */
    position: absolute;
    z-index: 1;
    top: 100%;
    left: -100%;
    margin: 10px 0px 0px 0;
  }
  
  .headerRow .typeBlock:hover .tooltiptext {
    visibility: visible;
  }

  .headerRow .newtooltip {
    color: #212529;
    text-decoration: none;
  }

  .container .subHeaderRow {
    margin: 5px 5px 5px 0;
  }

  .subHeaderRow .col-sm {
    padding: 0;
  }

  .subHeaderRow .col-sm img {
    width: 14pt;
    margin-top: -5px;
  }

  .subHeaderRow .col-sm a {
    font-weight: bold;
    color: #0075c7;
  }

  .subHeaderRow .fa-file {
    color: #6199d0;
  }

  .bodyRow label {
    font-weight: 600;
  }

  .bodyRow .itemSpan {
    margin-left: 5px;
    padding: 0 5px;
    display: inline-block;
    margin-bottom: 5px;
  }

  .bodyRow b {
    margin: 0 3px 0 3px;
    padding: 1px 5px 1px 5px;
    border: 1px solid #9EC1DB;
    border-radius: 5px;
    background-color: #DFEEF9;
    color: #004187;
  }

  .footerRow .itemSpan {
    padding: 0 5px;
    display: inline-block;
    margin-bottom: 5px;
  }

  .footerRow .additionalItemSpan {
    margin-right: 5px;
  }

  .footerRow b {
    margin: 0 3px 0 3px;
    padding: 1px 5px 1px 5px;
    border: 1px solid #9EC1DB;
    border-radius: 5px;
    background-color: #DFEEF9;
    color: #004187;
  }

  .footerRow a {
    margin: 0 3px 0 3px;
    padding: 1px 5px 1px 5px;
    border: 1px solid #9EC1DB;
    border-radius: 5px;
    font-weight: bold;
    background-color: #DFEEF9;
    color: #004187;
  }

  .descLink {
    margin: 0 3px 0 3px;
    padding: 1px 5px 1px 5px;
    border: 1px solid #9EC1DB;
    border-radius: 5px;
    font-weight: bold;
    background-color: #DFEEF9;
    color: #004187;
    line-height: 2.5em;
  }

  a[target="_blank"] {
    color: #004187;
    background: url(${externalIcon}) right center no-repeat #DFEEF9;
    background-size: 32px;
    // display: inline-table;
    padding: 1px 30px 1px 5px;
    // margin: 0px 0px 0px 0px;
  }

  .bodyRow .textSpan {
    margin-left: 5px;
  }

  .bodyRow .caseCountHighlight {
    font-family: 'Inter';
    font-weight: 600;
    color: #625bef;
  }

  .bodyRow .sampleCountHighlight {
    font-family: 'Inter';
    font-weight: 600;
    color: #11a78b;
  }

  .bodyRow .itemContinued {
    margin-left: 5px;
    font-weight: 600;
  }

  .container .footerRow:last-child {
    margin-bottom: 5px;
  }

  .footerRow label {
    font-weight: 600;
  }

  .datasetTableRow a {
    color: #6199d0;
    font-weight: 600;
    text-decoration: none;
  }

  .datasetTableRow .typeBlock .newtooltip {
    color: #212529;
    font-weight: normal;
    text-decoration: none;
  }

  .datasetTableRow span .tooltiptext {
    visibility: hidden;
    color: white;
    background-color: rgb(80, 80, 80);
    width: 300px;
    border: 1px solid #004187;
    border-radius: 6px;
    padding: 5px 5px 5px 5px;

    text-align: left;
    text-transform: none;
    font-size: 12px;
    line-height: normal;

    position: absolute;
    z-index: 1;
    margin: 30px 0px 0px -150px;
  }

  .datasetTableRow span:hover .tooltiptext {
    visibility: visible;
  }
`;

const TableHead = styled.thead`
  th{
    cursor: pointer;
    user-select: none;
   -webkit-user-select: none;
   -khtml-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;

    &:hover {
      background-color: #c6d2db;
    }
  }
`;

const SortingOrder = styled.span`
  margin-top: 5px;
  width: 14px;
  height: 14px;
  position: absolute;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='rgba(75,108,134,1)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>");
`;

const SortingOrderDesc = styled.span`
  margin-top: 5px;
  width: 14px;
  height: 14px;
  position: absolute;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='rgba(75,108,134,1)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>");
  transform: rotate(-180deg);
`;

const toCapitalize = (str) => {
  const arr = str.split(" ");

  const result = arr.map((t) => {
    return t.charAt(0).toUpperCase() + t.slice(1);
  });

  return result.join(" ");
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const replaceQueryStr = (query, sorting) => {
  let str = "";
  if (query.get("search_text")) {
    str += `&search_text=${query.get("search_text")}`;
  }
  if (query.get("filterByResource")) {
    str += `&filterByResource=${query.get("filterByResource")}`;
  }
  if (query.get("page")) {
    str += `&page=${query.get("page")}`;
  }
  if (query.get("pageSize")) {
    str += `&pageSize=${query.get("pageSize")}`;
  }
  str += `&sortBy=${sorting.k}`;
  str += `&sortOrder=${sorting.v}`;
  if (query.get("viewType")) {
    str += `&viewType=${query.get("viewType")}`;
  }
  return str.substring(1);
};

const SearchResult = ({
  resultList,
  sort,
  viewType,
  onChangeSorting,
  onChangeSortingOrder,
  onLoadGlossaryTerms,
  glossaryTerms,
}) => {
  const query = useQuery();
  const navigate = useNavigate();

  const handleSortBy = (column) => {
    const name = column;
    if (name === sort.name) {
      const toSortBy = {};
      if (name === "Dataset") {
        toSortBy.name = "Dataset";
        toSortBy.k = "dataset_name.raw";
      } else if (name === "Cases") {
        toSortBy.name = "Cases";
        toSortBy.k = "case_id";
      } else if (name === "Samples") {
        toSortBy.name = "Samples";
        toSortBy.k = "sample_id";
      } else if (name === "Resource") {
        toSortBy.name = "Resource";
        toSortBy.k = "data_resource_id";
      } else {
        toSortBy.name = "Primary Dataset Scope";
        toSortBy.k = "primary_dataset_scope";
      }
      toSortBy.v = sort.v === "asc" ? "desc" : "asc";
      const queryStr = replaceQueryStr(query, toSortBy);
      navigate(`/search?${queryStr}`);
      onChangeSortingOrder(toSortBy.v);
    } else {
      const toSortBy = {};
      if (name === "Dataset") {
        toSortBy.name = "Dataset";
        toSortBy.k = "dataset_name.raw";
      } else if (name === "Cases") {
        toSortBy.name = "Cases";
        toSortBy.k = "case_id";
      } else if (name === "Samples") {
        toSortBy.name = "Samples";
        toSortBy.k = "sample_id";
      } else if (name === "Resource") {
        toSortBy.name = "Resource";
        toSortBy.k = "data_resource_id";
      } else {
        toSortBy.name = "Primary Dataset Scope";
        toSortBy.k = "primary_dataset_scope";
      }
      toSortBy.v = sort.v;
      const queryStr = replaceQueryStr(query, toSortBy);
      navigate(`/search?${queryStr}`);
      onChangeSorting(toSortBy);
    }
  };

  const initializePopover = () => {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map((popoverTriggerEl) => {
      return new Popover(popoverTriggerEl);
    });
  };

  const caseDiseaseDiagnosisList = resultList.map((rt) => {
    const tmp = {labels: [], matched: []};
    if (rt.highlight && rt.highlight["case_disease_diagnosis.k"]) {
      tmp.labels = rt.highlight["case_disease_diagnosis.k"];
    }

    if (rt.highlight && rt.highlight["case_disease_diagnosis.s"]) {
      const syns = [];
      rt.highlight["case_disease_diagnosis.s"].forEach((syn) => {
        const syn1 = syn.replace(/<b>/g, "").replace(/<\/b>/g, "");
        if (syns.indexOf(syn1) === -1) {
          syns.push(syn1);
        }
      });
      rt.content.case_disease_diagnosis.forEach((item) => {
        if (item.s) {
          for (let i = 0; i < syns.length; i += 1) {
            if (item.s.indexOf(syns[i]) > -1) {
              tmp.matched.push(item.n);
              break;
            }
          }
        }
      });
    }

    // merge matched with labels to remove duplicate items
    if (tmp.labels.length > 0) {
      tmp.labels.forEach((phl) => {
        const orignialText = phl.replace(/<b>/g, "").replace(/<\/b>/g, "");
        if (tmp.matched.indexOf(orignialText) === -1) {
          tmp.matched.push(phl);
        }
      });
    }

    const result = rt.content.case_disease_diagnosis ? rt.content.case_disease_diagnosis.map((rst) => rst.n) : [];
    let matched = [];

    if (tmp.matched.length > 0) {
      // sort by alphabetic order first
      tmp.matched.sort((a, b) => {
        const la = a.replace(/<b>/g, "").replace(/<\/b>/g, "").toLowerCase();
        const lb = b.replace(/<b>/g, "").replace(/<\/b>/g, "").toLowerCase();
        return la < lb ? -1 : 1;
      });
      matched = tmp.matched.map((item) => {
        const rawItem = item.replace(/<b>/g, "").replace(/<\/b>/g, "");
        const idx = result.indexOf(rawItem);
        if (idx > -1) {
          result.splice(idx, 1);
        }
        return `<b>${rawItem}</b>`;
      });
    }

    return matched.concat(result);
  });

  const sampleAssayMethodList = resultList.map((rt) => {
    let tmp = [];
    let matched = [];
    if (rt.highlight && rt.highlight["sample_assay_method.k"]) {
      tmp = rt.highlight["sample_assay_method.k"];
    }

    const result = rt.content.sample_assay_method ? rt.content.sample_assay_method.map((rst) => rst.n) : [];

    if (tmp.length > 0) {
      // sort by alphabetic order first
      tmp.sort((a, b) => {
        const la = a.replace(/<b>/g, "").replace(/<\/b>/g, "").toLowerCase();
        const lb = b.replace(/<b>/g, "").replace(/<\/b>/g, "").toLowerCase();
        return la < lb ? -1 : 1;
      });
      matched = tmp.map((item) => {
        const rawItem = item.replace(/<b>/g, "").replace(/<\/b>/g, "");
        const idx = result.indexOf(rawItem);
        if (idx > -1) {
          result.splice(idx, 1);
        }
        return `<b>${rawItem}</b>`;
      });
    }

    return matched.concat(result);
  });

  const caseTumorSiteList = resultList.map((rt) => {
    const tmp = {labels: [], matched: []};
    if (rt.highlight && rt.highlight["case_tumor_site.k"]) {
      tmp.labels = rt.highlight["case_tumor_site.k"];
    }

    if (rt.highlight && rt.highlight["case_tumor_site.s"]) {
      const syns = [];
      rt.highlight["case_tumor_site.s"].forEach((syn) => {
        const syn1 = syn.replace(/<b>/g, "").replace(/<\/b>/g, "");
        if (syns.indexOf(syn1) === -1) {
          syns.push(syn1);
        }
      });
      rt.content.case_tumor_site.forEach((item) => {
        if (item.s) {
          for (let i = 0; i < syns.length; i += 1) {
            if (item.s.indexOf(syns[i]) > -1) {
              tmp.matched.push(item.n);
              break;
            }
          }
        }
      });
    }

    // merge matched with labels to remove duplicate items
    if (tmp.labels.length > 0) {
      tmp.labels.forEach((phl) => {
        const orignialText = phl.replace(/<b>/g, "").replace(/<\/b>/g, "");
        if (tmp.matched.indexOf(orignialText) === -1) {
          tmp.matched.push(phl);
        }
      });
    }

    if (tmp.matched.length === 0) {
      return [];
    }

    const result = rt.content.case_tumor_site ? rt.content.case_tumor_site.map((rst) => rst.n) : [];
    let matched = [];

    if (tmp.matched.length > 0) {
      // sort by alphabetic order first
      tmp.matched.sort((a, b) => {
        const la = a.replace(/<b>/g, "").replace(/<\/b>/g, "").toLowerCase();
        const lb = b.replace(/<b>/g, "").replace(/<\/b>/g, "").toLowerCase();
        return la < lb ? -1 : 1;
      });
      matched = tmp.matched.map((item) => {
        const rawItem = item.replace(/<b>/g, "").replace(/<\/b>/g, "");
        const idx = result.indexOf(rawItem);
        if (idx > -1) {
          result.splice(idx, 1);
        }
        return `<b>${rawItem}</b>`;
      });
    }

    return matched.concat(result);
  });

  const projectsList = resultList.map((rt) => {
    let tmp = [];
    if (rt.highlight && rt.highlight["projects.p_k"]) {
      tmp = rt.highlight["projects.p_k"];
    }

    if (tmp.length === 0) {
      return [];
    }

    const result = rt.content.projects ? rt.content.projects.map((rst) => rst.p_k) : [];
    let matched = [];

    // sort by alphabetic order first
    tmp.sort((a, b) => {
      const la = a.replace(/<b>/g, "").replace(/<\/b>/g, "").toLowerCase();
      const lb = b.replace(/<b>/g, "").replace(/<\/b>/g, "").toLowerCase();
      return la < lb ? -1 : 1;
    });
    matched = tmp.map((item) => {
      const rawItem = item.replace(/<b>/g, "").replace(/<\/b>/g, "");
      const idx = result.indexOf(rawItem);
      if (idx > -1) {
        result.splice(idx, 1);
      }
      return `<b>${rawItem}</b>`;
    });

    return matched.concat(result);
  });

  const getTooltipTermList = resultList.map((rt) => {
    return rt.content.primary_dataset_scope;
  });

  useEffect(() => {
    initializePopover();
  }, [resultList, viewType, glossaryTerms]);

  // fetch data if there is new terms on the page
  useEffect(() => {
    const termSet = [...new Set(getTooltipTermList)].filter((term) => !(term in glossaryTerms));
    const termPara = {termNames: termSet};
    if (termSet.length > 0) {
      onLoadGlossaryTerms(termPara).catch(error => {
        throw new Error(`Loading Glossary Terms from url query failed: ${error}`);
      });
    }
  }, [resultList]);

  return (
    <>
      <SearchResultContainer>
        {
          viewType === "card" && (
            resultList.length === 0 ? (
              <div className="messageContainer">No result found. Please refine your search.</div>
            ) : resultList.map((rst, idx) => {
            const key = `sr_${idx}`;
            const tooltip = glossaryTerms[rst.content.primary_dataset_scope];
            let desc = rst.highlight && rst.highlight.desc ? rst.highlight.desc[0] : rst.content.desc;
            if (desc === null) {
              desc = "";
            }
            if (desc.length > 500) {
              desc = `${desc.substring(0, 500).replace(/<(?![b/])/g, "&lt;")} ...`;
            } else {
              desc = desc.replace(/<(?![b/])/g, "&lt;");
            }
            const arr = desc.split("http");
            let descArr = [];
            const isSearchArr = [];
            if (arr.length > 1) {
              if (arr[0].endsWith("<b>")) {
                descArr.push(arr[0].substring(0, arr[0].length - 3));
                isSearchArr.push(0);
              } else {
                descArr.push(arr[0]);
                isSearchArr.push(0);
              }
                for (let i = 1; i < arr.length; i += 1) {
                    const urlArr = arr[i].split(" ");
                    if (urlArr[0].includes("</b>")) {
                      isSearchArr.push(1);
                    } else {
                      isSearchArr.push(0);
                    }
                    const url = urlArr[0].replace("</b>", "");
                    const urlLastChar = url[url.length - 1];
                    if (",;.()<>{}".includes(urlLastChar)) {
                        const newUrl = "http".concat(url.substring(0, url.length - 1));
                        descArr.push(newUrl);
                        const restText = arr[i].split(url.substring(0, url.length - 1))[1];
                        if (restText.endsWith("<b>")) {
                          descArr.push(restText.substring(0, restText.length - 3));
                        } else {
                          descArr.push(restText);
                        }
                        isSearchArr.push(0);
                    } else {
                        const newUrl = "http".concat(url);
                        descArr.push(newUrl);
                        if (urlArr.length !== 1) {
                          const restText = arr[i].split(url)[1];
                          if (restText.endsWith("<b>")) {
                            descArr.push(restText.substring(0, restText.length - 3));
                          } else {
                            descArr.push(restText);
                          }
                          isSearchArr.push(0);
                        }
                    }
                }
            } else {
              descArr = arr;
              isSearchArr.push(0);
            }
            const otherMatches = [];
            if (rst.highlight) {
              Object.keys(rst.highlight).forEach((hl) => {
                if (hl !== "dataset_name" && hl !== "data_resource_id" && hl !== "data_resource_name" && hl !== "desc"
                && hl !== "projects.p_k" && hl !== "case_disease_diagnosis.k" && hl !== "case_disease_diagnosis.s"
                && hl !== "case_tumor_site.k" && hl !== "case_tumor_site.s" && hl !== "sample_assay_method.k") {
                  otherMatches.push(hl);
                }
              });
            }
            const additionalMatches = [];
            if (rst.additionalHits) {
              rst.additionalHits.forEach((add) => {
                const tmp = {};
                tmp.name = add.content.attr_name;
                tmp.matches = add.highlight["additional.attr_set.k"];
                additionalMatches.push(tmp);
              });
            }
            return (
              <div key={key} className="container">
                <div className="row align-items-start headerRow">
                  <div className="col-sm-8 resultTitle">
                    <Link to={`/dataset/${rst.content.dataset_id}`}>{rst.content.dataset_name}</Link>
                  </div>
                  <div className="col-sm-4">
                    <span className="typeBlock" data-bs-custom-class="custom-popover" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content={tooltip}>
                      {rst.content.primary_dataset_scope}
                    </span>
                  </div>
                </div>
                <div className="row align-items-start subHeaderRow">
                  <div className="col-sm">
                    <img src={dataResourceIcon} alt="data-resource" />
                    &nbsp;
                    <Link to={`/resource/${rst.content.data_resource_id}`}>{rst.highlight && rst.highlight.data_resource_name ? ReactHtmlParser(rst.highlight.data_resource_name[0]) : rst.content.data_resource_id}</Link>
                  </div>
                </div>
                {
                  caseDiseaseDiagnosisList[idx].length > 0 && (
                    <div className="row align-items-start bodyRow">
                      <div className="col">
                        <label>Case Disease Diagnosis:</label>
                        {
                          caseDiseaseDiagnosisList[idx].length > 10 ? caseDiseaseDiagnosisList[idx].slice(0, 10).map((cdd, cddidx) => {
                            const cddkey = `cdd_${cddidx}`;
                            return (
                              <span key={cddkey} className="itemSpan">
                                {ReactHtmlParser(cdd)}
                              </span>
                            );
                          })
                          : caseDiseaseDiagnosisList[idx].map((cdd, cddidx) => {
                            const cddkey = `cdd_${cddidx}`;
                            return (
                              <span key={cddkey} className="itemSpan">
                                {ReactHtmlParser(cdd)}
                              </span>
                            );
                          })
                        }
                        {
                          caseDiseaseDiagnosisList[idx].length > 10 && <span className="itemContinued">...</span>
                        }
                      </div>
                    </div>
                  )
                }
                {
                  rst.content.case_id && (
                    <div className="row align-items-start bodyRow">
                      <div className="col">
                        <label>Case Count:</label>
                        <span className="textSpan caseCountHighlight">
                          {rst.content.case_id.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </span>
                      </div>
                    </div>
                  )
                }
                {
                  sampleAssayMethodList[idx].length > 0 && (
                    <div className="row align-items-start bodyRow">
                      <div className="col">
                        <label>Sample Assay Method:</label>
                        {
                          sampleAssayMethodList[idx].length > 10 ? sampleAssayMethodList[idx].slice(0, 10).map((sam, samidx) => {
                            const samkey = `sam_${samidx}`;
                            return (
                              <span key={samkey} className="itemSpan">
                                {ReactHtmlParser(sam)}
                              </span>
                            );
                          })
                          : sampleAssayMethodList[idx].map((sam, samidx) => {
                            const samkey = `sam_${samidx}`;
                            return (
                              <span key={samkey} className="itemSpan">
                                {ReactHtmlParser(sam)}
                              </span>
                            );
                          })
                        }
                        {
                          sampleAssayMethodList[idx].length > 10 && <span className="itemContinued">...</span>
                        }
                      </div>
                    </div>
                  )
                }
                {
                  rst.content.sample_id && (
                    <div className="row align-items-start bodyRow">
                      <div className="col">
                        <label>Sample Count:</label>
                        <span className="textSpan sampleCountHighlight">
                          {rst.content.sample_id.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </span>
                      </div>
                    </div>
                  )
                }
                {
                  desc !== "" && (
                    <div className="row align-items-start bodyRow">
                      <div className="col">
                        <label>Description:</label>
                        <span className="textSpan">
                        {
                          descArr.map((item, desidx) => {
                            const deskey = `des_${desidx}`;
                            return (
                              item.includes("http")
                              ? (
                              <span key={deskey} className={isSearchArr[desidx] === 1 ? "descLink" : null}>
                                {
                                  isSearchArr[desidx] === 1
                                  ? <a href={item} target="_blank" rel="noreferrer noopener">{item}</a>
                                  : <a href={item} target="_blank" rel="noreferrer noopener" style={{backgroundColor: "white", fontWeight: "bold", textDecoration: "underline"}}>{item}</a>
                                }
                              </span>
                              )
                              : <span key={deskey}>{ReactHtmlParser(item)}</span>
                            );
                          })
                        }
                        </span>
                      </div>
                    </div>
                  )
                }
                {
                  caseTumorSiteList[idx].length > 0 && (
                    <div className="row align-items-start bodyRow">
                      <div className="col">
                        <label>Other Match:&nbsp;Case Tumor Site:</label>
                        {
                          caseTumorSiteList[idx].length > 10 ? caseTumorSiteList[idx].slice(0, 10).map((cdd, cddidx) => {
                            const cddkey = `cdd_${cddidx}`;
                            return (
                              <span key={cddkey} className="itemSpan">
                                {ReactHtmlParser(cdd)}
                              </span>
                            );
                          })
                          : caseTumorSiteList[idx].map((cdd, cddidx) => {
                            const cddkey = `cdd_${cddidx}`;
                            return (
                              <span key={cddkey} className="itemSpan">
                                {ReactHtmlParser(cdd)}
                              </span>
                            );
                          })
                        }
                        {
                          caseTumorSiteList[idx].length > 10 && <span className="itemContinued">...</span>
                        }
                      </div>
                    </div>
                  )
                }
                {
                  projectsList[idx].length > 0 && (
                    <div className="row align-items-start bodyRow">
                      <div className="col">
                        <label>Other Match:&nbsp;Projects:</label>
                        {
                          projectsList[idx].length > 10 ? projectsList[idx].slice(0, 10).map((pl, plidx) => {
                            const plkey = `pl_${plidx}`;
                            return (
                              <span key={plkey} className="itemSpan">
                                {ReactHtmlParser(pl)}
                              </span>
                            );
                          })
                          : projectsList[idx].map((pl, plidx) => {
                            const plkey = `cdd_${plidx}`;
                            return (
                              <span key={plkey} className="itemSpan">
                                {ReactHtmlParser(pl)}
                              </span>
                            );
                          })
                        }
                        {
                          projectsList[idx].length > 10 && <span className="itemContinued">...</span>
                        }
                      </div>
                    </div>
                  )
                }
                {
                  otherMatches.slice(0, 10).map((hl, hlidx) => {
                      const hlKey = `hl_${hl}_${hlidx}`;
                      let otherLinks = `${(rst.highlight[hl])}`;
                      otherLinks = otherLinks.replace(/<b>/g, "").replace(/<\/b>/g, "");
                      otherLinks = otherLinks.split(";");
                      return (
                        <div key={hlKey} className="row align-items-start footerRow">
                          <div className="col">
                            <label>
                              Other Match:&nbsp;
                              {toCapitalize(hl.replace(".k", "").replace(/_/g, " "))}
                            </label>
                            :&nbsp;
                            {/* {ReactHtmlParser(rst.highlight[hl])} */}
                            {
                              (otherLinks && otherLinks[0].includes("http")) ? otherLinks.map((ol, olidx) => {
                                const olkey = `cdd_${olidx}`;
                                return (
                                  <span key={olkey} className="itemSpan">
                                    {ol.includes("http") ? <a href={ol} target="_blank" rel="noreferrer noopener">{ol}</a> : ol}
                                  </span>
                                );
                              })
                              : ReactHtmlParser(rst.highlight[hl][0])
                            }
                          </div>
                        </div>
                      );
                    })
                }
                {
                  additionalMatches.length > 0 && additionalMatches.map((am, amidx) => {
                    const addkey = `add_${amidx}`;
                    return (
                      <div key={addkey} className="row align-items-start footerRow">
                        <div className="col">
                          <label>
                            Other Match:&nbsp;
                            {am.name}
                            :&nbsp;
                          </label>
                          {
                            am.matches.map((m, midx) => {
                              const mraw = m.replace(/<b>/g, "").replace(/<\/b>/g, "");
                              if (mraw.startsWith("http")) {
                                const amkey = `am_${midx}`;
                                return (
                                  <span key={amkey} className="itemSpan">
                                    <a href={mraw} target="_blank" rel="noreferrer noopener">{mraw}</a>
                                  </span>
                                );
                              }
                              if (am.name === "GEO Study Identifier") {
                                const geoId = m.replace(/<b>/g, "").replace(/<\/b>/g, "");
                                const geoLink = ''.concat('https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=', geoId);
                                return (
                                  <span className="itemSpan">
                                    <a href={geoLink} target="_blank" rel="noreferrer noopener">{geoId}</a>
                                  </span>
                                );
                              }
                              if (am.name === "dbGaP Study Identifier") {
                                const dbId = m.replace(/<b>/g, "").replace(/<\/b>/g, "");
                                const dbLink = ''.concat('https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=', dbId);
                                return (
                                  <span className="itemSpan">
                                    <a href={dbLink} target="_blank" rel="noreferrer noopener">{dbId}</a>
                                  </span>
                                );
                              }
                              return (
                                <span className="itemSpan additionalItemSpan">{ReactHtmlParser(m)}</span>
                              );
                            })
                          }
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            );
          }))
        }
        {
          viewType === "table" && (
            <table className="table table-striped">
              <TableHead>
                  <tr style={{ color: '#004187' }}>
                      <th scope="col" width="40%" abbr="Dataset" onClick={() => handleSortBy("Dataset")}>
                        Dataset&nbsp;
                        {
                          sort.k === "dataset_name.raw" && (
                            sort.v === "desc"
                            ? <SortingOrder />
                            : <SortingOrderDesc />
                          )
                        }
                      </th>
                      <th scope="col" width="12%" abbr="Cases" onClick={() => handleSortBy("Cases")}>
                        Cases&nbsp;
                        {
                          sort.k === "case_id" && (
                            sort.v === "desc"
                            ? <SortingOrder />
                            : <SortingOrderDesc />
                          )
                        }
                      </th>
                      <th scope="col" width="13%" abbr="Samples" onClick={() => handleSortBy("Samples")}>
                        Samples&nbsp;
                        {
                          sort.k === "sample_id" && (
                            sort.v === "desc"
                            ? <SortingOrder />
                            : <SortingOrderDesc />
                          )
                        }
                      </th>
                      <th scope="col" width="15%" abbr="Resource" onClick={() => handleSortBy("Resource")}>
                        Resource&nbsp;
                        {
                          sort.k === "data_resource_id" && (
                            sort.v === "desc"
                            ? <SortingOrder />
                            : <SortingOrderDesc />
                          )
                        }
                      </th>
                      <th scope="col" width="20%" abbr="Primary Dataset Scope" onClick={() => handleSortBy("Primary Dataset Scope")}>
                        Primary Dataset Scope&nbsp;
                        {
                          sort.k === "primary_dataset_scope" && (
                            sort.v === "desc"
                            ? <SortingOrder />
                            : <SortingOrderDesc />
                          )
                        }
                      </th>
                  </tr>
              </TableHead>
              <tbody>
                  {
                  resultList.length === 0 ? (
                    <div className="tableMessageContainer">No result found. Please refine your search.</div>
                  ) : resultList.map((rst, idx) => {
                    const key = `dataset_table_${idx}`;
                    const tooltip = glossaryTerms[rst.content.primary_dataset_scope];
                    return (
                      <tr key={key} className="datasetTableRow">
                        <td><Link to={`/dataset/${rst.content.dataset_id}`}>{rst.content.dataset_name}</Link></td>
                        <td>{rst.content.case_id}</td>
                        <td>{rst.content.sample_id}</td>
                        <td><Link to={`/resource/${rst.content.data_resource_id}`}>{rst.content.data_resource_id}</Link></td>
                        <td>
                          <span className="typeBlock">
                            <span data-bs-custom-class="custom-popover" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content={tooltip}>
                              {rst.content.primary_dataset_scope}
                            </span>
                          </span>
                        </td>
                      </tr>
                    );
                  })
                  }
              </tbody>
            </table>
          )
        }
      </SearchResultContainer>
    </>
  );
};

SearchResult.propTypes = {
  resultList: PropTypes.array.isRequired,
  sort: PropTypes.object.isRequired,
  viewType: PropTypes.string.isRequired,
  onChangeSorting: PropTypes.func.isRequired,
  onChangeSortingOrder: PropTypes.func.isRequired,
  onLoadGlossaryTerms: PropTypes.func.isRequired,
  glossaryTerms: PropTypes.object.isRequired,
};

export default SearchResult;
