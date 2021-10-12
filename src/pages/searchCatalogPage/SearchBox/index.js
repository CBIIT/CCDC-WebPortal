import { connect } from 'react-redux';
import {
  startFullTextSearch, bubbleRemoveClick
} from '../../../redux/actions/searchActions';
import SearchBox from './SearchBox';

const ReduxSearchBox = (() => {
  const mapStateToProps = (state, ownProps) => ({
    searchCriteria: state.datasets.searchCriteria,
    searchText: ownProps.searchText,
  });

  const mapDispatchToProps = {
    onStartFullTextSearch: startFullTextSearch,
    onBubbleRemoveClick: bubbleRemoveClick,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SearchBox);
})();

export default ReduxSearchBox;