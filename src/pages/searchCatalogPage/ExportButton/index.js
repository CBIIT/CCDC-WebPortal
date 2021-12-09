import { connect } from 'react-redux';
import ExportButton from './ExportButton';

const ReduxExportButton = (() => {
  const mapStateToProps = (state) => ({
    searchCriteria: state.datasets.searchCriteria,
  });

  const mapDispatchToProps = {};

  return connect(mapStateToProps, mapDispatchToProps)(ExportButton);
})();

export default ReduxExportButton;