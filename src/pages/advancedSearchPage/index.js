import { connect } from 'react-redux';
import {clearAdvancedSearchSelection} from '../../redux/actions/advancedSearchFiltersActions';
import AdvancedSearchPage from './AdvancedSearchPage';

const ReduxAdvancedSearchPage = (() => {
  const mapStateToProps = (state) => ({
    advancedFilters: state.advancedSearch.advanced_facet_filters,
  });

  const mapDispatchToProps = {
    onClearAdvancedSearchSelection: clearAdvancedSearchSelection,
  };

  return connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchPage);
})();

export default ReduxAdvancedSearchPage;