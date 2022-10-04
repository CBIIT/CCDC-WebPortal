import { connect } from 'react-redux';
import {
  loadWidgetUpdates,
} from '../../../redux/actions/applicationActions';
import SiteUpdateWidget from './SiteUpdateWidget';

const ReduxSiteUpdateWidget = (() => {
  const mapStateToProps = (state) => ({
    widgetUpdates: state.application.widgetUpdates,
  });

  const mapDispatchToProps = {
    onLoadWidgetUpdates: loadWidgetUpdates,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SiteUpdateWidget);
})();

export default ReduxSiteUpdateWidget;