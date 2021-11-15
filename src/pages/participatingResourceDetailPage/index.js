import { connect } from 'react-redux';
import ParticipatingResourceDetail from './ParticipatingResourceDetail';
import {
  loadDataresourceDetail,
  loadDataresourceDetailDatasets,
} from '../../redux/actions/participatingResourcesActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    detail: state.participatingResources.detail,
    datasets: state.participatingResources.datasets,
  });

  const mapDispatchToProps = {
    onPageLoadDataresourceDetail: loadDataresourceDetail,
    onPageLoadDataresourceDetailDatasets: loadDataresourceDetailDatasets,
  };

  return connect(mapStateToProps, mapDispatchToProps)(ParticipatingResourceDetail);
})();

export default ReduxSearchResult;