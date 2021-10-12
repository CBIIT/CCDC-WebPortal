import { connect } from 'react-redux';
import {
  loadAdvancedSearchFilters, clickAdvancedSearchFilter,
} from '../../../redux/actions/advancedSearchFiltersActions';
import Filters from './advancedFilters';

const ReduxFilters = (() => {
  const mapStateToProps = (state) => ({
    advancedFilters: state.advancedSearch.advancedFilters,
  });

  const mapDispatchToProps = {
    onLoadAdvancedSearchFilters: loadAdvancedSearchFilters,
    onClickAdvancedSearchFilter: clickAdvancedSearchFilter,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Filters);
})();

export default ReduxFilters;