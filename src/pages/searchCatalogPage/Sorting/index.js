import { connect } from 'react-redux';
import {
  changeSorting, changeSortingOrder
} from '../../../redux/actions/searchActions';
import Sorting from './Sorting';

const ReduxSorting = (() => {
  const mapStateToProps = (state) => ({
    sort: state.datasets.searchCriteria.sort,
  });

  const mapDispatchToProps = {
    onChangeSorting: changeSorting,
    onChangeSortingOrder: changeSortingOrder,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Sorting);
})();

export default ReduxSorting;