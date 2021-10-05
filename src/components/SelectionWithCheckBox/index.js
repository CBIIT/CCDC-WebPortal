import { connect } from 'react-redux';
import {
  clickAdvancedSearchFilter,
} from '../../redux/actions/advancedSearchFiltersActions';
import SelectionWithCheckBox from './SelectionWithCheckBox';

const ReduxSelectionWithCheckBox = (() => {
  const mapStateToProps = (state, ownProps) => ({
    advancedFilter: state.advancedFilters[ownProps.selectionLabel] ? state.advancedFilters[ownProps.selectionLabel] : [],
    selectionLabel: ownProps.selectionLabel,
  });

  const mapDispatchToProps = {
    onClickAdvancedSearchFilter: clickAdvancedSearchFilter,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SelectionWithCheckBox);
})();

export default ReduxSelectionWithCheckBox;