import { connect } from 'react-redux';
import ParticipatingResourceDetail from './ParticipatingResourceDetail';
import {
  loadDataresourceDetail
} from '../../redux/actions/participatingResourcesActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    details: state.participatingResources.details,
  });

  const mapDispatchToProps = {
    onPageLoadDataresourceDetail: loadDataresourceDetail,
  };

  return connect(mapStateToProps, mapDispatchToProps)(ParticipatingResourceDetail);
})();

export default ReduxSearchResult;