import { connect } from 'react-redux';
import {
  pageSelect,
} from '../../../redux/actions/searchActions';
import PageInfo from './PageInfo';

const ReduxPageInfo = (() => {
  const mapStateToProps = (state) => ({
    pageInfo: state.datasets.searchCriteria.pageInfo,
  });

  const mapDispatchToProps = {
    onPageSelect: pageSelect,
  };

  return connect(mapStateToProps, mapDispatchToProps)(PageInfo);
})();

export default ReduxPageInfo;