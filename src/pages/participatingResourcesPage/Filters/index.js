import { connect } from 'react-redux';
import {
  loadSearchFilters,
} from '../../../redux/actions/participatingResourcesActions';
import Filters from './Filters';

const ReduxFilters = (() => {
  const mapStateToProps = (state) => ({
    searchFilters: state.participatingResources.searchFilters,
  });

  const mapDispatchToProps = {
    onLoadSearchFilters: loadSearchFilters,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Filters);
})();

export default ReduxFilters;