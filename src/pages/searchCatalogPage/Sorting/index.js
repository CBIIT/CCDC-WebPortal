import { connect } from 'react-redux';
import {
  changeSorting,
} from '../../../redux/actions/searchActions';
import Sorting from './Sorting';

const ReduxSorting = (() => {
  const mapStateToProps = (state) => ({
    sort: state.datasets.searchCriteria.sort,
  });

  const mapDispatchToProps = {
    onChangeSorting: changeSorting,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Sorting);
})();

export default ReduxSorting;