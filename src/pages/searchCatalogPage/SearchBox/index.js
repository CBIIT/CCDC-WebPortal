import { connect } from 'react-redux';
import {
  startFullTextSearch,
} from '../../../redux/actions/searchActions';
import SearchBox from './SearchBox';

const ReduxSearchBox = (() => {
  const mapStateToProps = (state) => ({
    searchText: state.datasets.searchCriteria.search_text,
  });

  const mapDispatchToProps = {
    onStartFullTextSearch: startFullTextSearch,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SearchBox);
})();

export default ReduxSearchBox;