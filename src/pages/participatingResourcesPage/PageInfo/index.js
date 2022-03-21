import { connect } from 'react-redux';
import {
  pageSelect,
} from '../../../redux/actions/participatingResourcesActions';
import PageInfo from './PageInfo';

const ReduxPageInfo = (() => {
  const mapStateToProps = (state) => ({
    pageInfo: state.participatingResources.searchCriteria.pageInfo,
  });

  const mapDispatchToProps = {
    onPageSelect: pageSelect,
  };

  return connect(mapStateToProps, mapDispatchToProps)(PageInfo);
})();

export default ReduxPageInfo;