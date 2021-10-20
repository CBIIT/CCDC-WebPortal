import { connect } from 'react-redux';
import DatasetDetail from './DatasetDetail';
import {
  initialLoadSearchResults
} from '../../redux/actions/searchActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    resultList: state.datasets.searchResults,
  });

  const mapDispatchToProps = {
    onPageLoadSearchResults: initialLoadSearchResults,
  };

  return connect(mapStateToProps, mapDispatchToProps)(DatasetDetail);
})();

export default ReduxSearchResult;