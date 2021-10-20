import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DataResourceIcons from '../../components/DataResourceIcons';
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
        <DatasetResultContainer>
        {
            resultList.map((rst, idx) => {
                const key = `sr${idx}`;
                if (rst.content.dataset_id === page) {
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
                        <div className="datasetIcon">
                          <DataResourceIcons participatingResource={rst.data_resource_id} />
                        </div>
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