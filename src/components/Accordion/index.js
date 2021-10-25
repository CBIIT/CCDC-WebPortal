import { connect } from 'react-redux';
import {
    clickSearchFilter,
} from '../../redux/actions/searchFiltersActions';
import {
  clickParticipatingResourcesSearchFilter,
} from '../../redux/actions/participatingResourcesActions';
import Accordion from './Accordion';

const iff = (filters, fields) => {
  if (Object.keys(filters).length > 0) {
     return fields.map((field) => {
      return filters[field.toLowerCase().replaceAll(' ', '_')];
    });
  }
  return [];
};

const ReduxAccordion = (() => {
  const mapStateToProps = (state, ownProps) => ({
    filters: ownProps.domain === "dataset" ? iff(state.searchFilters, ownProps.fields) : iff(state.participatingResources.searchFilters, ownProps.fields),
    fields: ownProps.fields,
    selection: ownProps.domain === "dataset" ? state.datasets.searchCriteria.facet_filters : state.participatingResources.searchCriteria.facet_filters,
    domain: ownProps.domain,
  });

  const mapDispatchToProps = {
    onClickSearchFilter: clickSearchFilter,
    onClickParticipatingResourcesSearchFilter: clickParticipatingResourcesSearchFilter,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Accordion);
})();

export default ReduxAccordion;