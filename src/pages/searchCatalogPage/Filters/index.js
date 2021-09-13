import { connect } from 'react-redux';
import {
  loadSearchFilters,
} from '../../../redux/actions/searchFiltersActions';
import Filters from './Filters';

const ReduxFilters = (() => {
  const mapStateToProps = (state) => ({
    searchFilters: state.searchFilters,
  });

  const mapDispatchToProps = {
    onLoadSearchFilters: loadSearchFilters,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Filters);
})();

export default ReduxFilters;