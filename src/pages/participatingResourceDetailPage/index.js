import { connect } from 'react-redux';
import ParticipatingResourceDetail from './ParticipatingResourceDetail';
import {
  loadDataresourceDetail,
  // loadDataresourceDetailDatasets
} from '../../redux/actions/participatingResourcesActions';
import {
  initialLoadSearchResults
} from '../../redux/actions/searchActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    details: state.participatingResources.details,
    resultList: state.datasets.searchResults,
    // resultList: state.participatingResources.searchResults,
    // prdatasets: state.participatingResources.details,
  });

  const mapDispatchToProps = {
    onPageLoadDataresourceDetail: loadDataresourceDetail,
    onPageLoadSearchResults: initialLoadSearchResults,
    // onPageLoadDataresourceDetailDatasets: loadDataresourceDetailDatasets,
  };

  return connect(mapStateToProps, mapDispatchToProps)(ParticipatingResourceDetail);
})();

export default ReduxSearchResult;