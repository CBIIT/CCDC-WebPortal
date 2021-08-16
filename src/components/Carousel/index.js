import { connect } from 'react-redux';
import {
    loadLandingParticipatingResources,
} from '../../redux/actions/participatingResourcesActions';
import Carousel from './Carousel';

const ReduxCarousel = (() => {
  const mapStateToProps = (state) => ({
    participatingResources: state.participatingResources.landing,
  });

  const mapDispatchToProps = {
    onLoadLandingParticipatingResources: loadLandingParticipatingResources,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Carousel);
})();

export default ReduxCarousel;