import React from "react";
// import { Link } from "react-router-dom";
import './datasetDetailPage.css';

const DatasetDetailPage = () => {
    return (
      <>
        <div className="datasetBreadcrumbContainer">
          <nav separator="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a href="/search">Search Catalog</a></li>
              <li className="breadcrumb-item active" aria-current="page">Dataset: Dataset Name</li>
            </ol>
          </nav>
        </div>
        <div className="aboutDatasetContainer">
          <div className="coreDataContainer">
            <div className="coreDataLabel">Core Data</div>
          </div>
          <div className="additionalDataContainer">
            <div className="additionalDataLabel">Additional Data</div>
          </div>
        </div>
        <div>
          <h2>Dataset Detail Page Content</h2>
        </div>

      </>
    );
  };

  export default DatasetDetailPage;