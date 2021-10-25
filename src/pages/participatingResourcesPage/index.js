import { connect } from 'react-redux';
import {
  loadFromUrlQuery,
} from '../../redux/actions/participatingResourcesActions';
import ParticipatingResourcesPage from './ParticipatingResourcesPage';

const ReduxParticipatingResourcesPage = (() => {
  const mapStateToProps = (state) => ({
    total: state.participatingResources.searchCriteria.pageInfo.total,
  });

  const mapDispatchToProps = {
    onLoadFromUrlQuery: loadFromUrlQuery,
  };

  return connect(mapStateToProps, mapDispatchToProps)(ParticipatingResourcesPage);
})();

export default ReduxParticipatingResourcesPage;