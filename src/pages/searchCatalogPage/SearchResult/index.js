import { connect } from 'react-redux';
import SearchResult from './SearchResult';
import {
  changeSorting, changeSortingOrder
} from '../../../redux/actions/searchActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    resultList: state.datasets.searchResults,
    sort: state.datasets.searchCriteria.sort,
    viewType: state.datasets.viewType,
  });

  const mapDispatchToProps = {
    onChangeSorting: changeSorting,
    onChangeSortingOrder: changeSortingOrder,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SearchResult);
})();

export default ReduxSearchResult;