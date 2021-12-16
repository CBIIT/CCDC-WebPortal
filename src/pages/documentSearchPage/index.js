import { connect } from 'react-redux';
import DocumentSearchPage from './DocumentSearchPage';
import {
  startDocumentSearch
} from '../../redux/actions/documentSearchActions';

const ReduxDocumentSearchPage = (() => {
  const mapStateToProps = (state) => ({
    searchKeyword: state.documentSearch.keyword,
    pageInfo: state.documentSearch.pageInfo,
  });

  const mapDispatchToProps = {
    onStartDocumentSearch: startDocumentSearch,
  };

  return connect(mapStateToProps, mapDispatchToProps)(DocumentSearchPage);
})();

export default ReduxDocumentSearchPage;