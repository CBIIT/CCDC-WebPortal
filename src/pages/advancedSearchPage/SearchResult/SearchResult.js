import React, {useEffect} from 'react';
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
    padding: 0;
  }

  .headerRow .piBlock {
    text-align: right;
    padding: 0;
  }

  .subHeaderRow .typeBlock {
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

  .datasetTableRow a{
    color: #6199d0;
    font-weight: 600;
    text-decoration: none;
  }
`;

const SearchResult = ({
  resultList,
  viewType,
  onPageLoadSearchResults,
}) => {
  useEffect(() => {
      if (resultList.length === 0) {
          onPageLoadSearchResults().catch(error => {
              console.log(`Loading search catalog page datasets failed ${error}`);
          });
      }
  }, []);

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
                  <div className="col-sm-4 piBlock">
                    PI:&nbsp;
                    {rst.content.poc}
                  </div>
                </div>
                <div className="row align-items-start subHeaderRow">
                  <div className="col-sm">
                    <i className="fas fa-file" />
                    &nbsp;
                    <Link to={`/resource/${rst.content.data_resource_id}`}>{rst.content.data_resource_id}</Link>
                  </div>
                  <div className="col-sm">
                    Update Date:&nbsp;
                    {rst.content.digest_date.substring(0, 10)}
                  </div>
                  <div className="col-sm">
                    <span className="typeBlock">{rst.content.primary_dataset_scope}</span>
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
                  rst.highlight && rst.highlight["case_disease_diagnosis.k"]
                  ? (
                    <div className="row align-items-start bodyRow">
                      <div className="col">
                        <label>Cases:</label>
                        {
                          rst.highlight["case_disease_diagnosis.k"].map((cdd, cddidx) => {
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
                  ) : rst.content.case_disease_diagnosis && (
                    <div className="row align-items-start bodyRow">
                      <div className="col">
                        <label>Cases:</label>
                        {
                          rst.content.case_disease_diagnosis.length > 10 ? rst.content.case_disease_diagnosis.slice(0, 10).map((cdd, cddidx) => {
                            const cddkey = `cdd_${cddidx}`;
                            if (cddidx === 9) {
                              return (
                                <div key={cddkey}>
                                  <span className="itemSpan">
                                    {cdd.n}
                                  </span>
                                  <span className="itemContinued">...</span>
                                </div>
                              );
                            }
                            return (
                              <span key={cddkey} className="itemSpan">
                                {cdd.n}
                              </span>
                            );
                          })
                          : rst.content.case_disease_diagnosis.map((cdd, cddidx) => {
                            const cddkey = `cdd_${cddidx}`;
                            return (
                              <span key={cddkey} className="itemSpan">
                                {cdd.n}
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
                          {rst.content.case_id}
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
                          {rst.content.sample_id}
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
                      if (hl === "desc") {
                        return <></>;
                      }
                      if (hl === "projects.p_k") {
                        return <></>;
                      }
                      if (hl === "case_disease_diagnosis.k") {
                        return <></>;
                      }
                      if (hl === "sample_assay_method.k") {
                        return <></>;
                      }
                      const hlKey = `hl_${hl}_${hlidx}`;
                      return (
                        <div key={hlKey} className="row align-items-start footerRow">
                          <div className="col">
                            {hl}
                            :
                            {ReactHtmlParser(rst.highlight[hl])}
                          </div>
                        </div>
                      );
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
  onPageLoadSearchResults: PropTypes.func.isRequired,
};

export default SearchResult;