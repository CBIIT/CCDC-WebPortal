import { connect } from 'react-redux';
import {
  loadApplicationVersionInfo,
} from '../../../redux/actions/applicationActions';
import Footer from './Footer';

const ReduxFooter = (() => {
  const mapStateToProps = (state) => ({
    versionInfo: state.application,
  });

  const mapDispatchToProps = {
    onLoadApplicationVersionInfo: loadApplicationVersionInfo,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Footer);
})();

export default ReduxFooter;