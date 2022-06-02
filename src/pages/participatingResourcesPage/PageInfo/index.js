import { connect } from 'react-redux';
import {
  pageSelect, sizeSelect,
} from '../../../redux/actions/participatingResourcesActions';
import PageInfo from './PageInfo';

const ReduxPageInfo = (() => {
  const mapStateToProps = (state) => ({
    pageInfo: state.participatingResources.searchCriteria.pageInfo,
  });

  const mapDispatchToProps = {
    onPageSelect: pageSelect,
    onSizeSelect: sizeSelect,
  };

  return connect(mapStateToProps, mapDispatchToProps)(PageInfo);
})();

export default ReduxPageInfo;