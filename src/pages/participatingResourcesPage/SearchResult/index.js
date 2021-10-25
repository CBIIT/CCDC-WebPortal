import { connect } from 'react-redux';
import SearchResult from './SearchResult';
import {
  initialLoadSearchResults
} from '../../../redux/actions/searchActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    pageInfo: state.participatingResources.searchCriteria.pageInfo,
    resultList: state.participatingResources.searchResults,
  });

  const mapDispatchToProps = {
    onPageLoadSearchResults: initialLoadSearchResults,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SearchResult);
})();

export default ReduxSearchResult;