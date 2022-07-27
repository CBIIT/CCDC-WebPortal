import { connect } from 'react-redux';
import {
  loadSiteUpdates,
} from '../../../redux/actions/applicationActions';
import SiteUpdateResult from './SiteUpdateResult';

const ReduxSiteUpdateResult = (() => {
  const mapStateToProps = (state) => ({
    siteUpdateList: state.application.siteUpdates,
  });

  const mapDispatchToProps = {
    onLoadSiteUpdates: loadSiteUpdates,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SiteUpdateResult);
})();

export default ReduxSiteUpdateResult;