import { connect } from 'react-redux';
import {
  switchDataView,
} from '../../../redux/actions/searchActions';
import SwitchView from './SwitchView';

const ReduxSwitchView = (() => {
  const mapStateToProps = (state) => ({
    viewType: state.datasets.viewType,
  });

  const mapDispatchToProps = {
    onSwitchView: switchDataView,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SwitchView);
})();

export default ReduxSwitchView;