import { connect } from 'react-redux';
import SiteUpdateResult from './SiteUpdateResult';

const ReduxSiteUpdateResult = (() => {
  const mapStateToProps = (state) => ({
    siteUpdateList: state.application.siteUpdates,
  });

  const mapDispatchToProps = {};

  return connect(mapStateToProps, mapDispatchToProps)(SiteUpdateResult);
})();

export default ReduxSiteUpdateResult;