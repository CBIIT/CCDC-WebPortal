import { connect } from 'react-redux';
import Glossary from './glossaryPageView';
import { loadGlossaryLetters, loadGlossaryTermsByFirstLetter } from '../../redux/actions/applicationActions';

const ReduxResult = (() => {
  const mapStateToProps = (state) => ({
    glossaryLetters: state.application.glossaryLetters,
    glossaryDetails: state.application.glossaryDetails,
  });

  const mapDispatchToProps = {
    onLoadGlossaryLetters: loadGlossaryLetters,
    onLoadGlossaryTermsByFirstLetter: loadGlossaryTermsByFirstLetter,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Glossary);
})();

export default ReduxResult;