import { connect } from 'react-redux';
import ParticipatingResourceDetail from './ParticipatingResourceDetail';
// import {
//   initialLoadSearchResults,
// } from '../../redux/actions/searchActions';
import {
    loadLandingParticipatingResources,
} from '../../redux/actions/participatingResourcesActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    // participatingResources: state.datasets.searchResults,
    participatingResources: state.participatingResources.landing,
  });

  const mapDispatchToProps = {
    // onPageLoadSearchResults: initialLoadSearchResults,
    onLoadLandingParticipatingResources: loadLandingParticipatingResources,
  };

  return connect(mapStateToProps, mapDispatchToProps)(ParticipatingResourceDetail);
})();

export default ReduxSearchResult;

// import React from "react";

// const ParticipatingResourceDetailPage = () => (
//     <div>
//         <h2>Participating Resource Detail Page Content</h2>
//     </div>
// );

// export default ParticipatingResourceDetailPage;