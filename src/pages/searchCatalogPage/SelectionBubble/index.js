import { connect } from 'react-redux';
import SelectionBubble from './SelectionBubble';
import {
  bubbleRemoveClick
} from '../../../redux/actions/searchActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    selections: state.datasets.searchCriteria,
  });

  const mapDispatchToProps = {
    onBubbleRemoveClick: bubbleRemoveClick,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SelectionBubble);
})();

export default ReduxSearchResult;