import { connect } from 'react-redux';
import DatasetDetail from './DatasetDetail';
import {
  loadDatasetDetail
} from '../../redux/actions/searchActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    detail: state.datasets.details,
  });

  const mapDispatchToProps = {
    onPageLoadDatasetDetail: loadDatasetDetail,
  };

  return connect(mapStateToProps, mapDispatchToProps)(DatasetDetail);
})();

export default ReduxSearchResult;