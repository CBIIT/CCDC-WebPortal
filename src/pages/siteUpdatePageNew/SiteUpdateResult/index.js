import { connect } from 'react-redux';
import {
  loadSiteUpdates, addSiteUpdates
} from '../../../redux/actions/applicationActions';
import SiteUpdateResult from './SiteUpdateResult';

const ReduxSiteUpdateResult = (() => {
  const mapStateToProps = (state) => ({
    siteUpdateList: state.application.siteUpdates,
  });

  const mapDispatchToProps = {
    onLoadSiteUpdates: loadSiteUpdates,
    onAddSiteUpdates: addSiteUpdates,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SiteUpdateResult);
})();

export default ReduxSiteUpdateResult;