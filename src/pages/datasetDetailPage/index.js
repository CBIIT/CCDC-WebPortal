import { connect } from 'react-redux';
import DatasetDetail from './DatasetDetail';
import {
  loadDatasetDetail
} from '../../redux/actions/searchActions';
import { loadGlossaryTerms } from '../../redux/actions/applicationActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    details: state.datasets.details,
    glossaryTerms: state.application.glossaryTerms,
  });

  const mapDispatchToProps = {
    onPageLoadDatasetDetail: loadDatasetDetail,
    onLoadGlossaryTerms: loadGlossaryTerms,
  };

  return connect(mapStateToProps, mapDispatchToProps)(DatasetDetail);
})();

export default ReduxSearchResult;