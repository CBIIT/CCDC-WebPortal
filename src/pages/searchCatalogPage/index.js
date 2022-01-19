import { connect } from 'react-redux';
import {
  loadFromUrlQuery,
} from '../../redux/actions/searchFiltersActions';
import {
  startFullTextSearch, bubbleRemoveClick
} from '../../redux/actions/searchActions';
import SearchCatalogPage from './SearchCatalogPage';

const ReduxSearchCatalogPage = (() => {
  const mapStateToProps = (state) => ({
    searchCriteria: state.datasets.searchCriteria.search_text,
  });

  const mapDispatchToProps = {
    onLoadFromUrlQuery: loadFromUrlQuery,
    onStartFullTextSearch: startFullTextSearch,
    onBubbleRemoveClick: bubbleRemoveClick,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SearchCatalogPage);
})();

export default ReduxSearchCatalogPage;