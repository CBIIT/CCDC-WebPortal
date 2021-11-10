import { connect } from 'react-redux';
import ParticipatingResourceDetail from './ParticipatingResourceDetail';
import {
  loadDataresourceDetail,
  loadDataresourceDetailDatasets,
} from '../../redux/actions/participatingResourcesActions';
import {
  initialLoadSearchResults
} from '../../redux/actions/searchActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    details: state.participatingResources.details,
    datasets: state.participatingResources.datasets,
    resultList: state.datasets.searchResults,
    // resultList: state.participatingResources.searchResults,
    // prdatasets: state.participatingResources.details,
  });

  const mapDispatchToProps = {
    onPageLoadDataresourceDetail: loadDataresourceDetail,
    onPageLoadDataresourceDetailDatasets: loadDataresourceDetailDatasets,
    onPageLoadSearchResults: initialLoadSearchResults,
  };

  return connect(mapStateToProps, mapDispatchToProps)(ParticipatingResourceDetail);
})();

export default ReduxSearchResult;