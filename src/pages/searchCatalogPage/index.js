import { connect } from 'react-redux';
import {
  loadFromUrlQuery,
} from '../../redux/actions/searchFiltersActions';
import SearchCatalogPage from './SearchCatalogPage';

const ReduxSearchCatalogPage = (() => {
  const mapStateToProps = (state) => ({
    searchCriteria: state.datasets.searchCriteria,
  });

  const mapDispatchToProps = {
    onLoadFromUrlQuery: loadFromUrlQuery,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SearchCatalogPage);
})();

export default ReduxSearchCatalogPage;