import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import './participatingResourceDetailPage.css';

const ParticipatingResourceResultContainer = styled.div`
  // width: 1400px;
`;

const DataLink = styled.li`
  text-decoration: none;
`;

const path = window.location.pathname;
const page = path.split("/").pop();
// console.log(page);

const ParticipatingResourceDetail = ({
  participatingResources, onLoadLandingParticipatingResources
  // viewType,
//   onPageLoadSearchResults,
}) => {
  useEffect(() => {
    if (participatingResources.length === 0) {
      onLoadLandingParticipatingResources().catch(error => {
        throw new Error(`Loading page participating resources failed ${error}`);
      });
    }
  }, []);

  return (
    <>
        <ParticipatingResourceResultContainer>
        {
            participatingResources.map((pr, idx) => {
                const key = `sr${idx}`;
                // console.log("asdfasddfasfasf");
                // document.write(page);
                if (pr.data_resource_id === page) {
                  // console.log("asdfasddfasfasfƒƒff");
                  return (
                    <div key={key}>
                      <div className="prBreadcrumbContainer">
                        <ul className="breadcrumb">
                            <li><a href="/">Home</a></li>
                            <li><a href="/search">Search Catalog</a></li>
                            <li><Link to={`/resource/${pr.data_resource_id}`}>{pr.data_resource_id}</Link></li>
                            {/* <li><a href="/dataset">{pr.content.dataset_id}</a></li> */}
                        </ul>
                      </div>
                      <div className="prDetailHeaderContainer">
                        <div className="prDetailHeaderLabel">{pr.resource_name}</div>
                        <div className="prDetailHeaderContent">
                          <Link to={pr.resource_uri} className="prDetailHeaderText">{pr.resource_uri}</Link>
                        </div>
                        <div className="prDetailHeaderContent">
                          Point of Contact: &nbsp;
                          <span className="prDetailHeaderText">
                            {pr.poc}
                            , &nbsp;
                            <Link to={pr.poc_email} className="prDetailHeaderText">{pr.poc_email}</Link>
                            &nbsp;
                          </span>
                        </div>
                      </div>
                      <div className="prAboutContentContainer">
                        <div className="prAboutResourceContainer">
                          <div className="prAboutResourceLabel">About This Resource</div>
                          <div className="prAboutResourceContent">{pr.description}</div>
                          <div className="prResourceToolsContainer">
                            <div className="prCoreDataLabel">Resource Description</div>
                            <div className="prDataElementLabel">Data Resource Type</div>
                              {pr.resource_type}
                            <div className="prDataElementLabel">Specialization</div>
                          </div>
                          <div className="prDataAccessContainer">
                            <div className="prAdditionalDataLabel">Resource Data Content Types</div>
                              <p />
                              {pr.has_genomics_omics > 0 ? 'Omics Data' : ''}
                              <p />
                              {pr.has_imaging_data > 0 ? 'Imaging Data' : ''}
                              <p />
                              {pr.has_clinical_data > 0 ? 'Clinical Data' : ''}
                              <p />
                              {pr.has_xenograft_data > 0 ? 'Xenograft Data' : ''}
                              <p />
                              {pr.has_cell_lines_data > 0 ? 'Cell Lines Data' : ''}
                          </div>
                          <div className="prResourceToolsContainer">
                            <div className="prCoreDataLabel">Resource Tools</div>
                            <div className="prDataElementLabel">Visualization Tools</div>
                              {pr.visualization > 0 ? 'YES' : 'NO'}
                            <div className="prDataElementLabel">Analytic Tools</div>
                              {pr.analytics > 0 ? 'YES' : 'NO'}
                          </div>
                          <div className="prDataAccessContainer">
                            <div className="prAdditionalDataLabel">Data Access</div>
                            <div className="prDataElementLabel">API (Internal)</div>
                              <DataLink>
                                <a href={pr.api}>{pr.api}</a>
                              </DataLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return (null);
            })
        }
        </ParticipatingResourceResultContainer>
    </>
  );
};

ParticipatingResourceDetail.propTypes = {
  participatingResources: PropTypes.array.isRequired,
  onLoadLandingParticipatingResources: PropTypes.func.isRequired,
  // viewType: PropTypes.string.isRequired,
//   onPageLoadSearchResults: PropTypes.func.isRequired,
};

export default ParticipatingResourceDetail;