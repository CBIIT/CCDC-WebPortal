import { connect } from 'react-redux';
import SearchResult from './SearchResult';
import {
  initialLoadSearchResults
} from '../../../redux/actions/searchActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    resultList: state.datasets.searchResults,
    viewType: state.datasets.viewType,
  });

  const mapDispatchToProps = {
    onPageLoadSearchResults: initialLoadSearchResults,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SearchResult);
})();

export default ReduxSearchResult;