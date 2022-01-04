import { connect } from 'react-redux';
import {
  loadSearchDataResources,
} from '../../../redux/actions/searchFiltersActions';
import Filters from './Filters';

const ReduxFilters = (() => {
  const mapStateToProps = (state) => ({
    searchFilters: state.searchFilters,
    sourceFilters: state.datasets.searchSourceResults,
  });

  const mapDispatchToProps = {
    onLoadSearchDataResources: loadSearchDataResources,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Filters);
})();

export default ReduxFilters;