import { connect } from 'react-redux';
import SiteUpdatePage from './SiteUpdatePage';

const ReduxSiteUpdatePage = (() => {
  const mapStateToProps = () => ({
  });

  const mapDispatchToProps = {
  };

  return connect(mapStateToProps, mapDispatchToProps)(SiteUpdatePage);
})();

export default ReduxSiteUpdatePage;