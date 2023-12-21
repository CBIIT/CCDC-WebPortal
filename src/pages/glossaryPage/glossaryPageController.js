import { connect } from 'react-redux';
import Glossary from './glossaryPageView';
import { loadGlossaryLetters } from '../../redux/actions/applicationActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    glossaryLetters: state.application.glossaryLetters,
  });

  const mapDispatchToProps = {
    onLoadGlossaryLetters: loadGlossaryLetters,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Glossary);
})();

export default ReduxSearchResult;