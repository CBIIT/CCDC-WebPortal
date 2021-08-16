import { combineReducers } from 'redux';
import participatingResources from './participatingResourcesReducer';

const rootReducer = combineReducers({
    participatingResources,
});

export default rootReducer;
