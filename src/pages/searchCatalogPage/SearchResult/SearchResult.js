import React from 'react';
import {
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactHtmlParser from "react-html-parser";

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
  }

  .container .subHeaderRow {
    margin: 5px 5px 5px 0;
  }

  .subHeaderRow .col-sm {
    padding: 0;
  }

  .subHeaderRow .fa-file {
    color: #6199d0;
  }

  .bodyRow label {
    font-weight: 600;
  }

  .bodyRow .itemSpan {
    margin-left: 5px;
    background-color: #efe8d9;
    border-radius: 5px;
    padding: 0 5px;
    display: inline-block;
    margin-bottom: 5px;
  }

  .bodyRow .textSpan {
    margin-left: 5px;
  }

  .bodyRow .itemContinued {
    margin-left: 5px;
    font-weight: 600;
  }

  .container .footerRow {
    margin-bottom: 5px;
  }

  .footerRow label {
    font-weight: 600;
  }

  .datasetTableRow a{
    color: #6199d0;
    font-weight: 600;
    text-decoration: none;
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
      tmp.matched.forEach((item) => {
        const raw = item.indexOf("<b>") > -1 ? item.replace(/<b>/g, "").replace(/<\/b>/g, "") : item;
        const idx = result.indexOf(raw);
        if (idx > -1) {
          result.splice(idx, 1);
        }
      });
      matched = tmp.matched.map((t) => {
        if (t.indexOf("<b>") === -1) {
          return `<b>${t}</b>`;
        }
        return t;
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

    let matched = [];

    if (tmp.matched.length > 0) {
      matched = tmp.matched.map((t) => {
        if (t.indexOf("<b>") === -1) {
          return `<b>${t}</b>`;
        }
        return t;
      });
    }

    return matched;
  });

  return (
    <>
      <SearchResultContainer>
        {
          viewType === "card" && (
            resultList.length === 0 ? (
              <div className="messageContainer">No result found. Please refine your search.</div>
            ) : resultList.map((rst, idx) => {
            const key = `sr_${idx}`;
            const tooltip = tooltips[rst.content.primary_dataset_scope];
            let desc = rst.highlight && rst.highlight.desc ? rst.highlight.desc[0] : rst.content.desc;
            if (desc === null) {
              desc = "";
            }
            if (desc.length > 500) {
              desc = `${desc.substring(0, 500).replace(/<(?![b/])/g, "&lt;")} ...`;
            } else {
              desc = desc.replace(/<(?![b/])/g, "&lt;");
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
            return (
              <div key={key} className="container">
                <div className="row align-items-start headerRow">
                  <div className="col-sm-8 resultTitle">
                    <Link to={`/dataset/${rst.content.dataset_id}`}>{rst.content.dataset_name}</Link>
                  </div>
                  <div className="col-sm-4">
                    {/* <span className="typeBlock">{rst.content.primary_dataset_scope}</span> */}
                    <span
                      className="typeBlock"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title={tooltip}
                    >
                      {rst.content.primary_dataset_scope}
                    </span>
                  </div>
                </div>
                <div className="row align-items-start subHeaderRow">
                  <div className="col-sm">
                    <i className="fas fa-file" />
                    &nbsp;
                    <Link to={`/resource/${rst.content.data_resource_id}`}>{rst.highlight && rst.highlight.data_resource_name ? ReactHtmlParser(rst.highlight.data_resource_name) : rst.content.data_resource_id}</Link>
                  </div>
                </div>
                {
                  rst.content.projects && (
                    <div className="row align-items-start bodyRow">
                      <div className="col">
                        <label>Projects:</label>
                        {
                          rst.content.projects.length > 10 ? rst.content.projects.slice(0, 10).map((pj, pjidx) => {
                            const pjkey = `pj_${pjidx}`;
                            if (pjidx === 9) {
                              return (
                                <div key={pjkey}>
                                  <span className="itemSpan">
                                    {pj.p_k}
                                  </span>
                                  <span className="itemContinued">...</span>
                                </div>
                              );
                            }
                            return (
                              <span key={pjkey} className="itemSpan">
                                {pj.p_k}
                              </span>
                            );
                          })
                          : rst.content.projects.map((pj, pjidx) => {
                            const pjkey = `pj_${pjidx}`;
                            return (
                              <span key={pjkey} className="itemSpan">
                                {pj.p_k}
                              </span>
                            );
                          })
                        }
                      </div>
                    </div>
                  )
                }
                {
                  caseDiseaseDiagnosisList[idx].length > 0 && (
                    <div className="row align-items-start bodyRow">
                      <div className="col">
                        <label>Case Disease Diagnosis:</label>
                        {
                          caseDiseaseDiagnosisList[idx].length > 10 ? caseDiseaseDiagnosisList[idx].slice(0, 10).map((cdd, cddidx) => {
                            const cddkey = `cdd_${cddidx}`;
                            if (cddidx === 9) {
                              return (
                                <span key={cddkey} className="itemSpan">
                                  {ReactHtmlParser(cdd)}
                                </span>
                              );
                            }
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
                        <span className="textSpan">
                          {rst.content.case_id.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </span>
                      </div>
                    </div>
                  )
                }
                {
                  rst.highlight && rst.highlight["sample_assay_method.k"]
                  ? (
                    <div className="row align-items-start bodyRow">
                      <div className="col">
                        <label>Sample Assay Method:</label>
                        {
                          rst.highlight["sample_assay_method.k"].map((sam, samidx) => {
                            const samkey = `sam_${samidx}`;
                            return (
                              <span key={samkey} className="itemSpan">
                                {ReactHtmlParser(sam)}
                              </span>
                            );
                          })
                        }
                      </div>
                    </div>
                  ) : rst.content.sample_assay_method && (
                    <div className="row align-items-start bodyRow">
                      <div className="col">
                        <label>Sample Assay Method:</label>
                        {
                          rst.content.sample_assay_method.length > 10 ? rst.content.sample_assay_method.slice(0, 10).map((sam, samidx) => {
                            const samkey = `sam_${samidx}`;
                            if (samidx === 9) {
                              return (
                                <div key={samkey}>
                                  <span className="itemSpan">
                                    {sam.n}
                                  </span>
                                  <span className="itemContinued">...</span>
                                </div>
                              );
                            }
                            return (
                              <span key={samkey} className="itemSpan">
                                {sam.n}
                              </span>
                            );
                          })
                          : rst.content.sample_assay_method.map((sam, samidx) => {
                            const samkey = `sam_${samidx}`;
                            return (
                              <span key={samkey} className="itemSpan">
                                {sam.n}
                              </span>
                            );
                          })
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
                        <span className="textSpan">
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
                          {ReactHtmlParser(desc)}
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
                          caseTumorSiteList[idx].map((cdd, cddidx) => {
                            const cddkey = `cdd_${cddidx}`;
                            return (
                              <span key={cddkey} className="itemSpan">
                                {ReactHtmlParser(cdd)}
                              </span>
                            );
                          })
                        }
                      </div>
                    </div>
                  )
                }
                {
                  otherMatches.map((hl, hlidx) => {
                      const hlKey = `hl_${hl}_${hlidx}`;
                      return (
                        <div key={hlKey} className="row align-items-start footerRow">
                          <div className="col">
                            <label>
                              Other Match:&nbsp;
                              {toCapitalize(hl.replace(".k", "").replace(/_/g, " "))}
                            </label>
                            :&nbsp;
                            {ReactHtmlParser(rst.highlight[hl])}
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
                    const tooltip = tooltips[rst.content.primary_dataset_scope];
                    return (
                      <tr key={key} className="datasetTableRow">
                        <td><Link to={`/dataset/${rst.content.dataset_id}`}>{rst.content.dataset_name}</Link></td>
                        <td>{rst.content.case_id}</td>
                        <td>{rst.content.sample_id}</td>
                        <td><Link to={`/resource/${rst.content.data_resource_id}`}>{rst.content.data_resource_id}</Link></td>
                        <td>
                          <span
                            className="typeBlock"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title={tooltip}
                          >
                            {rst.content.primary_dataset_scope}
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
};

export default SearchResult;