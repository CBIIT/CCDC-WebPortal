import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import './datasetDetailPage.css';

const DatasetResultContainer = styled.div``;

const path = window.location.pathname;
const page = path.split("/").pop();
// console.log(page);

const DatasetDetail = ({
  resultList,
//   onPageLoadSearchResults,
}) => {
  useEffect(() => {
    if (resultList.length === 0) {
    //   onPageLoadSearchResults().catch(error => {
    //     throw new Error(`Loading search catalog page datasets failed ${error}`);
    //   });
    }
  }, []);

  return (
    <>
            {/* <table className="table table-striped">
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
                        <td><Link to={`/dataset/${rst.content.dataset_id}`}>{rst.content.dataset_id}</Link></td>
                        <td>{rst.content.case_id}</td>
                        <td><Link to={`/resource/${rst.content.data_resource_id}`}>{rst.content.data_resource_id}</Link></td>
                        <td>{rst.content.primary_dataset_scope}</td>
                        <td>{rst.content.digest_date.substring(0, 10)}</td>
                      </tr>
                    );
                  })
                  }
              </tbody>
            </table> */}
        <DatasetResultContainer>
        {
            resultList.map((rst, idx) => {
                const key = `sr${idx}`;
                // console.log("asdfasddfasfasf");
                // document.write(page);
                if (rst.content.dataset_id === page) {
                  // console.log("asdfasddfasfasfƒƒff");
                  return (
                    <div key={key}>
                      <div className="datasetBreadcrumbContainer">
                        <ul className="breadcrumb">
                            <li><a href="/">Home</a></li>
                            <li><a href="/search">Search Catalog</a></li>
                            <li><Link to={`/dataset/${rst.content.dataset_id}`}>{rst.content.dataset_name}</Link></li>
                            {/* <li><a href="/dataset">{rst.content.dataset_id}</a></li> */}
                        </ul>
                      </div>
                      <div className="datasetDetailHeaderContainer">
                        <div className="datasetDetailHeaderLabel">{rst.content.dataset_name}</div>
                        <div className="datasetDetailHeaderContent">
                          Data Resource: &nbsp;
                          <span className="datasetDetailHeaderText">{rst.content.data_resource_id}</span>
                        </div>
                        <div className="datasetDetailHeaderContent">
                          Point of Contact: &nbsp;
                          <span className="datasetDetailHeaderText">
                            {rst.content.primary_dataset_scope}
                            , &nbsp;
                            {rst.content.poc}
                            &nbsp;
                            {rst.content["Case Ethnicity"]}
                            &nbsp;
                            {rst.content.case_age_at_diagnosis.values()}
                          </span>
                        </div>
                      </div>
                      <div className="aboutContentContainer">
                        <div className="aboutDatasetContainer">
                          <div className="aboutDatasetLabel">About This Dataset</div>
                          <div className="coreDataContainer">
                            <div className="coreDataLabel">Core Data Elements</div>
                            <div className="dataElementLabel">Case Age</div>
                            <div className="dataElementLabel">Case Ethnicity</div>
                            <div className="dataElementLabel">Case Disease Diagnosis</div>
                            <div className="dataElementLabel">Sample Assay Method</div>
                            <div className="dataElementLabel">Case Race</div>
                            <div className="dataElementLabel">Case Sex</div>
                            <div className="dataElementLabel">Number of Cases</div>
                            <div className="dataElementLabel">Number of Samples</div>
                          </div>
                          <div className="additionalDataContainer">
                            <div className="additionalDataLabel">Additional Data Elements</div>
                            <div className="dataElementLabel">File Type</div>
                            <div className="dataElementLabel">Sample Type</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return (null);
            })
        }
        </DatasetResultContainer>
    </>
  );
};

DatasetDetail.propTypes = {
  resultList: PropTypes.array.isRequired,
//   onPageLoadSearchResults: PropTypes.func.isRequired,
};

export default DatasetDetail;