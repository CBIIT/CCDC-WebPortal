import { connect } from 'react-redux';
import SearchResult from './SearchResult';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    resultList: state.documentSearch.results,
  });

  const mapDispatchToProps = {};

  return connect(mapStateToProps, mapDispatchToProps)(SearchResult);
})();

export default ReduxSearchResult;