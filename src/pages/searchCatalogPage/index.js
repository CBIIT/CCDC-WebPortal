import { connect } from 'react-redux';
import {
  loadFromUrlQuery,
} from '../../redux/actions/searchFiltersActions';
import {
  startFullTextSearch, bubbleRemoveClick, cleanUpSearchCriteria
} from '../../redux/actions/searchActions';
import SearchCatalogPage from './SearchCatalogPage';

const ReduxSearchCatalogPage = (() => {
  const mapStateToProps = (state) => ({
    searchCriteria: state.datasets.searchCriteria.search_text,
    viewType: state.datasets.viewType,
  });

  const mapDispatchToProps = {
    onLoadFromUrlQuery: loadFromUrlQuery,
    onStartFullTextSearch: startFullTextSearch,
    onBubbleRemoveClick: bubbleRemoveClick,
    onCleanUpSearchCriteria: cleanUpSearchCriteria,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SearchCatalogPage);
})();

export default ReduxSearchCatalogPage;