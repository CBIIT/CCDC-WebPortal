import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactHtmlParser from "react-html-parser";

const SearchResultContainer = styled.div`
  width: 100%;
  padding-top: 10px;
  
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
    color: #046ab2;
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

  .container .bodyRow {
    margin-bottom: 5px;
  }

  .bodyRow label {
    font-weight: 600;
  }

  .bodyRow .itemSpan {
    margin-left: 5px;
    background-color: #efe8d9;
    border-radius: 5px;
    padding: 0 5px;
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

const SearchResult = ({
  resultList,
  viewType,
}) => {
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
        const raw = item.indexOf() > -1 ? item.replace(/<b>/g, "").replace(/<\/b>/g, "") : item;
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

  return (
    <>
      <SearchResultContainer>
        {
          viewType === "card" ? resultList.map((rst, idx) => {
            const key = `sr_${idx}`;
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
                      title={rst.content.primary_dataset_scope === 'Aliquot' ? `Pertaining to a portion of the whole; any one of two or more samples of something, of the same volume or weight. [NCIt C25414]`
                      : rst.content.primary_dataset_scope === 'Assay' ? `An examination or analysis of material, or of its prior assay, to determine the material's features or components.`
                      : rst.content.primary_dataset_scope === 'Case' ? `A collection of data related to a specific individual in the context of a specific project.`
                      : rst.content.primary_dataset_scope === 'Cell Line' ? `A cell culture developed from a single cell or group of similar cells and therefore consisting of cells with a uniform genetic makeup that can be reproduced for various types of research. A cell line is different than a tissue sample in that it is grown as a culture of identical cells and can be reproduced indefinitely.`
                      : rst.content.primary_dataset_scope === 'Collection' ? `A group of datasets collected together for any reason by an organization of researchers, stewards, or stakeholders either pertaining to a common theme or for a common purpose. For example, the Treehouse Childhood Cancer Initiative maintains a collection of cell line data as part of their repository of pediatric cancer genomic data.`
                      : rst.content.primary_dataset_scope === 'Donor' ? `A donor is an individual (either human or animal) from which tissue for grafting, tissue for creating a cell line, or tumor sample for studying was taken. In these contexts the datasets are not associated with clinical or project cases. Minimal information about a donor helps describe the grafted tissue, the cell line, or the tumor sample.`
                      : rst.content.primary_dataset_scope === 'Program' ? `A coherent assembly of plans, project activities, and supporting resources contained within an administrative framework, the purpose of which is to implement an organization's mission or some specific program-related aspect of that mission.`
                      : rst.content.primary_dataset_scope === 'Project' ? `Any specifically defined piece of work that is undertaken or attempted to meet the goals of a program and that involves one or more case studies. Also known as a Study or Trial.`
                      : rst.content.primary_dataset_scope === 'Sample' ? `Material taken from a biological entity for testing, diagnostic, propagation, treatment or research purposes, including a sample obtained from a living organism or taken from the biological object after halting of all its life functions. A sample, also known as a biospecimen, can contain one or more components including but not limited to cellular molecules, cells, tissues, organs, body fluids, embryos, and body excretory products. {Based on the GDC definition of Sample. (https://docs.gdc.cancer.gov/Data_Dictionary/viewer/#?view=table-definition-view&id=sample)}`
                      : rst.content.primary_dataset_scope === 'Xenograft' ? `Cells, tissues, or organs from a donor that are transplanted into a recipient of another species.`
                      : 'primary dataset scope'}
                    >
                      {rst.content.primary_dataset_scope}
                    </span>
                  </div>
                </div>
                <div className="row align-items-start subHeaderRow">
                  <div className="col-sm">
                    <i className="fas fa-file" />
                    &nbsp;
                    <Link to={`/resource/${rst.content.data_resource_id}`}>{rst.highlight && rst.highlight.data_resource_id ? (<b>{rst.content.data_resource_id}</b>) : rst.content.data_resource_id}</Link>
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
                                <div key={cddkey}>
                                  <span className="itemSpan">
                                    {ReactHtmlParser(cdd)}
                                  </span>
                                  <span className="itemContinued">...</span>
                                </div>
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
                  rst.highlight && rst.highlight.desc
                  ? (
                    <div className="row align-items-start bodyRow">
                      <div className="col">
                        <label>Description:</label>
                        <span className="textSpan">
                          {rst.highlight.desc.length > 500 ? ReactHtmlParser(`${rst.highlight.desc.substring(0, 500)} ...`) : ReactHtmlParser(rst.highlight.desc)}
                        </span>
                      </div>
                    </div>
                  ) : rst.content.desc && (
                    <div className="row align-items-start bodyRow">
                      <div className="col">
                        <label>Description:</label>
                        <span className="textSpan">
                          {rst.content.desc.length > 500 ? `${rst.content.desc.substring(0, 500)} ...` : rst.content.desc}
                        </span>
                      </div>
                    </div>
                  )
                }
                {
                  rst.highlight && (
                    Object.keys(rst.highlight).map((hl, hlidx) => {
                      if (hl !== "dataset_name" && hl !== "data_resource_id" && hl !== "desc" && hl !== "projects.p_k" && hl !== "case_disease_diagnosis.k" && hl !== "case_disease_diagnosis.s" && hl !== "sample_assay_method.k") {
                        const hlKey = `hl_${hl}_${hlidx}`;
                        return (
                          <div key={hlKey} className="row align-items-start footerRow">
                            <div className="col">
                              <label>
                                Other Match :
                                &nbsp;
                                {hl.replace(".k", "").replace(/_/g, " ")}
                              </label>
                              :&nbsp;
                              {ReactHtmlParser(rst.highlight[hl])}
                            </div>
                          </div>
                        );
                      }
                      return <></>;
                    })
                  )
                }
              </div>
            );
          })
          : (
            <table className="table table-striped">
              <thead>
                  <tr style={{ color: 'navy' }}>
                      <th scope="col">Dataset Name</th>
                      <th scope="col">Cases</th>
                      <th scope="col">Samples</th>
                      <th scope="col">Resource Name</th>
                      <th scope="col">Dataset Type</th>
                      <th scope="col">Update Date</th>
                  </tr>
              </thead>
              <tbody>
                  {
                  resultList.map((rst, idx) => {
                    const key = `dataset_table_${idx}`;
                    return (
                      <tr key={key} className="datasetTableRow">
                        <td><Link to={`/dataset/${rst.content.dataset_id}`}>{rst.content.dataset_name}</Link></td>
                        <td>{rst.content.case_id}</td>
                        <td>{rst.content.sample_id}</td>
                        <td><Link to={`/resource/${rst.content.data_resource_id}`}>{rst.content.data_resource_id}</Link></td>
                        <td>{rst.content.primary_dataset_scope}</td>
                        <td>{rst.content.digest_date.substring(0, 10)}</td>
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
  viewType: PropTypes.string.isRequired,
};

export default SearchResult;