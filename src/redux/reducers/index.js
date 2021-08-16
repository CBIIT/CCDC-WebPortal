import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import participatingResources from './participatingResourcesReducer';

const rootReducer = combineReducers({
    courses,
    authors,
    participatingResources,
});

export default rootReducer;
