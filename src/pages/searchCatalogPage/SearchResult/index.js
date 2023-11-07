import { connect } from 'react-redux';
import SearchResult from './SearchResult';
import {
  changeSorting, changeSortingOrder
} from '../../../redux/actions/searchActions';
import { loadGlossaryTerms } from '../../../redux/actions/applicationActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    resultList: state.datasets.searchResults,
    sort: state.datasets.searchCriteria.sort,
    viewType: state.datasets.viewType,
    glossaryTerms: state.application.glossaryTerms,
  });

  const mapDispatchToProps = {
    onChangeSorting: changeSorting,
    onChangeSortingOrder: changeSortingOrder,
    onLoadGlossaryTerms: loadGlossaryTerms,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SearchResult);
})();

export default ReduxSearchResult;