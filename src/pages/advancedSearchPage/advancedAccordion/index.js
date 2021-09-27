import { connect } from 'react-redux';
import {
    clickSearchFilter,
} from '../../../redux/actions/searchFiltersActions';
import Accordion from './Accordion';

const ReduxAccordion = (() => {
  const mapStateToProps = (state, ownProps) => ({
    filters: Object.keys(state.searchFilters).length > 0 ? ownProps.fields.map((field) => {
      return state.searchFilters[field];
    }) : [],
    fields: ownProps.fields,
    selection: state.datasets.searchCriteria.facet_filters,
  });

  const mapDispatchToProps = {
    onClickSearchFilter: clickSearchFilter,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Accordion);
})();

export default ReduxAccordion;