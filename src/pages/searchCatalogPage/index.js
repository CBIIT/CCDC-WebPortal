import { connect } from 'react-redux';
import {
  loadFromUrlQuery, startFullTextSearch, bubbleSearchTextRemoveClick, bubbleResourcesRemoveClick
} from '../../redux/actions/searchActions';
import SearchCatalogPage from './SearchCatalogPage';

const ReduxSearchCatalogPage = (() => {
  const mapStateToProps = (state) => ({
    searchCriteria: state.datasets.searchCriteria.search_text,
    searchKeyword: state.datasets.searchCriteria.search_text,
    resourceFilters: state.datasets.searchCriteria.resources_filter,
    viewType: state.datasets.viewType,
  });

  const mapDispatchToProps = {
    onLoadFromUrlQuery: loadFromUrlQuery,
    onStartFullTextSearch: startFullTextSearch,
    onBubbleSearchTextRemoveClick: bubbleSearchTextRemoveClick,
    onBubbleResourcesRemoveClick: bubbleResourcesRemoveClick,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SearchCatalogPage);
})();

export default ReduxSearchCatalogPage;