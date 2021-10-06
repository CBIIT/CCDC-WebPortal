import { connect } from 'react-redux';
import {
  loadAdvancedSearchFilters,
} from '../../../redux/actions/advancedSearchFiltersActions';
import Filters from './advancedFilters';

const ReduxFilters = (() => {
  const mapStateToProps = (state) => ({
    advancedFilters: state.advancedFilters,
  });

  const mapDispatchToProps = {
    onLoadAdvancedSearchFilters: loadAdvancedSearchFilters,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Filters);
})();

export default ReduxFilters;