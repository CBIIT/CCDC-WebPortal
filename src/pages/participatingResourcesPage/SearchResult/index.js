import { connect } from 'react-redux';
import SearchResult from './SearchResult';
import { loadGlossaryTerms } from '../../../redux/actions/applicationActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    pageInfo: state.participatingResources.searchCriteria.pageInfo,
    resultList: state.participatingResources.searchResults,
    glossaryTerms: state.application.glossaryTerms,
  });

  const mapDispatchToProps = {
    onLoadGlossaryTerms: loadGlossaryTerms,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SearchResult);
})();

export default ReduxSearchResult;