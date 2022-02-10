import { connect } from 'react-redux';
import {
  loadFromUrlQuery,
  cleanUpParticipatingResourceListPage,
} from '../../redux/actions/participatingResourcesActions';
import ParticipatingResourcesPage from './ParticipatingResourcesPage';

const ReduxParticipatingResourcesPage = (() => {
  const mapStateToProps = (state) => ({
    total: state.participatingResources.searchCriteria.pageInfo.total,
  });

  const mapDispatchToProps = {
    onLoadFromUrlQuery: loadFromUrlQuery,
    onCleanUpParticipatingResourceListPage: cleanUpParticipatingResourceListPage,
  };

  return connect(mapStateToProps, mapDispatchToProps)(ParticipatingResourcesPage);
})();

export default ReduxParticipatingResourcesPage;