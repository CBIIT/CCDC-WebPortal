import { connect } from 'react-redux';
import ParticipatingResourceDetail from './ParticipatingResourceDetail';
import {
  loadDataresourceDetail,
  loadDataresourceDetailDatasets,
} from '../../redux/actions/participatingResourcesActions';
import { loadGlossaryTerms } from '../../redux/actions/applicationActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    detail: state.participatingResources.detail,
    datasets: state.participatingResources.datasets,
    glossaryTerms: state.application.glossaryTerms,
  });

  const mapDispatchToProps = {
    onPageLoadDataresourceDetail: loadDataresourceDetail,
    onPageLoadDataresourceDetailDatasets: loadDataresourceDetailDatasets,
    onLoadGlossaryTerms: loadGlossaryTerms,
  };

  return connect(mapStateToProps, mapDispatchToProps)(ParticipatingResourceDetail);
})();

export default ReduxSearchResult;