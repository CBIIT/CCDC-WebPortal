import { connect } from 'react-redux';
import {
  clickAdvancedSearchFilter,
} from '../../redux/actions/advancedSearchFiltersActions';
import SelectionWithCheckBox from './SelectionWithCheckBox';

const ReduxSelectionWithCheckBox = (() => {
  const mapStateToProps = (state, ownProps) => ({
    advancedFilter: state.advancedSearch.advancedFilters[ownProps.selectionLabel] ? state.advancedSearch.advancedFilters[ownProps.selectionLabel] : [],
    selectionLabel: ownProps.selectionLabel,
    selectionField: ownProps.selectionField,
  });

  const mapDispatchToProps = {
    onClickAdvancedSearchFilter: clickAdvancedSearchFilter,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SelectionWithCheckBox);
})();

export default ReduxSelectionWithCheckBox;