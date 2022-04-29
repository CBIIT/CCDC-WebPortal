import { connect } from 'react-redux';
import SearchResult from './SearchResult';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    pageInfo: state.participatingResources.searchCriteria.pageInfo,
    resultList: state.participatingResources.searchResults,
  });

  const mapDispatchToProps = {};

  return connect(mapStateToProps, mapDispatchToProps)(SearchResult);
})();

export default ReduxSearchResult;